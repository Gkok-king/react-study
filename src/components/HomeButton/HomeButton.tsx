// src/app/components/Button.tsx
import React from "react";
import styles from "./HomeButton.module.less";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Space } from "antd";
import WalletButton from "../WalletButton/WalletButton";
import { ReduxProvider } from "@/store";

interface HomeButtonProps {
  children?: React.ReactNode;
  label: string;
  onClick: () => void;
}
const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const HomeButton: React.FC<HomeButtonProps> = ({
  children,
  label,
  onClick,
}) => {
  return (
    <ReduxProvider>
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
          <Button
            className={styles.button}
            onClick={onClick}
            type="primary"
            size="large"
          >
            {label}
          </Button>
        </ConfigProvider>
      </Space>
    </ReduxProvider>
  );
};

export default HomeButton;
