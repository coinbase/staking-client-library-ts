import { StakingClient } from '../src/client/staking-client';

const client = new StakingClient();

client.listProtocols().then((response) => {
  console.log(response);
});

client.listNetworks('ethereum_kiln').then((response) => {
  console.log(response);
});

client.listActions('ethereum_kiln', 'holesky').then((response) => {
  console.log(response);
});
