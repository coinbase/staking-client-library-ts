import { StakingClient } from '../../src/client/staking-client';
import { Workflow } from '../../src/gen/coinbase/staking/orchestration/v1/workflow.pb';

const walletAddress: string = '9NL2SkpcsdyZwsG8NmHGNra4i4NSyKbJTVd9fUQ7kJHR'; // replace with your wallet address
const amount: string = '100000000'; // replace with your amount. For solana it should be >= 0.1 SOL
const network: string = 'mainnet'; // replace with your network

const client = new StakingClient();

async function stakeSolana(): Promise<void> {
  if (walletAddress === '') {
    throw new Error('Please set the walletAddress variable in this file');
  }

  let workflow: Workflow = {} as Workflow;

  try {
    // Create a new solana stake workflow
    workflow = await client.Solana.stake(network, walletAddress, amount);

    console.log(JSON.stringify(workflow, null, 2));
  } catch (error) {
    let errorMessage = '';

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(`Error creating workflow: ${errorMessage}`);
  }
}

stakeSolana()
  .then(() => {
    console.log('Done creating sol staking workflow');
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.error('Error creating sol staking workflow: ', error.message);
    }
  });
