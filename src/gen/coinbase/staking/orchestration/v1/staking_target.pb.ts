/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);
export type Validator = {
  name?: string
  address?: string
  commissionRate?: number
}

export type Contract = {
  name?: string
  address?: string
}


type BaseStakingTarget = {
}

export type StakingTarget = BaseStakingTarget
  & OneOf<{ validator: Validator; contract: Contract }>

export type ListStakingTargetsRequest = {
  parent?: string
  pageSize?: number
  pageToken?: string
}

export type ListStakingTargetsResponse = {
  stakingTargets?: StakingTarget[]
  nextPageToken?: string
}