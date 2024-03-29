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

export class Solana {
  private parent: StakingClient;

  constructor(parent: StakingClient) {
    this.parent = parent;
  }

  async stake(
    projectId: string,
    network: string,
    skipBroadcast: boolean = false,
    walletAddress: string,
    validatorAddress: string,
    amount: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      parent: `projects/${projectId}`,
      workflow: {
        action: `protocols/solana/networks/${network}/actions/stake`,
        skipBroadcast: skipBroadcast,
        solanaStakingParameters: {
          stakeParameters: {
            walletAddress: walletAddress,
            validatorAddress: validatorAddress,
            amount: {
              value: amount,
              currency: 'SOL',
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
    walletAddress: string,
    stakeAccountAddress: string,
    amount: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      parent: `projects/${projectId}`,
      workflow: {
        action: `protocols/solana/networks/${network}/actions/unstake`,
        skipBroadcast: skipBroadcast,
        solanaStakingParameters: {
          unstakeParameters: {
            walletAddress: walletAddress,
            stakeAccountAddress: stakeAccountAddress,
            amount: {
              value: amount,
              currency: 'SOL',
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
    walletAddress: string,
    stakeAccountAddress: string,
  ): Promise<Workflow> {
    const req: CreateWorkflowRequest = {
      parent: `projects/${projectId}`,
      workflow: {
        action: `protocols/solana/networks/${network}/actions/claim_stake`,
        skipBroadcast: skipBroadcast,
        solanaStakingParameters: {
          claimStakeParameters: {
            walletAddress: walletAddress,
            stakeAccountAddress: stakeAccountAddress,
          },
        },
      },
    };

    return this.parent.createWorkflow(projectId, req);
  }

  async viewStakingContext(
    address: string,
    network: string,
  ): Promise<ViewStakingContextResponse> {
    const req: ViewStakingContextRequest = {
      address: address,
      network: `protocols/solana/networks/${network}`,
    };

    return this.parent.viewStakingContext(req);
  }

  async listRewards(
    filter: string,
    pageSize: number = 100,
    pageToken?: string,
  ): Promise<ListRewardsResponse> {
    const req: ListRewardsRequest = {
      parent: 'protocols/solana',
      filter: filter,
      pageSize: pageSize,
      pageToken: pageToken,
    };

    return this.parent.listRewards('solana', req);
  }

  async listStakes(
    filter: string,
    pageSize: number = 100,
    pageToken?: string,
  ): Promise<ListStakesResponse> {
    const req: ListStakesRequest = {
      parent: 'protocols/solana',
      filter: filter,
      pageSize: pageSize,
      pageToken: pageToken,
    };

    return this.parent.listStakes('solana', req);
  }
}
