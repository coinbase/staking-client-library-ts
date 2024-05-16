import { StakingClient } from '../../src/client/staking-client';

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

// Defines which address and rewards we want to see
const address: string = '0x60c7e246344ae3856cf9abe3a2e258d495fc39e0';
const filter: string = `address='${address}' AND period_end_time > '2024-05-01T00:00:00Z' AND period_end_time < '2024-05-02T00:00:00Z'`;

// Loops through rewards array and prints each reward
(async (): Promise<void> => {
  const resp = await client.Ethereum.listRewards(filter);
  // eslint-disable-next-line @typescript-eslint/padding-line-between-statements
  resp.rewards!.forEach((reward) => {
    console.log(JSON.stringify(reward, null, 2));
  });
})();
