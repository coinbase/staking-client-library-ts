/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as CoinbaseStakingOrchestrationV1Action from "./action.pb"
import * as CoinbaseStakingOrchestrationV1Network from "./network.pb"
import * as CoinbaseStakingOrchestrationV1Protocol from "./protocol.pb"
import * as CoinbaseStakingOrchestrationV1Staking_context from "./staking_context.pb"
import * as CoinbaseStakingOrchestrationV1Staking_target from "./staking_target.pb"
import * as CoinbaseStakingOrchestrationV1Workflow from "./workflow.pb"
export class StakingService {
  static ListProtocols(req: CoinbaseStakingOrchestrationV1Protocol.ListProtocolsRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Protocol.ListProtocolsResponse> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Protocol.ListProtocolsRequest, CoinbaseStakingOrchestrationV1Protocol.ListProtocolsResponse>(`/v1/protocols?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ListNetworks(req: CoinbaseStakingOrchestrationV1Network.ListNetworksRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Network.ListNetworksResponse> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Network.ListNetworksRequest, CoinbaseStakingOrchestrationV1Network.ListNetworksResponse>(`/v1/${req["parent"]}/networks?${fm.renderURLSearchParams(req, ["parent"])}`, {...initReq, method: "GET"})
  }
  static ListStakingTargets(req: CoinbaseStakingOrchestrationV1Staking_target.ListStakingTargetsRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Staking_target.ListStakingTargetsResponse> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Staking_target.ListStakingTargetsRequest, CoinbaseStakingOrchestrationV1Staking_target.ListStakingTargetsResponse>(`/v1/${req["parent"]}/stakingTargets?${fm.renderURLSearchParams(req, ["parent"])}`, {...initReq, method: "GET"})
  }
  static ListActions(req: CoinbaseStakingOrchestrationV1Action.ListActionsRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Action.ListActionsResponse> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Action.ListActionsRequest, CoinbaseStakingOrchestrationV1Action.ListActionsResponse>(`/v1/${req["parent"]}/actions?${fm.renderURLSearchParams(req, ["parent"])}`, {...initReq, method: "GET"})
  }
  static CreateWorkflow(req: CoinbaseStakingOrchestrationV1Workflow.CreateWorkflowRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Workflow.Workflow> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Workflow.CreateWorkflowRequest, CoinbaseStakingOrchestrationV1Workflow.Workflow>(`/v1/${req["parent"]}/workflows`, {...initReq, method: "POST", body: JSON.stringify(req["workflow"], fm.replacer)})
  }
  static GetWorkflow(req: CoinbaseStakingOrchestrationV1Workflow.GetWorkflowRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Workflow.Workflow> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Workflow.GetWorkflowRequest, CoinbaseStakingOrchestrationV1Workflow.Workflow>(`/v1/${req["name"]}?${fm.renderURLSearchParams(req, ["name"])}`, {...initReq, method: "GET"})
  }
  static ListWorkflows(req: CoinbaseStakingOrchestrationV1Workflow.ListWorkflowsRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Workflow.ListWorkflowsResponse> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Workflow.ListWorkflowsRequest, CoinbaseStakingOrchestrationV1Workflow.ListWorkflowsResponse>(`/v1/${req["parent"]}/workflows?${fm.renderURLSearchParams(req, ["parent"])}`, {...initReq, method: "GET"})
  }
  static PerformWorkflowStep(req: CoinbaseStakingOrchestrationV1Workflow.PerformWorkflowStepRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Workflow.Workflow> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Workflow.PerformWorkflowStepRequest, CoinbaseStakingOrchestrationV1Workflow.Workflow>(`/v1/${req["name"]}/step`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ViewStakingContext(req: CoinbaseStakingOrchestrationV1Staking_context.ViewStakingContextRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingOrchestrationV1Staking_context.ViewStakingContextResponse> {
    return fm.fetchReq<CoinbaseStakingOrchestrationV1Staking_context.ViewStakingContextRequest, CoinbaseStakingOrchestrationV1Staking_context.ViewStakingContextResponse>(`/v1/viewStakingContext:view?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}