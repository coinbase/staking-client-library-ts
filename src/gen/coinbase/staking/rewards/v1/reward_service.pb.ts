/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../../../fetch.pb"
import * as CoinbaseStakingRewardsV1Portfolio from "./portfolio.pb"
import * as CoinbaseStakingRewardsV1Reward from "./reward.pb"
import * as CoinbaseStakingRewardsV1Stake from "./stake.pb"
export class RewardService {
  static ListRewards(req: CoinbaseStakingRewardsV1Reward.ListRewardsRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingRewardsV1Reward.ListRewardsResponse> {
    return fm.fetchReq<CoinbaseStakingRewardsV1Reward.ListRewardsRequest, CoinbaseStakingRewardsV1Reward.ListRewardsResponse>(`/v1/${req["parent"]}/rewards?${fm.renderURLSearchParams(req, ["parent"])}`, {...initReq, method: "GET"})
  }
  static ListStakes(req: CoinbaseStakingRewardsV1Stake.ListStakesRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingRewardsV1Stake.ListStakesResponse> {
    return fm.fetchReq<CoinbaseStakingRewardsV1Stake.ListStakesRequest, CoinbaseStakingRewardsV1Stake.ListStakesResponse>(`/v1/${req["parent"]}/stakes?${fm.renderURLSearchParams(req, ["parent"])}`, {...initReq, method: "GET"})
  }
  static GetPortfolio(req: CoinbaseStakingRewardsV1Portfolio.GetPortfolioRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingRewardsV1Portfolio.Portfolio> {
    return fm.fetchReq<CoinbaseStakingRewardsV1Portfolio.GetPortfolioRequest, CoinbaseStakingRewardsV1Portfolio.Portfolio>(`/v1/${req["nameportfolios"]}?${fm.renderURLSearchParams(req, ["nameportfolios"])}`, {...initReq, method: "GET"})
  }
  static ListPortfolios(req: CoinbaseStakingRewardsV1Portfolio.ListPortfoliosRequest, initReq?: fm.InitReq): Promise<CoinbaseStakingRewardsV1Portfolio.ListPortfoliosResponse> {
    return fm.fetchReq<CoinbaseStakingRewardsV1Portfolio.ListPortfoliosRequest, CoinbaseStakingRewardsV1Portfolio.ListPortfoliosResponse>(`/v1/portfolios?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}