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

const DEFAULT_URL = "https://api.developer.coinbase.com/staking";

export class StakingServiceClient {
  private readonly baseURL: string;

  constructor(baseURL?: string) {
    if (baseURL) {
      this.baseURL = baseURL;
    } else {
      this.baseURL = DEFAULT_URL;
    }
  }

  async listProtocols(): Promise<ListProtocolsResponse> {
    const path: string = "/api/v1alpha1/protocols";
    const method: string = "GET";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: ListProtocolsRequest = {};

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.ListProtocols(req, initReq);
  }

  async listNetworks(protocol: string): Promise<ListNetworksResponse> {
    const parent: string = `protocols/${protocol}`;
    const path: string = `/api/v1alpha1/${parent}/networks`;
    const method: string = "GET";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: ListNetworksRequest = {
      parent: parent,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.ListNetworks(req, initReq);
  }

  async listActions(
    protocol: string,
    network: string,
  ): Promise<ListActionsResponse> {
    const parent: string = `protocols/${protocol}/networks/${network}`;
    const path: string = `/api/v1alpha1/${parent}/actions`;
    const method: string = "GET";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: ListActionsRequest = {
      parent: parent,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.ListActions(req, initReq);
  }

  async viewStakingContext(
    req: ViewStakingContextRequest,
  ): Promise<ViewStakingContextResponse> {
    const path: string = "/api/v1alpha1/viewStakingContext:view";
    const method: string = "GET";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.ViewStakingContext(req, initReq);
  }

  async listWorkflows(
    project: string,
    pageSize: number = 100,
    filter: string = "",
  ): Promise<ListWorkflowsResponse> {
    const parent: string = `projects/${project}`;
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "GET";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: ListWorkflowsRequest = {
      parent: parent,
      pageSize: pageSize,
      filter: filter,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.ListWorkflows(req, initReq);
  }

  async getWorkflow(projectId: string, workflowId: string): Promise<Workflow> {
    const parent: string = `projects/${projectId}`;
    const name: string = `${parent}/workflows/${workflowId}`;
    const path: string = `/api/v1alpha1/${name}`;
    const method: string = "GET";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: GetWorkflowRequest = {
      name: name,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.GetWorkflow(req, initReq);
  }

  async createWorkflow(
    projectId: string,
    workflow: Workflow,
  ): Promise<Workflow> {
    const parent: string = `projects/${projectId}`;
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "POST";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: CreateWorkflowRequest = {
      parent,
      workflow,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.CreateWorkflow(req, initReq);
  }

  async performWorkflowStep(
    workflowName: string,
    stepIndex: number,
    data?: string,
  ): Promise<Workflow> {
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "POST";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: PerformWorkflowStepRequest = {
      name: workflowName,
      step: stepIndex,
      data,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.PerformWorkflowStep(req, initReq);
  }

  async refreshWorkflowStep(
    workflowName: string,
    stepIndex: number,
  ): Promise<Workflow> {
    const path: string = `/api/v1alpha1/${parent}/workflows`;
    const method: string = "POST";

    // Generate the JWT token
    const token = await buildJWT(this.baseURL + path, method);

    const req: RefreshWorkflowStepRequest = {
      name: workflowName,
      step: stepIndex,
    };

    const initReq: fm.InitReq = {
      pathPrefix: this.baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return StakingService.RefreshWorkflowStep(req, initReq);
  }
}
