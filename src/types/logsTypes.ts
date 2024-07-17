type logsType = {
  address: string;
  args: {
    from: string;
    to: string;
    value: number;
  };
  transactionHash: string;
};

export default logsType;
