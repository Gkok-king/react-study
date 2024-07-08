import { ethers } from "ethers";

export interface WalletConnection {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string;
}

export const connectWallet = async (): Promise<WalletConnection> => {
  if ((window as any).ethereum) {
    try {
      // 请求用户授权连接钱包
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });

      // 创建一个新的Web3Provider
      const provider = new ethers.BrowserProvider((window as any).ethereum);

      // 获取签名者（用户账户）
      const signer = await provider.getSigner();

      // 获取用户地址
      const address = await signer.getAddress();

      return {
        provider,
        signer,
        address,
      };
    } catch (error) {
      console.error("钱包连接失败:", error);
      throw new Error("钱包连接失败");
    }
  } else {
    console.log("请安装MetaMask!");
    throw new Error("请安装MetaMask");
  }
};
