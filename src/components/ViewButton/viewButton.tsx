"use client";
import { Card, Col, Flex, Row } from "antd";
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
    <>
      <Row>
        <Col span={12}>
          <Flex
            gap="middle"
            justify="center"
            style={boxStyle}
            align="center"
            vertical
          >
            <h1>这里默认会拿一个nft信息</h1>
            <h2>合约地址:{contractAddress}</h2>
            <h2>tokenId:{tokenId}</h2>
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
        </Col>
        <Col span={12}>
          <Flex
            gap="middle"
            justify="center"
            style={boxStyle}
            align="center"
            vertical
          >
            <Card>这里准备写连接合约</Card>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default NFTInfo;
