import { StakingServiceClient } from "../../client/staking-service-client";

const client = new StakingServiceClient();

client.listProtocols().then((response) => {
  console.log(response);
});

client.listNetworks("ethereum_kiln").then((response) => {
  console.log(response);
});

client.listActions("ethereum_kiln", "goerli").then((response) => {
  console.log(response);
});
