import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SafeAuthKit, Web3AuthModalPack } from "@safe-global/auth-kit";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { type Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import Safe, {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";

const fetchCreateSafe = async (owner_addr: string) => {
  try {
    console.log("feetching");
    const response = await fetch(`/api/create-safe?owner_addr=${owner_addr}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

// import { ethers } from "./dist/ethers.min.js";
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
// if (typeof window != "undefined") {
//   import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
// }

// import dynamic from "next/dynamic";

// const ethers = dynamic(
//   () => import("https://cdn.ethers.io/lib/ethers-5.2.esm.min.js"),
//   {
//     ssr: false,
//   }
// );

// import { ethers } from "ethers";
/* eslint-disable */
// @ts-nocheck

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

// const safeAuthKit = await SafeAuthKit.init(web3AuthModalPack);

// Allow to login and get the derived EOA
// safeAuthKit.signIn();

// // Logout
// safeAuthKit.signOut();

// // Get the provider
// safeAuthKit.getProvider();

let calledInitSafeAuth = false;
let calledGetBal = false;

const Home: NextPage = () => {
  const [safeAuthKit, setSafeAuthKit] = React.useState<any>(null);
  const [balance, setBalance] = React.useState<string>("N/A");

  let ethers: any = null;
  if (typeof window != "undefined") {
    ethers = (window as any).ethers;
  }

  React.useEffect(() => {
    async function initSafeAuth() {
      if (safeAuthKit == null && calledInitSafeAuth === false) {
        calledInitSafeAuth = true;
        const safeKit = await SafeAuthKit.init(web3AuthModalPack, {
          txServiceUrl: "https://safe-transaction-goerli.safe.global/",
        });
        setSafeAuthKit(safeKit);

        const provider = safeKit.getProvider();
        console.log("prv", provider, ethers);

        if (provider != null && ethers != null && calledGetBal === false) {
          calledGetBal = true;
          const client = new ethers.providers.Web3Provider(provider);
          const signer = await client.getSigner();
          const addr = await signer.getAddress();

          const balance = await client.getBalance(addr);
          const prettyBal = ethers.utils.formatEther(balance);
          console.log("bal", prettyBal, balance);
          setBalance(prettyBal);

          // 0x4153322fAFce40e46d0f05F60539655eB1c90c30

          const ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: signer,
          });

          console.log("addr", addr);

          console.log("creating fact");

          const safeFactory = await SafeFactory.create({ ethAdapter });

          const safeAccountConfig: SafeAccountConfig = {
            owners: [addr],
            threshold: 1,
            // ... (Optional params)
            // https://github.com/safe-global/safe-core-sdk/tree/main/packages/protocol-kit#deploysafe
          };
          console.log("asdasd");

          const safe: Safe = await safeFactory.deploySafe({
            safeAccountConfig,
          });
          console.log("SAFE CREATED!!", safe);

          // await fetchCreateSafe(addr);
        }
      }
    }
    initSafeAuth();
    console.log(window);
  });

  console.log(safeAuthKit);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
          type="application/javascript"
        ></script>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div>
            <p>Your balance: {balance}</p>
          </div>
          <button
            onClick={async () => {
              const signinRet = await safeAuthKit.signIn();
              console.log("SIGNIN", signinRet);
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => {
              safeAuthKit.signOut();
            }}
          >
            Sign Out
          </button>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>

              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
