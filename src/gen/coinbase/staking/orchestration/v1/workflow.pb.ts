/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
import * as CoinbaseStakingOrchestrationV1Ethereum_kiln from "./ethereum_kiln.pb"
import * as CoinbaseStakingOrchestrationV1Solana from "./solana.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum TxStepOutputState {
  STATE_UNSPECIFIED = "STATE_UNSPECIFIED",
  STATE_NOT_CONSTRUCTED = "STATE_NOT_CONSTRUCTED",
  STATE_CONSTRUCTED = "STATE_CONSTRUCTED",
  STATE_PENDING_SIGNING = "STATE_PENDING_SIGNING",
  STATE_SIGNED = "STATE_SIGNED",
  STATE_BROADCASTING = "STATE_BROADCASTING",
  STATE_CONFIRMING = "STATE_CONFIRMING",
  STATE_CONFIRMED = "STATE_CONFIRMED",
  STATE_FINALIZED = "STATE_FINALIZED",
  STATE_FAILED = "STATE_FAILED",
  STATE_SUCCESS = "STATE_SUCCESS",
  STATE_PENDING_EXT_BROADCAST = "STATE_PENDING_EXT_BROADCAST",
}

export enum WaitStepOutputWaitUnit {
  WAIT_UNIT_UNSPECIFIED = "WAIT_UNIT_UNSPECIFIED",
  WAIT_UNIT_SECONDS = "WAIT_UNIT_SECONDS",
  WAIT_UNIT_BLOCKS = "WAIT_UNIT_BLOCKS",
  WAIT_UNIT_EPOCHS = "WAIT_UNIT_EPOCHS",
  WAIT_UNIT_CHECKPOINTS = "WAIT_UNIT_CHECKPOINTS",
}

export enum WaitStepOutputState {
  STATE_UNSPECIFIED = "STATE_UNSPECIFIED",
  STATE_NOT_STARTED = "STATE_NOT_STARTED",
  STATE_IN_PROGRESS = "STATE_IN_PROGRESS",
  STATE_COMPLETED = "STATE_COMPLETED",
}

export enum WorkflowState {
  STATE_UNSPECIFIED = "STATE_UNSPECIFIED",
  STATE_IN_PROGRESS = "STATE_IN_PROGRESS",
  STATE_WAITING_FOR_SIGNING = "STATE_WAITING_FOR_SIGNING",
  STATE_COMPLETED = "STATE_COMPLETED",
  STATE_FAILED = "STATE_FAILED",
  STATE_WAITING_FOR_EXT_BROADCAST = "STATE_WAITING_FOR_EXT_BROADCAST",
}

export type TxStepOutput = {
  unsignedTx?: string
  signedTx?: string
  txHash?: string
  state?: TxStepOutputState
  errorMessage?: string
}

export type WaitStepOutput = {
  start?: string
  current?: string
  target?: string
  unit?: WaitStepOutputWaitUnit
  state?: WaitStepOutputState
}


type BaseWorkflowStep = {
  name?: string
}

export type WorkflowStep = BaseWorkflowStep
  & OneOf<{ txStepOutput: TxStepOutput; waitStepOutput: WaitStepOutput }>


type BaseWorkflow = {
  name?: string
  action?: string
  state?: WorkflowState
  currentStepId?: number
  steps?: WorkflowStep[]
  createTime?: GoogleProtobufTimestamp.Timestamp
  updateTime?: GoogleProtobufTimestamp.Timestamp
  skipBroadcast?: boolean
  completeTime?: GoogleProtobufTimestamp.Timestamp
}

export type Workflow = BaseWorkflow
  & OneOf<{ solanaStakingParameters: CoinbaseStakingOrchestrationV1Solana.SolanaStakingParameters; ethereumKilnStakingParameters: CoinbaseStakingOrchestrationV1Ethereum_kiln.EthereumKilnStakingParameters }>

export type CreateWorkflowRequest = {
  parent?: string
  workflow?: Workflow
}

export type GetWorkflowRequest = {
  name?: string
}

export type ListWorkflowsRequest = {
  parent?: string
  filter?: string
  pageSize?: number
  pageToken?: string
}

export type ListWorkflowsResponse = {
  workflows?: Workflow[]
  nextPageToken?: string
}

export type PerformWorkflowStepRequest = {
  name?: string
  step?: number
  data?: string
}