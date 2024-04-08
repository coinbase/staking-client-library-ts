import { StakingClient } from '../../src/client/staking-client';

// TODO: Replace address as per your requirement.
const address: string =
  '0xac53512c39d0081ca4437c285305eb423f474e6153693c12fbba4a3df78bcaa3422b31d800c5bea71c1b017168a60474';

const client = new StakingClient();

async function listStakes(): Promise<void> {
  if (address === '') {
    throw new Error('Please set the address variable in this file');
  }

  const filter: string = `address='${address}'`;

  try {
    // List ethereum staking balances
    let resp = await client.Ethereum.listStakes(filter);

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
  console.error('Error listing ethereum staking balances: ', error.message);
});
