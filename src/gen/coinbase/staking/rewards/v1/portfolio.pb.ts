/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/
export type Portfolio = {
  name?: string
  addresses?: Address[]
}

export type Address = {
  address?: string
}

export type GetPortfolioRequest = {
  name?: string
}

export type ListPortfoliosRequest = {
  pageSize?: number
  pageToken?: string
}

export type ListPortfoliosResponse = {
  portfolios?: Portfolio[]
  nextPageToken?: string
}