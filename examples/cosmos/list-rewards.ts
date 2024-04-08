import { StakingClient } from '../../src/client/staking-client';

// Defines which address and rewards we want to see
const address: string = 'cosmosvaloper1c4k24jzduc365kywrsvf5ujz4ya6mwympnc4en';
const filter: string = `address='${address}' AND period_end_time > '2024-03-25T00:00:00Z' AND period_end_time < '2024-03-27T00:00:00Z'`;

const client = new StakingClient();

// Loops through rewards array and prints each reward
client.Cosmos.listRewards(filter).then((resp) => {
  resp.rewards!.forEach((reward) => {
    console.log(JSON.stringify(reward, null, 2));
  });
});
