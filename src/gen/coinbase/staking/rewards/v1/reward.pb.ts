/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
import * as CoinbaseStakingRewardsV1Common from "./common.pb"
import * as CoinbaseStakingRewardsV1Stake from "./stake.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum AggregationUnit {
  AGGREGATION_UNIT_UNSPECIFIED = "AGGREGATION_UNIT_UNSPECIFIED",
  EPOCH = "EPOCH",
  DAY = "DAY",
}

export enum USDValueSource {
  SOURCE_UNSPECIFIED = "SOURCE_UNSPECIFIED",
  COINBASE_EXCHANGE = "COINBASE_EXCHANGE",
}


type BaseReward = {
  address?: string
  aggregationUnit?: AggregationUnit
  periodStartTime?: GoogleProtobufTimestamp.Timestamp
  periodEndTime?: GoogleProtobufTimestamp.Timestamp
  totalEarnedNativeUnit?: CoinbaseStakingRewardsV1Common.AssetAmount
  totalEarnedUsd?: USDValue[]
  endingBalance?: CoinbaseStakingRewardsV1Stake.Stake
  protocol?: string
}

export type Reward = BaseReward
  & OneOf<{ epoch: string; date: string }>

export type USDValue = {
  source?: USDValueSource
  conversionTime?: GoogleProtobufTimestamp.Timestamp
  amount?: CoinbaseStakingRewardsV1Common.AssetAmount
  conversionPrice?: string
}

export type ListRewardsRequest = {
  parent?: string
  pageSize?: number
  pageToken?: string
  filter?: string
}

export type ListRewardsResponse = {
  rewards?: Reward[]
  nextPageToken?: string
}