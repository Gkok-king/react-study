// src/hooks/useNFTData.ts
import { useState, useEffect } from "react";
import { fetchNFTData } from "../api/contract";

interface Metadata {
  name: string;
  description: string;
  image: string;
  [key: string]: any;
}

const useNFTData = (contractAddress: string, tokenId: number) => {
  const [owner, setOwner] = useState<string>("");
  const [tokenURI, setTokenURI] = useState<string>("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [blockNumber, setBlockNumber] = useState<bigint>(BigInt("11111"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ownerAddress, tokenUri, blockNumber } = await fetchNFTData(
          contractAddress,
          tokenId
        );
        setOwner(ownerAddress);
        setTokenURI(tokenUri);
        setBlockNumber(blockNumber);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchData();
  }, [contractAddress, tokenId]);

  return { owner, tokenURI, metadata, blockNumber };
};

export default useNFTData;
