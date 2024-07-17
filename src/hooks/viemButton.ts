// src/hooks/useNFTData.ts
import { useState, useEffect } from "react";
import { fetchNFTData, geLogData } from "../api/contract";
import logsType from "../types/logsTypes";
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
  const [blockNumber, setBlockNumber] = useState<bigint>(BigInt(""));
  const [logArray, setLogArray] = useState<logsType[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { ownerAddress, tokenUri, blockNumber } = await fetchNFTData(
        //   contractAddress,
        //   tokenId
        // );
        // setOwner(ownerAddress);
        // setTokenURI(tokenUri);
        // setBlockNumber(blockNumber);

        const logArray: logsType[] = await geLogData();
        console.log("21212", logArray);
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
