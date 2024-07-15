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
        gap="middle"
        style={boxStyle}
        justify="center"
        align="center"
        vertical
      >
        <w3m-button />
      </Flex>
    </div>
  );
};

export default web3ModalPage;
