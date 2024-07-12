"use client";
import React, { useState, useEffect } from "react";
import { createPublicClient, http, parseAbiItem } from "viem";
import { mainnet } from "viem/chains";

interface NFTInfoProps {
  contractAddress: string;
  tokenId: number;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  [key: string]: any;
}

const NFTInfo: React.FC<NFTInfoProps> = ({ contractAddress, tokenId }) => {
  const [owner, setOwner] = useState<string>("");
  const [tokenURI, setTokenURI] = useState<string>("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    const fetchNFTData = async () => {
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

      try {
        // 获取持有人地址
        const ownerAddress: string = await client.readContract({
          address: contractAddress,
          abi: [ownerOfAbi],
          functionName: "ownerOf",
          args: [tokenId],
        });
        setOwner(ownerAddress);

        // 获取Token URI
        const tokenUri: string = await client.readContract({
          address: contractAddress,
          abi: [tokenURIAbi],
          functionName: "tokenURI",
          args: [tokenId],
        });
        setTokenURI(tokenUri);

        // 获取Token元数据
        const response = await fetch(tokenUri);
        const metadata: Metadata = await response.json();
        setMetadata(metadata);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchNFTData();
  }, [contractAddress, tokenId]);

  return (
    <div>
      <h1>NFT Info</h1>
      <p>
        <strong>Owner:</strong> {owner}
      </p>
      <p>
        <strong>Token URI:</strong> {tokenURI}
      </p>
      {metadata && (
        <div>
          <h2>Metadata</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NFTInfo;
