// src/hooks/useNFTData.ts
import { useState, useEffect } from "react";
import { fetchNFTData, geLogData, watchBlock } from "../api/contract";
import logsType from "../types/logsTypes";
import { watchBlockNumber } from "viem/actions";
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
  const [blockNumber, setBlockNumber] = useState<bigint>();
  const [logArray, setLogArray] = useState<logsType[]>();
  useEffect(() => {
    let unwatch;
    const fetchData = async () => {
      try {
        // const { ownerAddress, tokenUri, blockNumber } = await fetchNFTData(
        //   contractAddress,
        //   tokenId
        // );
        // setOwner(ownerAddress);
        // setTokenURI(tokenUri);

        const logArray: logsType[] = await geLogData();
        setLogArray(logArray);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };
    fetchData();
  }, [contractAddress, tokenId]);

  return { owner, tokenURI, metadata, blockNumber, logArray };
};

export default useNFTData;
