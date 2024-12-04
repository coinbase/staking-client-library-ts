import { expect } from 'chai';
import sinon from 'sinon';
import { Ethereum } from './ethereum-kiln-staking';
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

describe('Ethereum', () => {
  let stakingClientStub: sinon.SinonStubbedInstance<StakingClient>;
  let ethereum: Ethereum;

  beforeEach(() => {
    stakingClientStub = sinon.createStubInstance(StakingClient);
    ethereum = new Ethereum(stakingClientStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('stake', () => {
    it('should stake with the correct parameters', async () => {
      const network = 'mainnet';
      const stakerAddress = 'some-staker-address';
      const amount = '100';
      const integratorContractAddress = 'some-integrator-contract-address';
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
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await ethereum.stake(
        network,
        stakerAddress,
        amount,
        integratorContractAddress,
      );

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });

    it('should handle missing integrator contract address', async () => {
      const network = 'mainnet';
      const stakerAddress = 'some-staker-address';
      const amount = '100';
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/ethereum_kiln/networks/${network}/actions/stake`,
          ethereumKilnStakingParameters: {
            stakeParameters: {
              stakerAddress: stakerAddress,
              integratorContractAddress: undefined,
              amount: {
                value: amount,
                currency: 'ETH',
              },
            },
          },
        },
      };
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await ethereum.stake(network, stakerAddress, amount);

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });

    it('should handle invalid amount', async () => {
      const network = 'mainnet';
      const stakerAddress = 'some-staker-address';
      const amount = '-100'; // Invalid amount
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/ethereum_kiln/networks/${network}/actions/stake`,
          ethereumKilnStakingParameters: {
            stakeParameters: {
              stakerAddress: stakerAddress,
              integratorContractAddress: undefined,
              amount: {
                value: amount,
                currency: 'ETH',
              },
            },
          },
        },
      };
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await ethereum.stake(network, stakerAddress, amount);

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('unstake', () => {
    it('should unstake with the correct parameters, empty integrator contract address', async () => {
      const network = 'mainnet';
      const stakerAddress = 'some-staker-address';

      const amount = '100';
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/ethereum_kiln/networks/${network}/actions/unstake`,
          ethereumKilnStakingParameters: {
            unstakeParameters: {
              integratorContractAddress: undefined,
              stakerAddress: stakerAddress,
              amount: {
                value: amount,
                currency: 'ETH',
              },
            },
          },
        },
      };
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await ethereum.unstake(network, stakerAddress, amount);

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });

    it('should unstake with the correct parameters, with integrator contract address', async () => {
      const network = 'mainnet';
      const stakerAddress = 'some-staker-address';
      const integratorContractAddress = 'some-integrator-contract-address';
      const amount = '100';
      const req: CreateWorkflowRequest = {
        workflow: {
          action: `protocols/ethereum_kiln/networks/${network}/actions/unstake`,
          ethereumKilnStakingParameters: {
            unstakeParameters: {
              integratorContractAddress: integratorContractAddress,
              stakerAddress: stakerAddress,
              amount: {
                value: amount,
                currency: 'ETH',
              },
            },
          },
        },
      };
      const res: Workflow = {
        /* response data */
      };

      stakingClientStub.createWorkflow.resolves(res);

      const response = await ethereum.unstake(
        network,
        stakerAddress,
        amount,
        integratorContractAddress,
      );

      expect(stakingClientStub.createWorkflow.calledOnceWithExactly(req)).to.be
        .true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('viewStakingContext', () => {
    it('should view staking context with the correct parameters', async () => {
      const address = 'some-address';
      const integratorContractAddress = 'some-integrator-contract-address';
      const network = 'mainnet';
      const req: ViewStakingContextRequest = {
        address: address,
        network: `protocols/ethereum_kiln/networks/${network}`,
        ethereumKilnStakingContextParameters: {
          integratorContractAddress: integratorContractAddress,
        },
      };
      const res: ViewStakingContextResponse = {
        /* response data */
      };

      stakingClientStub.viewStakingContext.resolves(res);

      const response = await ethereum.viewStakingContext(
        address,
        network,
        integratorContractAddress,
      );

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
        parent: 'protocols/ethereum',
        filter: filter,
        pageSize: pageSize,
        pageToken: pageToken,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await ethereum.listRewards(filter, pageSize, pageToken);

      expect(
        stakingClientStub.listRewards.calledOnceWithExactly('ethereum', req),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should use default parameters when not provided', async () => {
      const filter = 'some-filter';
      const req: ListRewardsRequest = {
        parent: 'protocols/ethereum',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await ethereum.listRewards(filter);

      expect(
        stakingClientStub.listRewards.calledOnceWithExactly('ethereum', req),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should handle empty filter', async () => {
      const filter = '';
      const req: ListRewardsRequest = {
        parent: 'protocols/ethereum',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      stakingClientStub.listRewards.resolves(res);

      const response = await ethereum.listRewards(filter);

      expect(
        stakingClientStub.listRewards.calledOnceWithExactly('ethereum', req),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listStakes', () => {
    it('should list stakes with the correct parameters', async () => {
      const filter = 'some-filter';
      const pageSize = 50;
      const pageToken = 'some-token';
      const req: ListStakesRequest = {
        parent: 'protocols/ethereum',
        filter: filter,
        pageSize: pageSize,
        pageToken: pageToken,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await ethereum.listStakes(filter, pageSize, pageToken);

      expect(
        stakingClientStub.listStakes.calledOnceWithExactly('ethereum', req),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should use default parameters when not provided', async () => {
      const filter = 'some-filter';
      const req: ListStakesRequest = {
        parent: 'protocols/ethereum',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await ethereum.listStakes(filter);

      expect(
        stakingClientStub.listStakes.calledOnceWithExactly('ethereum', req),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });

    it('should handle empty filter', async () => {
      const filter = '';
      const req: ListStakesRequest = {
        parent: 'protocols/ethereum',
        filter: filter,
        pageSize: 100,
        pageToken: undefined,
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      stakingClientStub.listStakes.resolves(res);

      const response = await ethereum.listStakes(filter);

      expect(
        stakingClientStub.listStakes.calledOnceWithExactly('ethereum', req),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });
});
