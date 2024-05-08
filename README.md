<img src='docs/images/banner.svg' width='1100' alt='Coinbase Staking API'>

# [Coinbase Staking API](https://github.com/coinbase/staking-client-library-ts)

> Programmatic access to Coinbase's best-in-class staking infrastructure and services. :large_blue_circle:

[![npm version](https://badge.fury.io/js/@coinbase%2Fstaking-client-library-ts.svg)](https://badge.fury.io/js/@coinbase%2Fstaking-client-library-ts) [![Current version](https://img.shields.io/github/tag/coinbase/staking-client-library-ts?color=3498DB&label=version)](https://github.com/coinbase/staking-client-library-ts/releases) [![GitHub contributors](https://img.shields.io/github/contributors/coinbase/staking-client-library-ts?color=3498DB)](https://github.com/coinbase/staking-client-library-ts/graphs/contributors) [![GitHub Stars](https://img.shields.io/github/stars/coinbase/staking-client-library-ts.svg?color=3498DB)](https://github.com/coinbase/staking-client-library-ts/stargazers) [![GitHub](https://img.shields.io/github/license/coinbase/staking-client-library-ts?color=3498DB)](https://github.com/coinbase/staking-client-library-ts/blob/main/LICENSE)

## Overview

`staking-client-library-ts` is the Typescript SDK for the **Coinbase Staking API** :large_blue_circle:.

The Coinbase Staking API empowers developers to deliver a fully-featured staking experience in their Web2 apps, wallets, or dApps using *one common interface* across protocols.

A traditional infrastructure-heavy staking integration can take months. Coinbase's Staking API enables onboarding within hours :sparkles:.

## Quick Start

Prerequisite: [Node 20+](https://www.npmjs.com/package/node/v/20.11.1)

1. Install this package: `npm install @coinbase/staking-client-library-ts`
2. Create and download an API key from the [Coinbase Developer Platform](https://portal.cdp.coinbase.com/access/api).
3. Place the key named `.coinbase_cloud_api_key.json` at the root of this repository.
4. Run one of the code samples [below](#stake-partial-eth-💠) or any of our [provided examples](./examples/) :rocket:.

### Stake Partial ETH :diamond_shape_with_a_dot_inside:

This code sample creates an ETH staking workflow. View the full code sample [here](examples/ethereum/create-workflow.ts)

<details open>
  <summary>Code Sample</summary>

```typescript
// examples/ethereum/create-workflow.ts
import { StakingClient } from "@coinbase/staking-client-library-ts";

const client = new StakingClient();

client.Ethereum.stake('holesky', '0xdb816889F2a7362EF242E5a717dfD5B38Ae849FE', '123')
  .then((workflow) => {
    console.log('Workflow created %s', workflow.name);
  })
  .catch(() => {
    throw new Error(`Error creating workflow`);
  });
```

</details>

   <details>
     <summary>Output</summary>

   ```text
   Workflow created workflows/c34df125-a989-438d-8451-bd403423986a
   ```

   </details>

### Stake SOL :diamond_shape_with_a_dot_inside:

This code sample creates a SOL staking workflow. View the full code sample [here](examples/solana/create-workflow.ts)

<details open>
  <summary>Code Sample</summary>

```typescript
// examples/solana/create-workflow.ts
import { StakingClient } from "@coinbase/staking-client-library-ts";

const client = new StakingClient();

client.Solana.stake('devnet', '8rMGARtkJY5QygP1mgvBFLsE9JrvXByARJiyNfcSE5Z', '100000000')
  .then((workflow) => {
    console.log('Workflow created %s', workflow.name);
  })
  .catch(() => {
    throw new Error(`Error creating workflow`);
  });
```

</details>

   <details>
     <summary>Output</summary>

   ```text
   Workflow created workflows/e6373b20-edf0-4cf9-91ea-709328d0d63e
   ```

   </details>

### View Ethereum Rewards :moneybag:

This code sample returns rewards for an Ethereum validator address. View the full code sample [here](examples/ethereum/list-rewards.ts).

<details open>
  <summary>Code Sample</summary>

```typescript
import { StakingClient } from "@coinbase/staking-client-library-ts";

// Defines which address and rewards we want to see
const address: string =
  '0xac53512c39d0081ca4437c285305eb423f474e6153693c12fbba4a3df78bcaa3422b31d800c5bea71c1b017168a60474';
const filter: string = `address='${address}' AND period_end_time > '2024-02-25T00:00:00Z' AND period_end_time < '2024-02-27T00:00:00Z'`;

const client = new StakingClient();

// Loops through rewards array and prints each reward
client.Ethereum.listRewards(filter).then((resp) => {
  resp.rewards!.forEach((reward) => {
    console.log(JSON.stringify(reward, null, 2));
  });
});
```

</details>

   <details>
     <summary>Output</summary>

   ```json
   {
      "address": "0xac53512c39d0081ca4437c285305eb423f474e6153693c12fbba4a3df78bcaa3422b31d800c5bea71c1b017168a60474",
      "date": "2024-02-25",
      "aggregationUnit": "DAY",
      "periodStartTime": "2024-02-25T00:00:00Z",
      "periodEndTime": "2024-02-25T23:59:59Z",
      "totalEarnedNativeUnit": {
         "amount": "0.002183619",
         "exp": "18",
         "ticker": "ETH",
         "rawNumeric": "2183619000000000"
      },
      "totalEarnedUsd": [
         {
            "source": "COINBASE_EXCHANGE",
            "conversionTime": "2024-02-26T00:09:00Z",
            "amount": {
               "amount": "6.79",
               "exp": "2",
               "ticker": "USD",
               "rawNumeric": "679"
            },
            "conversionPrice": "3105.780029"
         }
      ],
      "endingBalance": null,
      "protocol": "ethereum"
   }
   {
      "address": "0xac53512c39d0081ca4437c285305eb423f474e6153693c12fbba4a3df78bcaa3422b31d800c5bea71c1b017168a60474",
      "date": "2024-02-26",
      "aggregationUnit": "DAY",
      "periodStartTime": "2024-02-26T00:00:00Z",
      "periodEndTime": "2024-02-26T23:59:59Z",
      "totalEarnedNativeUnit": {
         "amount": "0.002182946",
         "exp": "18",
         "ticker": "ETH",
         "rawNumeric": "2182946000000000"
      },
      "totalEarnedUsd": [
         {
            "source": "COINBASE_EXCHANGE",
            "conversionTime": "2024-02-27T00:09:00Z",
            "amount": {
               "amount": "6.94",
               "exp": "2",
               "ticker": "USD",
               "rawNumeric": "694"
            },
            "conversionPrice": "3178.889893"
         }
      ],
      "endingBalance": null,
      "protocol": "ethereum"
   }
   ```

   </details>

## Contributing

Thanks for considering contributing to the project! Please refer to [our contribution guide](./CONTRIBUTING.md).

## Documentation

There are numerous examples in the [`examples directory`](./examples) to help get you started. For even more, refer to our [documentation website](https://docs.cdp.coinbase.com/) for detailed definitions, API specifications, integration guides, and more!
