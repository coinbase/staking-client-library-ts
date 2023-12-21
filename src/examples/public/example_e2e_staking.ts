import { TxSignerFactory } from "../../signers";
import {
  StakingServiceClient,
  workflowHasFinished,
  workflowWaitingForSigning,
  workflowWaitingForExternalBroadcast,
} from "../../client/staking-service-client";
import { Workflow } from "../../gen/coinbase/staking/v1alpha1/workflow.pb";
import { calculateTimeDifference } from "../../utils/date";

const projectId: string = ""; // replace with your project id
const privateKey: string = ""; // replace with your private key
const stakerAddress: string = ""; // replace with your staker address
const integrationAddress: string = "0x0a868e4e07a0a00587a783720b76fad9f7eea009"; // replace with your integration address
const amount: string = "123"; // replace with your amount

const client = new StakingServiceClient();

const signer = TxSignerFactory.getSigner("ethereum");

async function stakePartialEth(): Promise<void> {
  if (projectId === "" || privateKey === "" || stakerAddress === "") {
    throw new Error(
      "Please set the projectId, privateKey and stakerAddress variables in this file",
    );
  }

  let unsignedTx = "";
  let workflow: Workflow = {} as Workflow;
  let currentStepId: number | undefined;
  let workflowId: string;

  try {
    // Create a new eth kiln stake workflow
    workflow = await client.EthereumKiln.stake(
      projectId,
      "goerli",
      false,
      stakerAddress,
      integrationAddress,
      amount,
    );

    workflowId = workflow.name?.split("/").pop() || "";
    if (workflowId == null || workflowId === "") {
      throw new Error("Unexpected workflow state. workflowId is null");
    }

    currentStepId = workflow.currentStepId;
    if (currentStepId == null) {
      throw new Error("Unexpected workflow state. currentStepId is null");
    }

    console.log("Workflow created %s ...", workflow.name);
  } catch (error: any) {
    throw new Error(`Error creating workflow ${error.message}`);
  }

  // Loop until the workflow has reached an end state.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Every second, get the latest workflow state.
    // If the workflow is waiting for signing, sign the unsigned tx and return back the signed tx.
    // If the workflow is waiting for external broadcast, sign and broadcast the unsigned tx externally and return back the tx hash via the PerformWorkflowStep API.
    // Note: In this example, we just log this message as the wallet provider needs to implement this logic.
    try {
      workflow = await client.getWorkflow(projectId, workflowId);
    } catch (error: any) {
      // TODO: add retry logic for network errors
      throw new Error(`Error getting workflow ${error.message}`);
    }

    await printWorkflowProgressDetails(workflow);

    if (workflowWaitingForSigning(workflow)) {
      unsignedTx =
        workflow.steps![currentStepId].txStepOutput?.unsignedTx || "";
      if (unsignedTx === "") {
        console.log("Waiting for unsigned tx to be available ...");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep for 1 second
        continue;
      }

      console.log("Signing unsigned tx %s ...", unsignedTx);
      const signedTx = await signer.signTransaction(privateKey, unsignedTx);
      console.log("Returning back signed tx %s ...", signedTx);
      console.warn("HALTING");

      workflow = await client.performWorkflowStep(
        projectId,
        workflowId,
        currentStepId,
        signedTx,
      );
    } else if (workflowWaitingForExternalBroadcast(workflow)) {
      console.log(
        "Please sign and broadcast this unsigned tx %s externally and return back the tx hash via the PerformWorkflowStep API ...",
        unsignedTx,
      );
      break;
    } else if (workflowHasFinished(workflow)) {
      console.log("Workflow completed with state %s ...", workflow.state);
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep for 1 second
  }
}

async function printWorkflowProgressDetails(workflow: Workflow): Promise<void> {
  if (workflow.steps == null || workflow.steps.length === 0) {
    console.log("Waiting for steps to be created ...");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep for 1 second
    return;
  }

  const currentStepId = workflow.currentStepId;
  if (currentStepId == null) {
    return;
  }

  const step = workflow.steps[currentStepId];

  const txStepDetails = `state: ${step.txStepOutput?.state} tx hash: ${step.txStepOutput?.txHash}`;

  // TODO(rohit) add support later
  // const waitStepDetails = `state: ${step.waitStepOutput?.state}} current: ${step.waitStepOutput?.current}} target: ${step.waitStepOutput?.target}`

  const runtime = calculateTimeDifference(
    <string>workflow.createTime,
    <string>workflow.updateTime,
  );

  if (workflowHasFinished(workflow)) {
    console.log(
      "Workflow reached end state - step name: %s %s workflow state: %s runtime: %d seconds",
      step.name,
      txStepDetails,
      workflow.state,
      runtime,
    );
  } else {
    console.log(
      "Waiting for workflow to finish - step name: %s %s workflow state: %s runtime: %d seconds",
      step.name,
      txStepDetails,
      workflow.state,
      runtime,
    );
  }
}

stakePartialEth()
  .then(() => {
    console.log("Done staking eth");
  })
  .catch((error) => {
    console.error("Error staking eth: ", error.message);
  });
