import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { StakingService } from '../gen/coinbase/staking/orchestration/v1/api.pb';
import { RewardService } from '../gen/coinbase/staking/rewards/v1/reward_service.pb';
import {
  CreateWorkflowRequest,
  Workflow,
  GetWorkflowRequest,
  ListWorkflowsRequest,
  ListWorkflowsResponse,
} from '../gen/coinbase/staking/orchestration/v1/workflow.pb';
import {
  ViewStakingContextRequest,
  ViewStakingContextResponse,
} from '../gen/coinbase/staking/orchestration/v1/staking_context.pb';
import {
  ListNetworksRequest,
  ListNetworksResponse,
} from '../gen/coinbase/staking/orchestration/v1/network.pb';
import {
  ListActionsRequest,
  ListActionsResponse,
} from '../gen/coinbase/staking/orchestration/v1/action.pb';
import {
  ListProtocolsRequest,
  ListProtocolsResponse,
} from '../gen/coinbase/staking/orchestration/v1/protocol.pb';
import {
  ListRewardsRequest,
  ListRewardsResponse,
} from '../gen/coinbase/staking/rewards/v1/reward.pb';
import {
  ListStakesRequest,
  ListStakesResponse,
} from '../gen/coinbase/staking/rewards/v1/stake.pb';
import { StakingClient as StakingClientType } from './staking-client';

describe('StakingClient', () => {
  let buildJWTStub: sinon.SinonStub;
  let listProtocolsStub: sinon.SinonStub;
  let listNetworksStub: sinon.SinonStub;
  let listActionsStub: sinon.SinonStub;
  let viewStakingContextStub: sinon.SinonStub;
  let createWorkflowStub: sinon.SinonStub;
  let getWorkflowStub: sinon.SinonStub;
  let listWorkflowsStub: sinon.SinonStub;
  let listRewardsStub: sinon.SinonStub;
  let listStakesStub: sinon.SinonStub;

  let StakingClient: typeof StakingClientType;

  beforeEach(() => {
    buildJWTStub = sinon.stub();
    listProtocolsStub = sinon.stub(StakingService, 'ListProtocols');
    listNetworksStub = sinon.stub(StakingService, 'ListNetworks');
    listActionsStub = sinon.stub(StakingService, 'ListActions');
    viewStakingContextStub = sinon.stub(StakingService, 'ViewStakingContext');
    createWorkflowStub = sinon.stub(StakingService, 'CreateWorkflow');
    getWorkflowStub = sinon.stub(StakingService, 'GetWorkflow');
    listWorkflowsStub = sinon.stub(StakingService, 'ListWorkflows');
    listRewardsStub = sinon.stub(RewardService, 'ListRewards');
    listStakesStub = sinon.stub(RewardService, 'ListStakes');

    StakingClient = proxyquire('./staking-client', {
      '../auth/jwt': { buildJWT: buildJWTStub },
    }).StakingClient;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('listProtocols', () => {
    it('should list protocols with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );
      const req: ListProtocolsRequest = {};
      const res: ListProtocolsResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      listProtocolsStub.resolves(res);

      const response = await client.listProtocols();

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        listProtocolsStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listNetworks', () => {
    it('should list networks with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );

      let protocol = 'some-protocol';
      const req: ListNetworksRequest = {
        parent: `protocols/${protocol}`,
      };
      const res: ListNetworksResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      listNetworksStub.resolves(res);

      const response = await client.listNetworks(protocol);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        listNetworksStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listActions', () => {
    it('should list actions with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );

      let protocol = 'some-protocol';
      let network = 'some-network';
      const req: ListActionsRequest = {
        parent: `protocols/${protocol}/networks/${network}`,
      };
      const res: ListActionsResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      listActionsStub.resolves(res);

      const response = await client.listActions(protocol, network);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        listActionsStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('viewStakingContext', () => {
    it('should view staking context with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );
      const req: ViewStakingContextRequest = {
        address: 'some-address',
        network: 'mainnet',
      };
      const res: ViewStakingContextResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      viewStakingContextStub.resolves(res);

      const response = await client.viewStakingContext(req);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        viewStakingContextStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('createWorkflow', () => {
    it('should create a workflow with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----\ntest-private-key\n-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );
      const req: CreateWorkflowRequest = {
        /* request data */
      };
      const res: Workflow = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      createWorkflowStub.resolves(res);

      const response = await client.createWorkflow(req);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        createWorkflowStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('getWorkflow', () => {
    it('should get a workflow with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----\ntest-private-key\n-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );

      const workflowName = 'workflow-id';

      const getWorkflowRequest: GetWorkflowRequest = {
        name: workflowName,
      };

      const res: Workflow = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      getWorkflowStub.resolves(res);

      const response = await client.getWorkflow(workflowName);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        getWorkflowStub.calledOnceWithExactly(getWorkflowRequest, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listWorkflows', () => {
    it('should list workflows with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );
      const req: ListWorkflowsRequest = {
        pageSize: 100,
        filter: 'foobar',
      };
      const res: ListWorkflowsResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      listWorkflowsStub.resolves(res);

      const response = await client.listWorkflows(100, 'foobar');

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        listWorkflowsStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/orchestration',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listRewards', () => {
    it('should list rewards with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );
      let protocol = 'ethereum';
      const req: ListRewardsRequest = {
        pageSize: 100,
        filter: 'foobar',
      };
      const res: ListRewardsResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      listRewardsStub.resolves(res);

      const response = await client.listRewards(protocol, req);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        listRewardsStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/rewards',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });

  describe('listStakes', () => {
    it('should list stakes with the correct parameters', async () => {
      const client = new StakingClient(
        'apiKeyName',
        '-----BEGIN EC PRIVATE KEY-----test-private-key-----END EC PRIVATE KEY-----',
        'https://api.example.com',
      );
      let protocol = 'ethereum';
      const req: ListStakesRequest = {
        pageSize: 100,
        filter: 'foobar',
      };
      const res: ListStakesResponse = {
        /* response data */
      };

      let stubToken = 'foobar';

      buildJWTStub.resolves(stubToken);
      listStakesStub.resolves(res);

      const response = await client.listStakes(protocol, req);

      expect(buildJWTStub.calledOnce).to.be.true;
      expect(
        listStakesStub.calledOnceWithExactly(req, {
          pathPrefix: 'https://api.example.com/rewards',
          headers: {
            Authorization: `Bearer ${stubToken}`,
          },
        }),
      ).to.be.true;
      expect(response).to.deep.equal(res);
    });
  });
});
