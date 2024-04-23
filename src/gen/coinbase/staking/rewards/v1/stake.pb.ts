/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../../../../google/protobuf/timestamp.pb"
import * as CoinbaseStakingRewardsV1Common from "./common.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum ParticipantType {
  PARTICIPANT_TYPE_UNSPECIFIED = "PARTICIPANT_TYPE_UNSPECIFIED",
  DELEGATOR = "DELEGATOR",
  VALIDATOR = "VALIDATOR",
}

export enum RewardRateCalculationMethods {
  CALCULATION_METHODS_UNSPECIFIED = "CALCULATION_METHODS_UNSPECIFIED",
  SOLO_STAKER = "SOLO_STAKER",
  POOLED_STAKER = "POOLED_STAKER",
  EPOCH_AUTO_COMPOUNDING = "EPOCH_AUTO_COMPOUNDING",
  NO_AUTO_COMPOUNDING = "NO_AUTO_COMPOUNDING",
}

export type StakeDelegation = {
  address?: string
  amount?: CoinbaseStakingRewardsV1Common.AssetAmount
  commissionRate?: string
}


type BaseStake = {
  address?: string
  evaluationTime?: GoogleProtobufTimestamp.Timestamp
  bondedStake?: CoinbaseStakingRewardsV1Common.AssetAmount
  rewardRateCalculations?: RewardRate[]
  participantType?: ParticipantType
  protocol?: string
  unbondedBalance?: CoinbaseStakingRewardsV1Common.AssetAmount
}

export type Stake = BaseStake
  & OneOf<{ totalDelegationReceived: CoinbaseStakingRewardsV1Common.AssetAmount }>
  & OneOf<{ delegationsReceived: StakeDelegation }>
  & OneOf<{ delegationsGiven: StakeDelegation }>

export type RewardRate = {
  percentage?: string
  calculatedTime?: GoogleProtobufTimestamp.Timestamp
  calculationMethod?: RewardRateCalculationMethods
}

export type ListStakesRequest = {
  parent?: string
  pageSize?: number
  pageToken?: string
  filter?: string
  orderBy?: string
}

export type ListStakesResponse = {
  stakes?: Stake[]
  nextPageToken?: string
}