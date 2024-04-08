/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

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

type BaseViewStakingContextRequest = {
  address?: string
  network?: string
}

export type ViewStakingContextRequest = BaseViewStakingContextRequest
  & OneOf<{ ethereumKilnStakingContextParameters: CoinbaseStakingOrchestrationV1Ethereum_kiln.EthereumKilnStakingContextParameters; solanaStakingContextParameters: CoinbaseStakingOrchestrationV1Solana.SolanaStakingContextParameters }>


type BaseViewStakingContextResponse = {
  address?: string
}

export type ViewStakingContextResponse = BaseViewStakingContextResponse
  & OneOf<{ ethereumKilnStakingContextDetails: CoinbaseStakingOrchestrationV1Ethereum_kiln.EthereumKilnStakingContextDetails; solanaStakingContextDetails: CoinbaseStakingOrchestrationV1Solana.SolanaStakingContextDetails }>