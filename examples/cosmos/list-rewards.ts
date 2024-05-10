import { StakingClient } from '../../src/client/staking-client';

// Address can be substituted with any Cosmos validator.
const address: string = 'cosmosvaloper1c4k24jzduc365kywrsvf5ujz4ya6mwympnc4en';

const filter: string = `address='${address}' AND period_end_time > '2024-03-25T00:00:00Z' AND period_end_time < '2024-03-27T00:00:00Z'`;

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

// Loops through rewards array and prints each reward
client.Cosmos.listRewards(filter).then((resp) => {
  resp.rewards!.forEach((reward) => {
    console.log(JSON.stringify(reward, null, 2));
  });
});
