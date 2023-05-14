import { SafeAuthKit, Web3AuthModalPack } from "@safe-global/auth-kit";
import Safe, {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { formatToUSD, sleep } from "n/utils";

import React, { useState } from "react";

export const AuthContext = React.createContext<any>({});

const ethPrice = 1808.91;

const options: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_REACT_APP_WEB3AUTH_CLIENT_ID as string,
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x5", //"0x13881", //"0x5", //chainId,
    rpcTarget: `https://rpc.ankr.com/eth_goerli`, // "https://polygon-mumbai.g.alchemy.com/v2/B2gs6BuJ9M2EnmspBUvOgqETQjkIUSTk", ///`https://rpc.ankr.com/eth_goerli`, //https://www.alchemy.com/overviews/mumbai-testnet
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

let calledInitSafeAuth = false;
let calledGetBal = false;

const createSafe = async (ethers: any, signer: any, addr: string) => {
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  console.log("creating fact");

  const safeFactory = await SafeFactory.create({ ethAdapter });

  const safeAccountConfig: SafeAccountConfig = {
    owners: [addr],
    threshold: 1,
  };
  console.log("deploying safe");

  const safe: Safe = await safeFactory.deploySafe({
    safeAccountConfig,
  });

  return safe;
};

const AuthProvider = ({ children }: any) => {
  const [safeAuthKit, setSafeAuthKit] = useState<any>(null);
  const [balance, setBalance] = useState<any>("N/A");
  const [signer, setSigner] = useState<any>(null);
  const [signInResult, setSignInResult] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  //init ethers
  let ethers: any = null;
  if (typeof window != "undefined") {
    ethers = (window as any).ethers;
  }

  React.useEffect(() => {
    async function initSafeAuth() {
      if (safeAuthKit == null) {
        calledInitSafeAuth = true;
        const safeKit = await SafeAuthKit.init(web3AuthModalPack, {
          txServiceUrl: "https://safe-transaction-goerli.safe.global/",
        });
        setSafeAuthKit(safeKit);

        const provider = safeKit.getProvider();
        console.log("prv", provider, ethers);

        if (provider != null && ethers != null) {
          calledGetBal = true;
          const client = new ethers.providers.Web3Provider(provider);
          const signer = await client.getSigner();
          setSigner(signer);
          const addr = await signer.getAddress();
          console.log("addr", addr);
          const usrinfo = await safeKit.getUserInfo();
          setUserInfo(usrinfo);

          const balance = await client.getBalance(addr);
          const prettyBal = ethers.utils.formatEther(balance);
          console.log("bal", prettyBal, balance);
          setBalance(formatToUSD(prettyBal * ethPrice));
        }
      }
    }
    initSafeAuth();
  }, [safeAuthKit, signInResult]);

  React.useEffect(() => {
    async function initGetBalance() {
      console.log("calling get bal", signInResult, safeAuthKit, signer);
      if (safeAuthKit != null) {
        try {
          const provider = safeAuthKit.getProvider();
          const client = new ethers.providers.Web3Provider(provider);
          const signer = await client.getSigner();
          const addr = await signer.getAddress();

          const usrinfo = await safeAuthKit.getUserInfo();
          setUserInfo(usrinfo);
          console.log("bal addr", addr);
          const balance = await client.getBalance(addr);
          const prettyBal = ethers.utils.formatEther(balance);
          console.log("bal", prettyBal, balance);
          setBalance(formatToUSD(prettyBal * ethPrice));
        } catch (err: any) {
          console.error(err);
          setBalance("N/A");
        }
      }
    }

    initGetBalance();
  }, [safeAuthKit, signInResult, signer]);

  React.useEffect(() => {
    async function initCreateSafe() {
      console.log("signInResult", signInResult);
      if (signInResult?.safes?.length === 0) {
        // TODO: Implement createSafe logic
        const provider = safeAuthKit.getProvider();
        const client = new ethers.providers.Web3Provider(provider);
        const signer = await client.getSigner();
        const addr = await signer.getAddress();
        const safe: Safe = await createSafe(ethers, signer, addr);
        console.log("SAFE CREATED!!", safe);
      }
    }

    initCreateSafe();
  }, [signInResult, safeAuthKit]);

  const signIn = async () => {
    if (safeAuthKit != null) {
      const signinRet = await safeAuthKit.signIn();
      setSignInResult(signinRet);
      console.log("SIGNIN", signinRet);
    } else {
      console.log("safe auth kit not initialized yet");
    }
    // TODO: Implement sign in logic
  };

  const signOut = async () => {
    if (safeAuthKit != null) {
      await safeAuthKit.signOut();
      setSignInResult(null);
    } else {
      console.log("safe auth kit not initialized yet");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        safeAuthKit,
        userInfo,
        balance,
        signer,
        signInResult,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
