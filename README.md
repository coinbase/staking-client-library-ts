# Staking API Typescript Client Library

[![npm version](https://badge.fury.io/js/@coinbase%2Fstaking-client-library-ts.svg)](https://badge.fury.io/js/@coinbase%2Fstaking-client-library-ts)

This repository contains the Protocol Buffer definitions for the Coinbase **Staking API**, as well as the Typescript client libraries generated from them.

## Overview

Staking API provides a set of APIs to aid in non-custodial staking for multiple protocols and networks.

## Prerequisites

- [Node 18.12.0 or higher](https://nodejs.org/en/blog/release/v18.12.0)

## Repository Structure
- [`src/auth/`](./src/auth/) contains the authentication-related code for accessing Coinbase Cloud APIs.
- [`src/client/`](./src/client/) contains client instantiation helpers for Staking APIs.
- [`src/gen/`](./src/gen/) contains Typescript code generated from the Protocol Buffers.
- [`src/examples/`](./src/examples/) contains examples to consume the client library.

## Get Started
To test that your API Key gives you access as expected to the Staking APIs:

1. Clone this GitHub repo
2. Download your API key from the Coinbase Cloud UI and save it as `.coinbase_cloud_api_key.json` at the root of this repo
3. Run `npm install && npm run build`
4. Run `ts-node src/examples/public/example.ts`
5. You should see output like the following:
   ```text
   {
      actions: [
         {
            name: 'protocols/ethereum_kiln/networks/goerli/actions/stake'
         },
         {
            name: 'protocols/ethereum_kiln/networks/goerli/actions/unstake'
         },
         {
            name: 'protocols/ethereum_kiln/networks/goerli/actions/claim_rewards'
         },
         {
            name: 'protocols/ethereum_kiln/networks/goerli/actions/claim_stake'
         }
      ]
   }
   {
      protocols: [
         {
            name: 'protocols/ethereum_kiln'
         }
      ]
   }
   {
      networks: [
         {
            name: 'protocols/ethereum_kiln/networks/goerli',
            isMainnet: false
         },
         {
            name: 'protocols/ethereum_kiln/networks/mainnet',
            isMainnet: true
         }
      ]
   }
   ```

## Running example from your application

1. Install this package in your application - `npm install @coinbase/staking-client-library-ts`
2. Add your API key to the root of your application as `.coinbase_cloud_api_key.json`
3. Run example code:

   ```typescript
   import { StakingServiceClient } from "@coinbase/staking-client-library-ts";
   
   const client = new StakingServiceClient();
   
   const exampleFunction = () => {
        client.listProtocols().then((response) => {
            console.log(response);
        });
   };
   
   exampleFunction();
   ```
