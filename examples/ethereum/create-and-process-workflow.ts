import { TxSignerFactory } from '../../src/signers';
import {
  StakingClient,
  workflowHasFinished,
  workflowWaitingForExternalBroadcast,
  isTxStepOutput,
  isWaitStepOutput,
} from '../../src/client/staking-client';
import { Workflow } from '../../src/gen/coinbase/staking/orchestration/v1/workflow.pb';
import { calculateTimeDifference } from '../../src/utils/date';

const privateKey: string = ''; // replace with your private key
const stakerAddress: string = ''; // replace with your staker address
const integrationAddress: string = '0xA55416de5DE61A0AC1aa8970a280E04388B1dE4b'; // replace with your integration address
const amount: string = '123'; // replace with your amount
const network: string = 'holesky'; // replace with your network

const client = new StakingClient();

const signer = TxSignerFactory.getSigner('ethereum');

async function stakePartialEth(): Promise<void> {
  if (privateKey === '' || stakerAddress === '') {
    throw new Error(
      'Please set the privateKey and stakerAddress variable in this file',
    );
  }

  let unsignedTx = '';
  let workflow: Workflow = {} as Workflow;
  let currentStepId: number | undefined;
  let workflowId: string;

  try {
    // Create a new eth kiln stake workflow
    workflow = await client.Ethereum.stake(
      network,
      stakerAddress,
      integrationAddress,
      amount,
    );

    workflowId = workflow.name?.split('/').pop() || '';
    if (workflowId == null || workflowId === '') {
      throw new Error('Unexpected workflow state. workflowId is null');
    }

    currentStepId = workflow.currentStepId;
    if (currentStepId == null) {
      throw new Error('Unexpected workflow state. currentStepId is null');
    }

    console.log('Workflow created %s ...', workflow.name);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating workflow: ${error.message}`);
    }
    throw new Error(`Error creating workflow`);
  }

  // Loop until the workflow has reached an end state.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Every second, get the latest workflow state.
    // If the workflow is waiting for signing, sign the unsigned tx and return back the signed tx.
    // If the workflow is waiting for external broadcast, sign and broadcast the unsigned tx externally and return back the tx hash via the PerformWorkflowStep API.
    // Note: In this example, we just log this message as the wallet provider needs to implement this logic.
    try {
      workflow = await client.getWorkflow(workflowId);
    } catch (error) {
      // TODO: add retry logic for network errors
      if (error instanceof Error) {
        throw new Error(`Error creating workflow: ${error.message}`);
      }
    }

    await printWorkflowProgressDetails(workflow);

    if (workflowWaitingForExternalBroadcast(workflow)) {
      unsignedTx =
        workflow.steps![currentStepId].txStepOutput?.unsignedTx || '';
      if (unsignedTx === '') {
        console.log('Waiting for unsigned tx to be available ...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep for 1 second
        continue;
      }

      console.log('Signing unsigned tx %s ...', unsignedTx);
      const signedTx = await signer.signTransaction(privateKey, unsignedTx);

      console.log(
        'Please broadcast this signed tx %s externally and return back the tx hash via the PerformWorkflowStep API ...',
        signedTx,
      );
      break;
    } else if (workflowHasFinished(workflow)) {
      console.log('Workflow completed with state %s ...', workflow.state);
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep for 1 second
  }
}

async function printWorkflowProgressDetails(workflow: Workflow): Promise<void> {
  if (workflow.steps == null || workflow.steps.length === 0) {
    console.log('Waiting for steps to be created ...');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep for 1 second
    return;
  }

  const currentStepId = workflow.currentStepId;

  if (currentStepId == null) {
    return;
  }

  const step = workflow.steps[currentStepId];

  let stepDetails = '';

  if (isTxStepOutput(step)) {
    stepDetails = `state: ${step.txStepOutput?.state} tx hash: ${step.txStepOutput?.txHash}`;
  } else if (isWaitStepOutput(step)) {
    stepDetails = `state: ${step.waitStepOutput?.state}} current: ${step.waitStepOutput?.current}} target: ${step.waitStepOutput?.target}`;
  } else {
    throw new Error('Encountered unexpected workflow step type');
  }

  const runtime = calculateTimeDifference(
    <string>workflow.createTime,
    <string>workflow.updateTime,
  );

  if (workflowHasFinished(workflow)) {
    console.log(
      'Workflow reached end state - step name: %s %s workflow state: %s runtime: %d seconds',
      step.name,
      stepDetails,
      workflow.state,
      runtime,
    );
  } else {
    console.log(
      'Waiting for workflow to finish - step name: %s %s workflow state: %s runtime: %d seconds',
      step.name,
      stepDetails,
      workflow.state,
      runtime,
    );
  }
}

stakePartialEth()
  .then(() => {
    console.log('Done staking eth');
  })
  .catch((error) => {
    console.error('Error staking eth: ', error.message);
  });
