// src/api/fetchNFTData.ts
import { createPublicClient, http, parseAbiItem } from "viem";
import { mainnet } from "viem/chains";

export const fetchNFTData = async (
  contractAddress: string,
  tokenId: number
) => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const ownerOfAbi = parseAbiItem(
    "function ownerOf(uint256 tokenId) view returns (address)"
  );
  const tokenURIAbi = parseAbiItem(
    "function tokenURI(uint256 tokenId) view returns (string)"
  );

  const ownerAddress: string = await client.readContract({
    address: contractAddress,
    abi: [ownerOfAbi],
    functionName: "ownerOf",
    args: [tokenId],
  });

  const tokenUri: string = await client.readContract({
    address: contractAddress,
    abi: [tokenURIAbi],
    functionName: "tokenURI",
    args: [tokenId],
  });

  const blockNumber: bigint = await client.getBlockNumber();

  return { ownerAddress, tokenUri, blockNumber };
};
