import { StakingClient } from '../../../src/client/staking-client';

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

// Defines which validator address and rewards we want to see.
const validatorAddress: string =
  '0xac53512c39d0081ca4437c285305eb423f474e6153693c12fbba4a3df78bcaa3422b31d800c5bea71c1b017168a60474';
const validatorFilter: string = `address='${validatorAddress}' AND period_end_time > '2024-02-25T00:00:00Z' AND period_end_time < '2024-02-27T00:00:00Z'`;

// Loops through validator rewards array and prints each reward.
(async (): Promise<void> => {
  const resp = await client.Ethereum.listRewards(validatorFilter);
  // eslint-disable-next-line @typescript-eslint/padding-line-between-statements
  resp.rewards!.forEach((reward) => {
    console.log(JSON.stringify(reward, null, 2));
  });
})();
