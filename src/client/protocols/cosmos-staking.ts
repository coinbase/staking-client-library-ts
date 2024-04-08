import { StakingClient } from '../staking-client';
import {
  ListRewardsRequest,
  ListRewardsResponse,
} from '../../gen/coinbase/staking/rewards/v1/reward.pb';
import {
  ListStakesRequest,
  ListStakesResponse,
} from '../../gen/coinbase/staking/rewards/v1/stake.pb';

export class Cosmos {
  private parent: StakingClient;

  constructor(parent: StakingClient) {
    this.parent = parent;
  }

  async listRewards(
    filter: string,
    pageSize: number = 100,
    pageToken?: string,
  ): Promise<ListRewardsResponse> {
    const req: ListRewardsRequest = {
      parent: 'protocols/cosmos',
      filter: filter,
      pageSize: pageSize,
      pageToken: pageToken,
    };

    return this.parent.listRewards('cosmos', req);
  }

  async listStakes(
    filter: string,
    pageSize: number = 100,
    pageToken?: string,
  ): Promise<ListStakesResponse> {
    const req: ListStakesRequest = {
      parent: 'protocols/cosmos',
      filter: filter,
      pageSize: pageSize,
      pageToken: pageToken,
    };

    return this.parent.listStakes('cosmos', req);
  }
}
