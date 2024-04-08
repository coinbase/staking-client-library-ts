import { StakingClient } from '../../src/client/staking-client';

// TODO: Replace address as per your requirement.
const address: string = 'beefKGBWeSpHzYBHZXwp5So7wdQGX6mu4ZHCsH3uTar';

const client = new StakingClient();

async function listRewards(): Promise<void> {
  if (address === '') {
    throw new Error('Please set the address variable in this file');
  }

  const filter: string = `address='${address}'`;

  try {
    // List solana rewards
    let resp = await client.Solana.listRewards(filter);

    let count = 0;

    // Loop through rewards array and print each reward
    resp.rewards!.forEach((reward) => {
      count++;
      const marshaledReward = JSON.stringify(reward);

      console.log(`[${count}] Reward details: ${marshaledReward}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error listing solana rewards: ${error.message}`);
    }
  }
}

listRewards().catch((error) => {
  console.error('Error listing solana rewards: ', error.message);
});
