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
export type EthereumKilnStakeParameters = {
  stakerAddress?: string
  integratorContractAddress?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
}

export type EthereumKilnUnstakeParameters = {
  stakerAddress?: string
  integratorContractAddress?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
}

export type EthereumKilnClaimStakeParameters = {
  stakerAddress?: string
  integratorContractAddress?: string
}


type BaseEthereumKilnStakingParameters = {
}

export type EthereumKilnStakingParameters = BaseEthereumKilnStakingParameters
  & OneOf<{ stakeParameters: EthereumKilnStakeParameters; unstakeParameters: EthereumKilnUnstakeParameters; claimStakeParameters: EthereumKilnClaimStakeParameters }>

export type EthereumKilnStakingContextParameters = {
  integratorContractAddress?: string
}

export type EthereumKilnStakingContextDetails = {
  ethereumBalance?: CoinbaseStakingV1alpha1Common.Amount
  integratorShareBalance?: CoinbaseStakingV1alpha1Common.Amount
  integratorShareUnderlyingBalance?: CoinbaseStakingV1alpha1Common.Amount
  totalExitableEth?: CoinbaseStakingV1alpha1Common.Amount
  totalSharesPendingExit?: CoinbaseStakingV1alpha1Common.Amount
  fulfillableShareCount?: CoinbaseStakingV1alpha1Common.Amount
}