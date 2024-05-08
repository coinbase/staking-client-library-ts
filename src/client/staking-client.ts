import { StakingService } from '../gen/coinbase/staking/orchestration/v1/api.pb';
import { RewardService } from '../gen/coinbase/staking/rewards/v1/reward_service.pb';
import {
  ListProtocolsRequest,
  ListProtocolsResponse,
} from '../gen/coinbase/staking/orchestration/v1/protocol.pb';
import {
  ListNetworksRequest,
  ListNetworksResponse,
} from '../gen/coinbase/staking/orchestration/v1/network.pb';
import {
  ListActionsRequest,
  ListActionsResponse,
} from '../gen/coinbase/staking/orchestration/v1/action.pb';
import * as fm from '../gen/fetch.pb';
import { buildJWT } from '../auth';
import {
  ViewStakingContextRequest,
  ViewStakingContextResponse,
} from '../gen/coinbase/staking/orchestration/v1/staking_context.pb';
import {
  CreateWorkflowRequest,
  GetWorkflowRequest,
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  PerformWorkflowStepRequest,
  Workflow,
  WorkflowState,
  WorkflowStep,
  TxStepOutput,
  WaitStepOutput,
} from '../gen/coinbase/staking/orchestration/v1/workflow.pb';
import {
  ListRewardsRequest,
  ListRewardsResponse,
} from '../gen/coinbase/staking/rewards/v1/reward.pb';
import {
  ListStakesRequest,
  ListStakesResponse,
} from '../gen/coinbase/staking/rewards/v1/stake.pb';

import { Ethereum } from './protocols/ethereum-kiln-staking';
import { Solana } from './protocols/solana-staking';
import { Cosmos } from './protocols/cosmos-staking';

const DEFAULT_URL = 'https://api.developer.coinbase.com/staking';

export class StakingClient {
  readonly baseURL: string;
  readonly apiKeyName: string | undefined;
  readonly apiPrivateKey: string | undefined;
  readonly Ethereum: Ethereum;
  readonly Solana: Solana;
  readonly Cosmos: Cosmos;

  constructor(apiKeyName?: string, apiPrivateKey?: string, baseURL?: string) {
    if (baseURL) {
      this.baseURL = baseURL;
    } else {
      this.baseURL = DEFAULT_URL;
    }

    if (apiKeyName) {
      this.apiKeyName = apiKeyName;
    }

    if (apiPrivateKey) {
      this.apiPrivateKey = apiPrivateKey;
    }

    this.Ethereum = new Ethereum(this);
    this.Solana = new Solana(this);
    this.Cosmos = new Cosmos(this);
  }

  // List protocols supported by Staking API
  async listProtocols(): Promise<ListProtocolsResponse> {
    const path: string = '/v1/protocols';
    const method: string = 'GET';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    const req: ListProtocolsRequest = {};

    return StakingService.ListProtocols(req, initReq);
  }

  // List networks supported by Staking API for a given protocol.
  async listNetworks(protocol: string): Promise<ListNetworksResponse> {
    const parent: string = `protocols/${protocol}`;
    const path: string = `/v1/${parent}/networks`;
    const method: string = 'GET';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    const req: ListNetworksRequest = {
      parent: parent,
    };

    return StakingService.ListNetworks(req, initReq);
  }

  // List actions supported by Staking API for a given protocol and network.
  async listActions(
    protocol: string,
    network: string,
  ): Promise<ListActionsResponse> {
    const parent: string = `protocols/${protocol}/networks/${network}`;
    const path: string = `/v1/${parent}/actions`;
    const method: string = 'GET';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );
    const req: ListActionsRequest = {
      parent: parent,
    };

