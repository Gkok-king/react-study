"use client";
import { Flex } from "antd";
import React, { useState, useEffect } from "react";
import useNFTData from "../../hooks/viemButton";

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

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

const NFTInfo: React.FC<NFTInfoProps> = ({ contractAddress, tokenId }) => {
  const { owner, tokenURI, metadata, blockNumber } = useNFTData(
    contractAddress,
    tokenId
  );
  return (
    <Flex
      gap="middle"
      justify="center"
      style={boxStyle}
      align="center"
      vertical
    >
      <h1>NFT Info</h1>
      <p>
        <strong>Owner:</strong> {owner}
      </p>
      <p>
        <strong>Token URI:</strong> {tokenURI}
      </p>
      <p>
        <strong>区块高度:{blockNumber.toString()}</strong>
      </p>
      {metadata && (
        <div>
          <h2>Metadata</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </Flex>
  );
};

export default NFTInfo;
