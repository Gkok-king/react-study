import { DecodeEventLogParameters } from "./../../node_modules/viem/utils/abi/decodeEventLog";
import { array } from "./../../node_modules/@types/prop-types/index.d";
// src/api/fetchNFTData.ts
import { createPublicClient, http, parseAbiItem, Log } from "viem";
import { mainnet } from "viem/chains";
import logsType from "@/types/logsTypes";
import { client } from "@/config/vimClientConfig";

const projectId = "977f9a3310104079aef20dc9a6507f6d";

// 拿
export const fetchNFTData = async (
  contractAddress: string,
  tokenId: number
) => {
  const ownerOfAbi = parseAbiItem(
    "function ownerOf(uint256 tokenId) view returns (address)"
  );
  const tokenURIAbi = parseAbiItem(
    "function tokenURI(uint256 tokenId) view returns (string)"
  );

  const eventAbi = parseAbiItem(
    "event Transfer(address indexed from, address indexed to, uint256 value)"
  );

  const ownerAddress: string = await client.readContract({
    address: `0x${contractAddress}`,
    abi: [ownerOfAbi],
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });

  const tokenUri: string = await client.readContract({
    address: `0x${contractAddress}`,
    abi: [tokenURIAbi],
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  const blockNumber: bigint = await client.getBlockNumber();

  return { ownerAddress, tokenUri, blockNumber };
};

// 拿取日志
export const geLogData = async () => {
  const latestBlock = await client.getBlockNumber();
  const startBlock = latestBlock - BigInt(100);
  console.log("latestBlock", latestBlock);
  console.log("startBlock", startBlock);

  const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48";

  const log: any = await client.getLogs({
    address: USDC_CONTRACT_ADDRESS,
    event: parseAbiItem(
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ),
    fromBlock: startBlock,
    toBlock: latestBlock,
  });

  return log;
};

// 监听区块
export const watchBlock = async (onBlockNumberCallback: any) => {
  const unwatch = client.watchBlocks({
    onBlock: (block) => {
      // console.log("区块", block);
      onBlockNumberCallback(block);
    },
  });
  return unwatch;
};

// 拿取最新日志
export const watchEvent = async (onBlockNumberCallback: any) => {
  const unwatch = client.watchEvent({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    event: parseAbiItem(
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ),
    onLogs: (logs) => {
      console.log("logs", logs);
      onBlockNumberCallback(logs);
    },
  });
  return unwatch;
};
