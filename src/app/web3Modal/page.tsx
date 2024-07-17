import { Flex } from "antd";
import React from "react";
const boxStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};
const web3ModalPage = () => {
  return (
    <div>
      <Flex
        className="w-screen h-screen"
        gap="middle"
        justify="center"
        align="center"
        vertical
      >
        <w3m-button />
        <button className="bg-sky-500 hover:bg-sky-700">点一下</button>
      </Flex>
    </div>
  );
};

export default web3ModalPage;
