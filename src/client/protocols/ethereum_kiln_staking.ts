import { StakingServiceClient } from "../staking-service-client";
import {
  CreateWorkflowRequest,
  Workflow,
} from "../../gen/coinbase/staking/v1alpha1/workflow.pb";
import {
  ViewStakingContextRequest,
  ViewStakingContextResponse,
} from "../../gen/coinbase/staking/v1alpha1/staking_context.pb";

export class EthereumKiln {
  private parent: StakingServiceClient;

  constructor(parent: StakingServiceClient) {
    this.parent = parent;
  }

  async stake(
    projectId: string,
    network: string,
    skipBroadcast: boolean = false,
    stakerAddress: string,
    integratorContractAddress: string,
    amount: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      parent: `projects/${projectId}`,
      workflow: {
        action: `protocols/ethereum_kiln/networks/${network}/actions/stake`,
        skipBroadcast: skipBroadcast,
        ethereumKilnStakingParameters: {
          stakeParameters: {
            stakerAddress: stakerAddress,
            integratorContractAddress: integratorContractAddress,
            amount: {
              value: amount,
              currency: "ETH",
            },
          },
        },
      },
    };

    return this.parent.createWorkflow(projectId, req);
  }

  async unstake(
    projectId: string,
    network: string,
    skipBroadcast: boolean = false,
    stakerAddress: string,
    integratorContractAddress: string,
    amount: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      parent: `projects/${projectId}`,
      workflow: {
        action: `protocols/ethereum_kiln/networks/${network}/actions/unstake`,
        skipBroadcast: skipBroadcast,
        ethereumKilnStakingParameters: {
          unstakeParameters: {
            stakerAddress: stakerAddress,
            integratorContractAddress: integratorContractAddress,
            amount: {
              value: amount,
              currency: "ETH",
            },
          },
        },
      },
    };

    return this.parent.createWorkflow(projectId, req);
  }

  async claimStake(
    projectId: string,
    network: string,
    skipBroadcast: boolean = false,
    stakerAddress: string,
    integratorContractAddress: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      parent: `projects/${projectId}`,
      workflow: {
        action: `protocols/ethereum_kiln/networks/${network}/actions/claim_stake`,
        skipBroadcast: skipBroadcast,
        ethereumKilnStakingParameters: {
          claimStakeParameters: {
            stakerAddress: stakerAddress,
            integratorContractAddress: integratorContractAddress,
          },
        },
      },
    };

    return this.parent.createWorkflow(projectId, req);
  }

  async viewStakingContext(
    address: string,
    network: string,
    integratorContractAddress: string,
  ): Promise<ViewStakingContextResponse> {
    const req: ViewStakingContextRequest = {
      address: address,
      network: `protocols/ethereum_kiln/networks/${network}`,
      ethereumKilnStakingContextParameters: {
        integratorContractAddress: integratorContractAddress,
      },
    };

    return this.parent.viewStakingContext(req);
  }
}
