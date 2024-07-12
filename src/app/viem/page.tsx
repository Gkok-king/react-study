import NFTInfo from "@/components/ViewButton/viewButton";
import React from "react";

const viemPage = () => {
  return (
    <div>
      <NFTInfo
        contractAddress="0x0483b0dfc6c78062b9e999a82ffb795925381415"
        tokenId={1}
      />
    </div>
  );
};

export default viemPage;
