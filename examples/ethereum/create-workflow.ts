import { StakingClient } from '../../src/client/staking-client';
import { Workflow } from '../../src/gen/coinbase/staking/orchestration/v1/workflow.pb';

const stakerAddress: string = '0xdb816889F2a7362EF242E5a717dfD5B38Ae849FE'; // replace with your staker address
const integrationAddress: string = '0xA55416de5DE61A0AC1aa8970a280E04388B1dE4b'; // replace with your integration address
const amount: string = '123'; // replace with your amount
const network: string = 'holesky'; // replace with your network

const client = new StakingClient();

async function stakePartialEth(): Promise<void> {
  if (stakerAddress === '') {
    throw new Error('Please set the stakerAddress variable in this file');
  }

  let workflow: Workflow = {} as Workflow;

  try {
    // Create a new eth kiln stake workflow
    workflow = await client.Ethereum.stake(
      network,
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
