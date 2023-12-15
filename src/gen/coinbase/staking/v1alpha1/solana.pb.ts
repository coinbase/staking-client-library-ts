/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CoinbaseStakingV1alpha1Common from "./common.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type NonceOptions = {
  nonce?: string
  nonceAccount?: string
  nonceAuthority?: string
}

export type SolanaCreateStakeAccountParameters = {
  stakeAccountAddress?: string
  fromAddress?: string
  stakeAuthority?: string
  withdrawAuthority?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
  nonceOptions?: NonceOptions
}

export type SolanaDelegateStakeParameters = {
  stakeAccountAddress?: string
  voteAccountAddress?: string
  stakeAuthority?: string
  nonceOptions?: NonceOptions
}

export type SolanaDeactivateStakeParameters = {
  stakeAccountAddress?: string
  stakeAuthority?: string
  nonceOptions?: NonceOptions
}

export type SolanaWithdrawStakeParameters = {
  stakeAccountAddress?: string
  recipientAddress?: string
  withdrawAuthority?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
  nonceOptions?: NonceOptions
}

export type SolanaSplitStakeParameters = {
  stakeAccountAddress?: string
  newStakeAccountAddress?: string
  stakeAuthority?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
  nonceOptions?: NonceOptions
}

export type SolanaMergeStakeParameters = {
  stakeAccountAddress?: string
  sourceStakeAccountAddress?: string
  stakeAuthority?: string
  nonceOptions?: NonceOptions
}


type BaseSolanaStakingParameters = {
}

export type SolanaStakingParameters = BaseSolanaStakingParameters
  & OneOf<{ createStakeParameters: SolanaCreateStakeAccountParameters; delegateStakeParameters: SolanaDelegateStakeParameters; deactivateStakeParameters: SolanaDeactivateStakeParameters; withdrawStakeParameters: SolanaWithdrawStakeParameters; splitStakeParameters: SolanaSplitStakeParameters; mergeStakeParameters: SolanaMergeStakeParameters }>