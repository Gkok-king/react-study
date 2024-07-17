"use client";
import { Card, Col, Flex, List, Row } from "antd";
import React, { useState, useEffect } from "react";
import useNFTData from "../../hooks/viemButton";
import { geLogData } from "../../api/contract";
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

function formatNumber(value: number) {
  return value.toString + " wei";
}

const NFTInfo: React.FC<NFTInfoProps> = ({ contractAddress, tokenId }) => {
  const { owner, tokenURI, metadata, blockNumber, logArray } = useNFTData(
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
            <button onClick={geLogData}>点击</button>
            <div className=" overflow-auto bg-white">
              <List
                itemLayout="horizontal"
                dataSource={logArray}
                renderItem={(item, index) => (
                  <List.Item>
                    <p>
                      {item.args.from}
                      <br />
                      转给
                      <br />
                      {item.args.to}
                      <br />
                      {Number(item.args.value)}wei
                      <br />
                      交易ID： {item.transactionHash}
                    </p>
                  </List.Item>
                )}
              />
            </div>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default NFTInfo;
