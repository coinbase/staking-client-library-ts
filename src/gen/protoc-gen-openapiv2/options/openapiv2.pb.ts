/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufStruct from "../../google/protobuf/struct.pb"

export enum Scheme {
  UNKNOWN = "UNKNOWN",
  HTTP = "HTTP",
  HTTPS = "HTTPS",
  WS = "WS",
  WSS = "WSS",
}

export enum HeaderParameterType {
  UNKNOWN = "UNKNOWN",
  STRING = "STRING",
  NUMBER = "NUMBER",
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
}

export enum JSONSchemaJSONSchemaSimpleTypes {
  UNKNOWN = "UNKNOWN",
  ARRAY = "ARRAY",
  BOOLEAN = "BOOLEAN",
  INTEGER = "INTEGER",
  NULL = "NULL",
  NUMBER = "NUMBER",
  OBJECT = "OBJECT",
  STRING = "STRING",
}

export enum SecuritySchemeType {
  TYPE_INVALID = "TYPE_INVALID",
  TYPE_BASIC = "TYPE_BASIC",
  TYPE_API_KEY = "TYPE_API_KEY",
  TYPE_OAUTH2 = "TYPE_OAUTH2",
}

export enum SecuritySchemeIn {
  IN_INVALID = "IN_INVALID",
  IN_QUERY = "IN_QUERY",
  IN_HEADER = "IN_HEADER",
}

export enum SecuritySchemeFlow {
  FLOW_INVALID = "FLOW_INVALID",
  FLOW_IMPLICIT = "FLOW_IMPLICIT",
  FLOW_PASSWORD = "FLOW_PASSWORD",
  FLOW_APPLICATION = "FLOW_APPLICATION",
  FLOW_ACCESS_CODE = "FLOW_ACCESS_CODE",
}

export type Swagger = {
  swagger?: string
  info?: Info
  host?: string
  basePath?: string
  schemes?: Scheme[]
  consumes?: string[]
  produces?: string[]
  responses?: {[key: string]: Response}
  securityDefinitions?: SecurityDefinitions
  security?: SecurityRequirement[]
  tags?: Tag[]
  externalDocs?: ExternalDocumentation
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
}

export type Operation = {
  tags?: string[]
  summary?: string
  description?: string
  externalDocs?: ExternalDocumentation
  operationId?: string
  consumes?: string[]
  produces?: string[]
  responses?: {[key: string]: Response}
  schemes?: Scheme[]
  deprecated?: boolean
  security?: SecurityRequirement[]
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
  parameters?: Parameters
}

export type Parameters = {
  headers?: HeaderParameter[]
}

export type HeaderParameter = {
  name?: string
  description?: string
  type?: HeaderParameterType
  format?: string
  required?: boolean
}

export type Header = {
  description?: string
  type?: string
  format?: string
  default?: string
  pattern?: string
}

export type Response = {
  description?: string
  schema?: Schema
  headers?: {[key: string]: Header}
  examples?: {[key: string]: string}
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
}

export type Info = {
  title?: string
  description?: string
  termsOfService?: string
  contact?: Contact
  license?: License
  version?: string
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
}

export type Contact = {
  name?: string
  url?: string
  email?: string
}

export type License = {
  name?: string
  url?: string
}

export type ExternalDocumentation = {
  description?: string
  url?: string
}

export type Schema = {
  jsonSchema?: JSONSchema
  discriminator?: string
  readOnly?: boolean
  externalDocs?: ExternalDocumentation
  example?: string
}

export type JSONSchemaFieldConfiguration = {
  pathParamName?: string
}

export type JSONSchema = {
  ref?: string
  title?: string
  description?: string
  default?: string
  readOnly?: boolean
  example?: string
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: boolean
  minimum?: number
  exclusiveMinimum?: boolean
  maxLength?: string
  minLength?: string
  pattern?: string
  maxItems?: string
  minItems?: string
  uniqueItems?: boolean
  maxProperties?: string
  minProperties?: string
  required?: string[]
  array?: string[]
  type?: JSONSchemaJSONSchemaSimpleTypes[]
  format?: string
  enum?: string[]
  fieldConfiguration?: JSONSchemaFieldConfiguration
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
}

export type Tag = {
  name?: string
  description?: string
  externalDocs?: ExternalDocumentation
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
}

export type SecurityDefinitions = {
  security?: {[key: string]: SecurityScheme}
}

export type SecurityScheme = {
  type?: SecuritySchemeType
  description?: string
  name?: string
  in?: SecuritySchemeIn
  flow?: SecuritySchemeFlow
  authorizationUrl?: string
  tokenUrl?: string
  scopes?: Scopes
  extensions?: {[key: string]: GoogleProtobufStruct.Value}
}

export type SecurityRequirementSecurityRequirementValue = {
  scope?: string[]
}

export type SecurityRequirement = {
  securityRequirement?: {[key: string]: SecurityRequirementSecurityRequirementValue}
}

export type Scopes = {
  scope?: {[key: string]: string}
}