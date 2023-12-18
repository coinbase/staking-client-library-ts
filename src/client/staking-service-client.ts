import { StakingService } from "../gen/coinbase/staking/v1alpha1/api.pb";
import {
  ListProtocolsRequest,
  ListProtocolsResponse,
} from "../gen/coinbase/staking/v1alpha1/protocol.pb";
import {
  ListNetworksRequest,
  ListNetworksResponse,
} from "../gen/coinbase/staking/v1alpha1/network.pb";
import {
  ListActionsRequest,
  ListActionsResponse,
} from "../gen/coinbase/staking/v1alpha1/action.pb";
import * as fm from "../gen/fetch.pb";
import { buildJWT } from "../auth";
import {
  ViewStakingContextRequest,
  ViewStakingContextResponse,
} from "../gen/coinbase/staking/v1alpha1/staking_context.pb";
import {
  CreateWorkflowRequest,
  GetWorkflowRequest,
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  PerformWorkflowStepRequest,
  RefreshWorkflowStepRequest,
  Workflow,
} from "../gen/coinbase/staking/v1alpha1/workflow.pb";

import { EthereumKiln } from "./protocols/ethereum_kiln_staking";

const DEFAULT_URL = "https://api.developer.coinbase.com/staking";

export class StakingServiceClient {
  readonly baseURL: string;
  readonly EthereumKiln: EthereumKiln;

  constructor(baseURL?: string) {
    if (baseURL) {
      this.baseURL = baseURL;
    } else {
      this.baseURL = DEFAULT_URL;
    }

    this.EthereumKiln = new EthereumKiln(this);
  }

  // List protocols supported by Staking API
  async listProtocols(): Promise<ListProtocolsResponse> {
    const path: string = "/api/v1alpha1/protocols";
    const method: string = "GET";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    const req: ListProtocolsRequest = {};

    return StakingService.ListProtocols(req, initReq);
  }

  // List networks supported by Staking API for a given protocol.
  async listNetworks(protocol: string): Promise<ListNetworksResponse> {
    const parent: string = `protocols/${protocol}`;
    const path: string = `/api/v1alpha1/${parent}/networks`;
    const method: string = "GET";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

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
    const path: string = `/api/v1alpha1/${parent}/actions`;
    const method: string = "GET";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    const req: ListActionsRequest = {
      parent: parent,
    };

    return StakingService.ListActions(req, initReq);
  }

  // Returns point-in-time context of staking data for an address. This function takes the entire req object as input.
  // Use the protocol-specific helper functions like EthereumKiln.ViewStakingContext to view protocol and network
  // specific staking context.
  async viewStakingContext(
    req: ViewStakingContextRequest,
  ): Promise<ViewStakingContextResponse> {
    const path: string = "/api/v1alpha1/viewStakingContext:view";
    const method: string = "GET";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    return StakingService.ViewStakingContext(req, initReq);
  }

  // Create a workflow under a given project. This function takes the entire req object as input.
  // Use the protocol-specific helper functions like EthereumKiln.Stake to create a protocol and action specific workflow.
  async createWorkflow(
    projectId: string,
    req: CreateWorkflowRequest,
  ): Promise<Workflow> {
    const parent: string = `projects/${projectId}`;
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "POST";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    return StakingService.CreateWorkflow(req, initReq);
  }

  // Get a workflow given its project and workflow id.
  async getWorkflow(projectId: string, workflowId: string): Promise<Workflow> {
    const parent: string = `projects/${projectId}`;
    const name: string = `${parent}/workflows/${workflowId}`;
    const path: string = `/api/v1alpha1/${name}`;
    const method: string = "GET";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    const req: GetWorkflowRequest = {
      name: name,
    };

    return StakingService.GetWorkflow(req, initReq);
  }

  // Return back a signed tx or a broadcasted tx hash for a given workflow and step number.
  async performWorkflowStep(
    workflowName: string,
    stepIndex: number,
    data?: string,
  ): Promise<Workflow> {
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "POST";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    const req: PerformWorkflowStepRequest = {
      name: workflowName,
      step: stepIndex,
      data,
    };

    return StakingService.PerformWorkflowStep(req, initReq);
  }

  // Refresh a workflow step given its workflow name and step number.
  async refreshWorkflowStep(
    workflowName: string,
    stepIndex: number,
  ): Promise<Workflow> {
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "POST";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    const req: RefreshWorkflowStepRequest = {
      name: workflowName,
      step: stepIndex,
    };

    return StakingService.RefreshWorkflowStep(req, initReq);
  }

  // List workflows for a given project.
  async listWorkflows(
    project: string,
    pageSize: number = 100,
    filter: string = "",
  ): Promise<ListWorkflowsResponse> {
    const parent: string = `projects/${project}`;
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "GET";

    // Generate the JWT token and get the auth details as a initReq object.
    const initReq = await getAuthDetails(this.baseURL, path, method);

    const req: ListWorkflowsRequest = {
      parent: parent,
      pageSize: pageSize,
      filter: filter,
    };

    return StakingService.ListWorkflows(req, initReq);
  }
}

async function getAuthDetails(
  baseURL: string,
  path: string,
  method: string,
): Promise<fm.InitReq> {
  // Generate the JWT token
  const token = await buildJWT(baseURL + path, method);

  return {
    pathPrefix: baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
