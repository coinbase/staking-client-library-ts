/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CoinbaseStakingOrchestrationV1Common from "./common.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum StakeAccountBalanceState {
  BALANCE_STATE_UNSPECIFIED = "BALANCE_STATE_UNSPECIFIED",
  BALANCE_STATE_INACTIVE = "BALANCE_STATE_INACTIVE",
  BALANCE_STATE_ACTIVATING = "BALANCE_STATE_ACTIVATING",
  BALANCE_STATE_ACTIVE = "BALANCE_STATE_ACTIVE",
  BALANCE_STATE_DEACTIVATING = "BALANCE_STATE_DEACTIVATING",
}

export type PriorityFee = {
  computeUnitLimit?: string
  unitPrice?: string
}

export type SolanaStakeParameters = {
  walletAddress?: string
  validatorAddress?: string
  amount?: CoinbaseStakingOrchestrationV1Common.Amount
  priorityFee?: PriorityFee
}

export type SolanaUnstakeParameters = {
  walletAddress?: string
  stakeAccountAddress?: string
  amount?: CoinbaseStakingOrchestrationV1Common.Amount
  priorityFee?: PriorityFee
}

export type SolanaClaimStakeParameters = {
  walletAddress?: string
  stakeAccountAddress?: string
  priorityFee?: PriorityFee
}

export type SolanaStakingContextParameters = {
}

export type SolanaStakingContextDetails = {
  balance?: CoinbaseStakingOrchestrationV1Common.Amount
  currentEpoch?: string
  epochCompletionPercentage?: string
  stakeAccounts?: StakeAccount[]
}

export type StakeAccount = {
  address?: string
  bondedStake?: CoinbaseStakingOrchestrationV1Common.Amount
  rentReserve?: CoinbaseStakingOrchestrationV1Common.Amount
  balance?: CoinbaseStakingOrchestrationV1Common.Amount
  balanceState?: StakeAccountBalanceState
  validator?: string
}


type BaseSolanaStakingParameters = {
}

export type SolanaStakingParameters = BaseSolanaStakingParameters
  & OneOf<{ stakeParameters: SolanaStakeParameters; unstakeParameters: SolanaUnstakeParameters; claimStakeParameters: SolanaClaimStakeParameters }>