    return StakingService.ListActions(req, initReq);
  }

  // Returns point-in-time context of staking data for an address. This function takes the entire req object as input.
  // Use the protocol-specific helper functions like Ethereum.ViewStakingContext to view protocol and network
  // specific staking context.
  async viewStakingContext(
    req: ViewStakingContextRequest,
  ): Promise<ViewStakingContextResponse> {
    const path: string = '/v1/viewStakingContext:view';
    const method: string = 'GET';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    return StakingService.ViewStakingContext(req, initReq);
  }

  // Create a workflow. This function takes the entire req object as input.
  // Use the protocol-specific helper functions like Ethereum.Stake to create a protocol and action specific workflow.
  async createWorkflow(req: CreateWorkflowRequest): Promise<Workflow> {
    const path: string = `/v1/workflows`;
    const method: string = 'POST';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    return StakingService.CreateWorkflow(req, initReq);
  }

  // Get a workflow given workflow id.
  async getWorkflow(workflowId: string): Promise<Workflow> {
    const name: string = `workflows/${workflowId}`;
    const path: string = `/v1/${name}`;
    const method: string = 'GET';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    const req: GetWorkflowRequest = {
      name: name,
    };

    return StakingService.GetWorkflow(req, initReq);
  }

  // Return back a signed tx or a broadcasted tx hash for a given workflow and step number.
  async performWorkflowStep(
    workflowId: string,
    stepIndex: number,
    data: string,
  ): Promise<Workflow> {
    const name: string = `${parent}/workflows/${workflowId}`;
    const path: string = `/v1/${name}/step`;
    const method: string = 'POST';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    const req: PerformWorkflowStepRequest = {
      name: name,
      step: stepIndex,
      data,
    };

    return StakingService.PerformWorkflowStep(req, initReq);
  }

  // List your workflows.
  async listWorkflows(
    pageSize: number = 100,
    filter: string = '',
  ): Promise<ListWorkflowsResponse> {
    const path: string = `/v1/workflows`;
    const method: string = 'GET';
    const url: string = this.baseURL + '/orchestration';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    const req: ListWorkflowsRequest = {
      pageSize: pageSize,
      filter: filter,
    };

    return StakingService.ListWorkflows(req, initReq);
  }

  // List onchain rewards of an address for a specific protocol, with optional filters for time range, aggregation period, and more.
  async listRewards(
    protocol: string,
    req: ListRewardsRequest,
  ): Promise<ListRewardsResponse> {
    const parent: string = `protocols/${protocol}`;
    const path: string = `/v1/${parent}/rewards`;
    const method: string = 'GET';
    const url: string = this.baseURL + '/rewards';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    return RewardService.ListRewards(req, initReq);
  }

  // List staking activities for a given protocol.
  async listStakes(
    protocol: string,
    req: ListStakesRequest,
  ): Promise<ListStakesResponse> {
    const parent: string = `protocols/${protocol}`;
    const path: string = `/v1/${parent}/stakes`;
    const method: string = 'GET';
    const url: string = this.baseURL + '/rewards';

    // Generate the JWT token and get the auth details as a initReq object.
    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(
      url,
      path,
      method,
      this.apiKeyName,
      this.apiPrivateKey,
    );

    return RewardService.ListStakes(req, initReq);
  }
}

export function workflowHasFinished(workflow: Workflow): boolean {
  return (
    workflow.state === WorkflowState.STATE_COMPLETED ||
    workflow.state === WorkflowState.STATE_FAILED
  );
}

export function workflowWaitingForExternalBroadcast(
  workflow: Workflow,
): boolean {
  return workflow.state === WorkflowState.STATE_WAITING_FOR_EXT_BROADCAST;
}

export function isTxStepOutput(
  step: WorkflowStep,
): step is WorkflowStep & { txStepOutput: TxStepOutput } {
  return (step as WorkflowStep).txStepOutput !== undefined;
}

export function isWaitStepOutput(
  step: WorkflowStep,
): step is WorkflowStep & { waitStepOutput: WaitStepOutput } {
  return (step as WorkflowStep).waitStepOutput !== undefined;
}

async function getAuthDetails(
  url: string,
  path: string,
  method: string,
  apiKeyName?: string,
  apiPrivateKey?: string,
): Promise<fm.InitReq> {
  // Generate the JWT token
  const token = await buildJWT(url + path, method, apiKeyName, apiPrivateKey);

  return {
    pathPrefix: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
