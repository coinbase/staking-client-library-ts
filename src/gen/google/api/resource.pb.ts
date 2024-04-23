/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum ResourceDescriptorHistory {
  HISTORY_UNSPECIFIED = "HISTORY_UNSPECIFIED",
  ORIGINALLY_SINGLE_PATTERN = "ORIGINALLY_SINGLE_PATTERN",
  FUTURE_MULTI_PATTERN = "FUTURE_MULTI_PATTERN",
}

export enum ResourceDescriptorStyle {
  STYLE_UNSPECIFIED = "STYLE_UNSPECIFIED",
  DECLARATIVE_FRIENDLY = "DECLARATIVE_FRIENDLY",
}

export type ResourceDescriptor = {
  type?: string
  pattern?: string[]
  nameField?: string
  history?: ResourceDescriptorHistory
  plural?: string
  singular?: string
  style?: ResourceDescriptorStyle[]
}

export type ResourceReference = {
  type?: string
  childType?: string
}