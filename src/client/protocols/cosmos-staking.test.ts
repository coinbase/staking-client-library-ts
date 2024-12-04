import { expect } from 'chai';
import sinon from 'sinon';
import { Cosmos } from './cosmos-staking';
import { StakingClient } from '../staking-client';
import {
  ListRewardsRequest,
  ListRewardsResponse,
} from '../../gen/coinbase/staking/rewards/v1/reward.pb';
import {
  ListStakesRequest,
  ListStakesResponse,
} from '../../gen/coinbase/staking/rewards/v1/stake.pb';

describe('Cosmos', () => {
  let stakingClientStub: sinon.SinonStubbedInstance<StakingClient>;
  let cosmos: Cosmos;

  beforeEach(() => {
    stakingClientStub = sinon.createStubInstance(StakingClient);
    cosmos = new Cosmos(stakingClientStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('listRewards', () => {
    it('should list rewards with the correct parameters', async () => {
      const filter = 'some-filter';
      const pageSize = 50;
      const pageToken = 'some-token';
      const req: ListRewardsRequest = {
        parent: 'protocols/cosmos',
        filter: filter,
        pageSize: pageSize,
        pageToken: pageToken,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await cosmos.listRewards(filter, pageSize, pageToken);

      expect(stakingClientStub.listRewards.calledOnceWithExactly('cosmos', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should use default parameters when not provided', async () => {
      const filter = 'some-filter';
      const req: ListRewardsRequest = {
        parent: 'protocols/cosmos',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await cosmos.listRewards(filter);

      expect(stakingClientStub.listRewards.calledOnceWithExactly('cosmos', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listStakes', () => {
    it('should list stakes with the correct parameters', async () => {
      const filter = 'some-filter';
      const pageSize = 50;
      const pageToken = 'some-token';
      const req: ListStakesRequest = {
        parent: 'protocols/cosmos',
        filter: filter,
        pageSize: pageSize,
        pageToken: pageToken,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await cosmos.listStakes(filter, pageSize, pageToken);

      expect(stakingClientStub.listStakes.calledOnceWithExactly('cosmos', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should use default parameters when not provided', async () => {
      const filter = 'some-filter';
      const req: ListStakesRequest = {
        parent: 'protocols/cosmos',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await cosmos.listStakes(filter);

      expect(stakingClientStub.listStakes.calledOnceWithExactly('cosmos', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });
  });
});
