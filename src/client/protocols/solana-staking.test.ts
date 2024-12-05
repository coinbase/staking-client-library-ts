import { expect } from 'chai';
import sinon from 'sinon';
import { Solana } from './solana-staking';
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

describe('Solana', () => {
  let stakingClientStub: sinon.SinonStubbedInstance<StakingClient>;
  let solana: Solana;

  beforeEach(() => {
    stakingClientStub = sinon.createStubInstance(StakingClient);
    solana = new Solana(stakingClientStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('viewStakingContext', () => {
    it('should view staking context with the correct parameters', async () => {
      const address = 'some-address';
      const network = 'mainnet';
      const req: ViewStakingContextRequest = {
        address: address,
        network: `protocols/solana/networks/${network}`,
      };
      const res: ViewStakingContextResponse = {
        /* response data */
      };

      stakingClientStub.viewStakingContext.resolves(res);

      const response = await solana.viewStakingContext(address, network);

      expect(stakingClientStub.viewStakingContext.calledOnceWithExactly(req)).to
        .be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listRewards', () => {
    it('should list rewards with the correct parameters', async () => {
      const filter = 'some-filter';
      const pageSize = 50;
      const pageToken = 'some-token';
      const req: ListRewardsRequest = {
        parent: 'protocols/solana',
        filter: filter,
        pageSize: pageSize,
        pageToken: pageToken,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await solana.listRewards(filter, pageSize, pageToken);

      expect(stakingClientStub.listRewards.calledOnceWithExactly('solana', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should use default parameters when not provided', async () => {
      const filter = 'some-filter';
      const req: ListRewardsRequest = {
        parent: 'protocols/solana',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await solana.listRewards(filter);

      expect(stakingClientStub.listRewards.calledOnceWithExactly('solana', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should handle empty filter', async () => {
      const filter = '';
      const req: ListRewardsRequest = {
        parent: 'protocols/solana',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await solana.listRewards(filter);

      expect(stakingClientStub.listRewards.calledOnceWithExactly('solana', req))
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
        parent: 'protocols/solana',
        filter: filter,
        pageSize: pageSize,
        pageToken: pageToken,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await solana.listStakes(filter, pageSize, pageToken);

      expect(stakingClientStub.listStakes.calledOnceWithExactly('solana', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should use default parameters when not provided', async () => {
      const filter = 'some-filter';
      const req: ListStakesRequest = {
        parent: 'protocols/solana',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await solana.listStakes(filter);

      expect(stakingClientStub.listStakes.calledOnceWithExactly('solana', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should handle empty filter', async () => {
      const filter = '';
      const req: ListStakesRequest = {
        parent: 'protocols/solana',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await solana.listStakes(filter);

      expect(stakingClientStub.listStakes.calledOnceWithExactly('solana', req))
        .to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('stake', () => {
    it('should stake with the correct parameters', async () => {
      const network = 'mainnet';
      const walletAddress = 'some-wallet-address';
      const amount = '100';
      const validatorAddress = 'some-validator-address';
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/solana/networks/${network}/actions/stake`,
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
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await solana.stake(
        network,
        walletAddress,
        amount,
        validatorAddress,
      );

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });

    it('should handle missing validator address', async () => {
      const network = 'mainnet';
      const walletAddress = 'some-wallet-address';
      const amount = '100';
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/solana/networks/${network}/actions/stake`,
          solanaStakingParameters: {
            stakeParameters: {
              walletAddress: walletAddress,
              validatorAddress: undefined,
              amount: {
                value: amount,
                currency: 'SOL',
              },
            },
          },
        },
      };
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await solana.stake(network, walletAddress, amount);

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('unstake', () => {
    it('should unstake with the correct parameters', async () => {
      const network = 'mainnet';
      const walletAddress = 'some-wallet-address';
      const stakeAccountAddress = 'some-stake-account-address';
      const amount = '100';
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/solana/networks/${network}/actions/unstake`,
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
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await solana.unstake(
        network,
        walletAddress,
        stakeAccountAddress,
        amount,
      );

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });
  });
});
