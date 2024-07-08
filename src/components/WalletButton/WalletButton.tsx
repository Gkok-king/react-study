import React, { useState } from "react";
import { Button, ConfigProvider, Space } from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import { WalletConnection, connectWallet } from "../../utils/wallet";

interface WalletButtonProps {
  children?: React.ReactNode;
}

const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const WalletConnect: React.FC = () => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      const walletConnection = await connectWallet();
      setWallet(walletConnection);
      setError(null);
    } catch (err) {
      setWallet(null);
    }
  };

  return (
    <Space>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                colors1
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                colors1
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button type="primary" size="large" onClick={handleConnectWallet}>
          连接🦊钱包
        </Button>
      </ConfigProvider>
      {wallet && <p>已连接地址: {wallet.address}</p>}
      {error && <p style={{ color: "red" }}>错误: {error}</p>}
    </Space>
  );
};

export default WalletConnect;
