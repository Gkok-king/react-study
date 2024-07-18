import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const projectId = "977f9a3310104079aef20dc9a6507f6d";

export const client = createPublicClient({
  chain: mainnet,
  transport: http(`https://mainnet.infura.io/v3/${projectId}`),
});
