import { StakingClient } from '../../src/client/staking-client';
import { Workflow } from '../../src/gen/coinbase/staking/orchestration/v1/workflow.pb';

const projectId: string = ''; // replace with your project id
const stakerAddress: string = ''; // replace with your staker address
const integrationAddress: string = '0xA55416de5DE61A0AC1aa8970a280E04388B1dE4b'; // replace with your integration address
const amount: string = '123'; // replace with your amount
const network: string = 'holesky'; // replace with your network

const client = new StakingClient();

async function stakePartialEth(): Promise<void> {
  if (projectId === '' || stakerAddress === '') {
    throw new Error(
      'Please set the projectId and stakerAddress variables in this file',
    );
  }

  let workflow: Workflow = {} as Workflow;

  try {
    // Create a new eth kiln stake workflow
    workflow = await client.Ethereum.stake(
      projectId,
      network,
      true,
      stakerAddress,
      integrationAddress,
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

stakePartialEth()
  .then(() => {
    console.log('Done creating eth staking workflow');
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.error('Error creating eth staking workflow: ', error.message);
    }
  });
