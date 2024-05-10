import { StakingClient } from '../../src/client/staking-client';

// Address can be substituted with any Cosmos validator.
const address: string = 'cosmosvaloper1c4k24jzduc365kywrsvf5ujz4ya6mwympnc4en';

// Set your api key name and private key here. Get your keys from here: https://portal.cdp.coinbase.com/access/api
const apiKeyName: string = 'your-api-key-name';
const apiPrivateKey: string = 'your-api-private-key';

const client = new StakingClient(apiKeyName, apiPrivateKey);

async function listStakes(): Promise<void> {
  if (address === '') {
    throw new Error('Please set the address variable in this file');
  }

  const filter: string = `address='${address}'`;

  try {
    // List cosmos staking balances
    let resp = await client.Cosmos.listStakes(filter);

    let count = 0;

    // Loop through staked balance array and print each balance
    resp.stakes!.forEach((stake) => {
      count++;
      const marshaledStake = JSON.stringify(stake);

      console.log(`[${count}] Stake details: ${marshaledStake}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error listing staking balances: ${error.message}`);
    }
  }
}

listStakes().catch((error) => {
  console.error('Error listing cosmos staking balances: ', error.message);
});
