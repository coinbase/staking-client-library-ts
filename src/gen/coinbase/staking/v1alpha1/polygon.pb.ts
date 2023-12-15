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
export type PolygonStakeParameters = {
  delegatorAddress?: string
  validatorAddress?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
}

export type PolygonUnstakeParameters = {
  delegatorAddress?: string
  validatorAddress?: string
  amount?: CoinbaseStakingV1alpha1Common.Amount
}

export type PolygonRestakeParameters = {
  delegatorAddress?: string
  validatorAddress?: string
}

export type PolygonClaimRewardsParameters = {
  delegatorAddress?: string
  validatorAddress?: string
}


type BasePolygonStakingParameters = {
}

export type PolygonStakingParameters = BasePolygonStakingParameters
  & OneOf<{ stakeParameters: PolygonStakeParameters; unstakeParameters: PolygonUnstakeParameters; restakeParameters: PolygonRestakeParameters; claimRewardsParameters: PolygonClaimRewardsParameters }>