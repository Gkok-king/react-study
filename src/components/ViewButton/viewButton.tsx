"use client";
import { Button, Card, Col, Flex, List, Row } from "antd";
import React, { useState, useEffect } from "react";
import useNFTData from "../../hooks/viemButton";
import { watchBlock, watchEvent } from "../../api/contract";
import { log } from "console";
import blockTypes from "@/types/blockTypes";
import logsType from "@/types/logsTypes";
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
  const { owner, tokenURI, metadata, logArray, watchBlockNumber } = useNFTData(
    contractAddress,
    tokenId
  );

  const [blockNumber, setBlockNumber] = useState<blockTypes>();
  const [newLogData, setNewLogData] = useState<logsType[]>();

  useEffect(() => {
    const fetchBlockNumber = async () => {
      await watchBlock((blockNumber: blockTypes) => {
        setBlockNumber(blockNumber);
      });
      await watchEvent((logs: logsType[]) => {
        setNewLogData(logs);
      });
    };

    fetchBlockNumber();
  }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <Flex
            gap="middle"
            justify="center"
            className="min-h-80"
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
              <strong>区块高度:</strong>
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
            className="min-h-80"
            align="center"
            vertical
          >
            <button onClick={watchBlock}>这里是查的USTD 最近100的交易</button>
            <div className=" overflow-auto bg-white  max-h-40">
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
      <Row>
        <Col className="min-h-40" span={12}>
          <Flex
            gap="middle"
            justify="center"
            className="min-h-80"
            align="center"
            vertical
          >
            <h1>监听新区块，打印区块高度和区块哈稀值</h1>
            <Card className="bg-amber-100">
              <h6>区块高度:{blockNumber?.number + ""}</h6>
              <h6>hash:{blockNumber?.hash}</h6>
            </Card>
            <h1>实时采集并打印最新 USDT Token</h1>
            <Card className="bg-amber-100">
              <div className=" overflow-auto bg-white  max-h-40">
                <List
                  itemLayout="horizontal"
                  dataSource={newLogData}
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
            </Card>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex
            gap="middle"
            justify="center"
            className="min-h-80"
            align="center"
            vertical
          >
            <h1>后续</h1>
            <Card>12</Card>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default NFTInfo;
