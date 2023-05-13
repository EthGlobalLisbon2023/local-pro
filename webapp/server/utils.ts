import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

export const serverSetupContract = async (contractAddress: string, abi: any, ) => {
  const settings = {
    apiKey: "B2gs6BuJ9M2EnmspBUvOgqETQjkIUSTk",
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(settings);
  const provider = await alchemy.config.getProvider();

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    provider
  );

  return contract
};