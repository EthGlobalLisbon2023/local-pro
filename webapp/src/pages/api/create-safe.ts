import { type NextApiRequest, type NextApiResponse } from "next";
import Safe, {
  EthersAdapter,
  SafeFactory,
  SafeAccountConfig,
} from "@safe-global/protocol-kit";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SafeAuthKit, Web3AuthModalPack } from "@safe-global/auth-kit";
import { ethers } from "ethers";

const options: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_REACT_APP_WEB3AUTH_CLIENT_ID as string,
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x5", //chainId,
    rpcTarget: `https://rpc.ankr.com/eth_goerli`, //https://www.alchemy.com/overviews/mumbai-testnet
  },
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["google", "facebook", "discord"],
  },
};

const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: "torus",
    showOnModal: false,
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: "metamask",
    showOnDesktop: true,
    showOnMobile: false,
  },
};

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "mandatory",
  },
  adapterSettings: {
    uxMode: "popup",
    whiteLabel: {
      name: "Safe",
    },
  },
});

const web3AuthModalPack = new Web3AuthModalPack(
  options,
  [openloginAdapter],
  modalConfig
);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const owner = request.query.owner_addr as string;
  const threshold = 1;

  console.log({ owner, threshold });

  // const ethAdapter = await this.getEthAdapter();
  const chainId = "0x5";
  // const chainInfo = CHAIN_INFO[chainId.toString()];

  const safeKit = await SafeAuthKit.init(web3AuthModalPack);
  const provider = safeKit.getProvider();

  

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: owner,
  });

  const safeFactory = await SafeFactory.create({ ethAdapter });

  console.log({ ethAdapter, safeFactory });

  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold,
    // ... (Optional params)
    // https://github.com/safe-global/safe-core-sdk/tree/main/packages/protocol-kit#deploysafe
  };

  /* This Safe is connected to owner 1 because the factory was initialized 
  with an adapter that had owner 1 as the signer. */
  const safe: Safe = await safeFactory.deploySafe({ safeAccountConfig });

  const safeAddress = safe.getAddress();

  console.log("Your Safe has been deployed:");
  console.log(`${chainInfo.blockExplorerUrl}/address/${safeAddress}`);
  console.log(`${chainInfo.transactionServiceUrl}/api/v1/safes/${safeAddress}`);
  console.log(`https://app.safe.global/${chainInfo.symbol}:${safeAddress}`);

  return { safe };
}
