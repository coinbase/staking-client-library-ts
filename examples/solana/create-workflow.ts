import { StakingClient } from '../../src/client/staking-client';
import { Workflow } from '../../src/gen/coinbase/staking/orchestration/v1/workflow.pb';

const projectId: string = ''; // replace with your project id
const walletAddress: string = ''; // replace with your wallet address
const validatorAddress: string = 'beefKGBWeSpHzYBHZXwp5So7wdQGX6mu4ZHCsH3uTar'; // replace with your validator address
const amount: string = '100000000'; // replace with your amount. For solana it should be >= 0.1 SOL
const network: string = 'mainnet'; // replace with your network

const client = new StakingClient();

async function stakeSolana(): Promise<void> {
  if (projectId === '' || walletAddress === '') {
    throw new Error(
      'Please set the projectId and stakerAddress variables in this file',
    );
  }

  let workflow: Workflow = {} as Workflow;

  try {
    // Create a new solana stake workflow
    workflow = await client.Solana.stake(
      projectId,
      network,
      true,
      walletAddress,
      validatorAddress,
      amount,
    );

    console.log('Workflow created %s ...', workflow.name);
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
