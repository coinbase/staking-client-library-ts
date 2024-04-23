import { StakingClient } from '../staking-client';
import {
  CreateWorkflowRequest,
  Workflow,
} from '../../gen/coinbase/staking/orchestration/v1/workflow.pb';
import {
  ViewStakingContextRequest,
  ViewStakingContextResponse,
} from '../../gen/coinbase/staking/orchestration/v1/staking_context.pb';
import {
  ListRewardsRequest,
  ListRewardsResponse,
} from '../../gen/coinbase/staking/rewards/v1/reward.pb';
import {
  ListStakesRequest,
  ListStakesResponse,
} from '../../gen/coinbase/staking/rewards/v1/stake.pb';

export class Ethereum {
  private parent: StakingClient;

  constructor(parent: StakingClient) {
    this.parent = parent;
  }

  async stake(
    projectId: string,
    network: string,
    stakerAddress: string,
    integratorContractAddress: string,
    amount: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      workflow: {
        action: `protocols/ethereum_kiln/networks/${network}/actions/stake`,
        ethereumKilnStakingParameters: {
          stakeParameters: {
            stakerAddress: stakerAddress,
            integratorContractAddress: integratorContractAddress,
            amount: {
              value: amount,
              currency: 'ETH',
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
    stakerAddress: string,
    integratorContractAddress: string,
    amount: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      workflow: {
        action: `protocols/ethereum_kiln/networks/${network}/actions/unstake`,
        ethereumKilnStakingParameters: {
          unstakeParameters: {
            stakerAddress: stakerAddress,
            integratorContractAddress: integratorContractAddress,
            amount: {
              value: amount,
              currency: 'ETH',
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
    stakerAddress: string,
    integratorContractAddress: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      workflow: {
        action: `protocols/ethereum_kiln/networks/${network}/actions/claim_stake`,
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

  async listRewards(
    filter: string,
    pageSize: number = 100,
    pageToken?: string,
  ): Promise<ListRewardsResponse> {
    const req: ListRewardsRequest = {
      parent: 'protocols/ethereum',
      filter: filter,
      pageSize: pageSize,
      pageToken: pageToken,
    };

    return this.parent.listRewards('ethereum', req);
  }

  async listStakes(
    filter: string,
    pageSize: number = 100,
    pageToken?: string,
  ): Promise<ListStakesResponse> {
    const req: ListStakesRequest = {
      parent: 'protocols/ethereum',
      filter: filter,
      pageSize: pageSize,
      pageToken: pageToken,
    };

    return this.parent.listStakes('ethereum', req);
  }
}
