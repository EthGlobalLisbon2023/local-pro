import { Alchemy, Network } from "alchemy-sdk";

const setupContract = async (contractAddress: string, abi: any, ) => {
  const settings = {
    apiKey: "B2gs6BuJ9M2EnmspBUvOgqETQjkIUSTk",
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(settings);
  const provider = await alchemy.config.getProvider();

  console.log("getting contract", provider);
  const contract = new (window as any).ethers.Contract(
    contractAddress,
    abi,
    provider
  );

  return contract
};


