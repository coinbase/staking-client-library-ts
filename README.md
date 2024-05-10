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

1. In a fresh directory, run:

   ```shell
   npm install @coinbase/staking-client-library-ts
   ```

2. Copy and paste a code sample from below or any other [example](./examples/) into an `example.ts` file.

3. Create a new API Key in the [portal](https://portal.cdp.coinbase.com/access/api) and paste the API Key name and private key into the example.

4. Run :rocket:

   ```shell
   npx ts-node example.ts
   ```

### Stake Partial ETH :diamond_shape_with_a_dot_inside:

This code sample helps stake partial ETH (non-multiples of 32 ETH). View the full source [here](examples/ethereum/create-workflow.ts)

<details open>

```typescript
// examples/ethereum/create-workflow.ts
import { StakingClient } from "@coinbase/staking-client-library-ts";

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

client.Ethereum.stake('holesky', '0xdb816889F2a7362EF242E5a717dfD5B38Ae849FE', '123')
  .then((workflow) => {
    console.log(JSON.stringify(workflow, null, 2));
  })
  .catch(() => {
    throw new Error('Error running stake action on ethereum');
  });
```

</details>

   <details>
     <summary>Output</summary>

   ```text
   {
     "name": "workflows/baecd951-838f-44ec-b7b5-20e1820c09dc",
     "action": "protocols/ethereum_kiln/networks/holesky/actions/stake",
     "ethereumKilnStakingParameters": {
       "stakeParameters": {
         "stakerAddress": "0xdb816889F2a7362EF242E5a717dfD5B38Ae849FE",
         "integratorContractAddress": "0xA55416de5DE61A0AC1aa8970a280E04388B1dE4b",
         "amount": {
           "value": "123",
           "currency": "ETH"
         }
       }
     },
     "state": "STATE_WAITING_FOR_EXT_BROADCAST",
     "currentStepId": 0,
     "steps": [
       {
         "name": "stake tx",
         "txStepOutput": {
           "unsignedTx": "02f3824268068502540be4008503c1b8346683061a8094a55416de5de61a0ac1aa8970a280e04388b1de4b7b843a4b66f1c0808080",
           "signedTx": "",
           "txHash": "",
           "state": "STATE_PENDING_EXT_BROADCAST",
           "errorMessage": ""
         }
       }
     ],
     "createTime": "2024-05-08T15:24:57.480231386Z",
     "updateTime": "2024-05-08T15:24:57.480231386Z",
     "completeTime": null
   }
   ```

   </details>

### Stake SOL :diamond_shape_with_a_dot_inside:

This code sample helps stake SOL from a given user wallet. View the full source [here](examples/solana/create-workflow.ts)

<details open>

```typescript
// examples/solana/create-workflow.ts
import { StakingClient } from "@coinbase/staking-client-library-ts";

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

client.Solana.stake('devnet', '8rMGARtkJY5QygP1mgvBFLsE9JrvXByARJiyNfcSE5Z', '100000000')
  .then((workflow) => {
    console.log(JSON.stringify(workflow, null, 2));
  })
  .catch(() => {
    throw new Error('Error running stake action on solana');
  });
```

</details>

   <details>
     <summary>Output</summary>

   ```text
   {
     "name": "workflows/2cd484db-56fe-4c8b-a53d-8039c8f27547",
     "action": "protocols/solana/networks/devnet/actions/stake",
     "solanaStakingParameters": {
       "stakeParameters": {
         "walletAddress": "8rMGARtkJY5QygP1mgvBFLsE9JrvXByARJiyNfcSE5Z",
         "validatorAddress": "GkqYQysEGmuL6V2AJoNnWZUz2ZBGWhzQXsJiXm2CLKAN",
         "amount": {
           "value": "100000000",
           "currency": "SOL"
         },
         "priorityFee": {
           "computeUnitLimit": "0",
           "unitPrice": "0"
         }
       }
     },
     "state": "STATE_WAITING_FOR_EXT_BROADCAST",
     "currentStepId": 0,
     "steps": [
       {
         "name": "stake tx",
         "txStepOutput": {
           "unsignedTx": "66hEYYWnwGWkGpMKF2H2sCzxnmoAfY8LPnYMgWdY6rC7hX2H6DEE2YdPxECFx8FeeNmea8N87L4KuZ6dirYXZi9XNr5uPJdf8W1jdShcSwzSmmqz4SA7dmFjdTM19hNEu7hMMF7C2Vcm8zka9FErt4wyshJNXYXM6cbJ8UUypGAb8g4vQDMoVavSiVFWxMGE5Sv7JL2gXkFEz2UbxvX7t6W2UbhDtt7545km4rQtFcrMTahmaoqaTMysLuoMcJpzps1c7pCigthYYcBN7yxF4zVZHJHbMXqFuap1BAb2MCYeBxk4krzGJNR3Avo6seVVthxMLHqExv8Yzrdvufn61xv6S4DGQdhbbUM2auGi5b45bkJ4EEHKMhEXqXWrYHSQQMbtgJ2EP4zNiSK8avPREuUQS4BS1aRUF3zT8bkEfWDfp5EjxAs6fumYZCkRKsyjRHEZMN6m9fwESmJqdJPeTJUrZkkvhJZCszPdeTNxSzrUnaeQ2oLvmw29MXVzdvx9gzpa1AKP9YcWjjbZGBkBrYnKzS6KkDBvi2uvo633eqJCrMzRDrVsvQPAi9kTQcqMFt567WotqbF9EBhfAKMss9G9eHXeVCGPa7P2kG9Whix2adaatpi6B6yUjfHFKwXNyXrTUM5UnjCBW9PoLyjPve8q6x6HqVb63v97B29HjguuEZhMjrMctXpPB4EVhemczKitdsYaQRFzsV1R3XVHnfha2BwTyw5B9U7uYFqdrfKwwszni5aqvAsSV3YwGEuwMrZSaCYVub5DtDaqKiJee138tGsn16bg6seb5jZeEiguaAmwDrXY9nT4ihvh4Gqtao4BoipSvb3vQJsjG4KAxTQWb3HFqQXUoVrs81sRh64amtg7or4Pwj8F5fMwx6VyqHW8BbfA4CaXrfunWLKo5Qap1gNnaV9WxoN9n9bKsJ9fS2PQgtX",
           "signedTx": "",
           "txHash": "",
           "state": "STATE_PENDING_EXT_BROADCAST",
           "errorMessage": ""
         }
       }
     ],
     "createTime": "2024-05-08T15:25:58.265307812Z",
     "updateTime": "2024-05-08T15:25:58.265307812Z",
     "completeTime": null
   }
   ```

   </details>

### View Ethereum Rewards :moneybag:

This code sample helps view rewards for an Ethereum validator address. View the full source [here](examples/ethereum/list-rewards.ts).

<details open>

```typescript
// examples/ethereum/list-rewards.ts
import { StakingClient } from "@coinbase/staking-client-library-ts";

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

// Defines which address and rewards we want to see
const address: string =
  '0xac53512c39d0081ca4437c285305eb423f474e6153693c12fbba4a3df78bcaa3422b31d800c5bea71c1b017168a60474';
const filter: string = `address='${address}' AND period_end_time > '2024-02-25T00:00:00Z' AND period_end_time < '2024-02-27T00:00:00Z'`;

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

## Documentation

There are numerous examples in the [`examples directory`](./examples) to help get you started. For even more, refer to our [documentation website](https://docs.cdp.coinbase.com/staking/docs/welcome) for detailed definitions, [API specification](https://docs.cdp.coinbase.com/staking/reference), integration guides, and more!

## Contributing

Thanks for considering contributing to the project! Please refer to [our contribution guide](./CONTRIBUTING.md).

## Contact Us

If you have any questions, please reach out to us in the #staking channel on our [Discord](https://discord.com/invite/cdp) server.
