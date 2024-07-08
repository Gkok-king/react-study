// global.d.ts
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request?: (args: {
      method: string;
      params?: unknown[];
    }) => Promise<unknown>;
  };
}
