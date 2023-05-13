import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import { AuthContext } from "n/components/authprovider";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Alchemy, Network } from "alchemy-sdk";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <JobsList />
        <div className="flex flex-col gap-4">
          <JobCard
            id="123"
            logo="/logo-ams.png"
            title="Guitar Teacher"
            subtitle="City of Amsterdam"
            description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. "
            compensation="25$ per Lesson"
            frequency="Weekly, 8 times"
            jobsUnlocked="AMS Certified Teacher"
          />

          <JobCard
            id="321"
            logo="/logo-ableton.png"
            title="User Group Master"
            subtitle="Ableton"
            description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. ."
            compensation="30$ per Lesson"
            frequency="Weekly, 4 times"
            jobsUnlocked="AMS Certified Teacher"
            isLocked
          />
        </div>
      </Layout>
    </>
  );
};

const jobIndexerAbi = [
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "addAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "addresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllAddresses",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "removeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const roleAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "taskCounter",
        type: "uint256",
      },
    ],
    name: "TaskCompleted",
    type: "event",
  },
  {
    inputs: [],
    name: "beneficiary",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "completeTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllRequirements",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "requirements",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const JobsList = () => {
  const { balance, signIn, signOut, signInResult, userInfo, safeAuthKit } =
    React.useContext(AuthContext);

  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    async function getJobs(
      contractAddress = "0x0B0dA0987d545dB35686C31bBdE282Fae29147EA",
      abi = jobIndexerAbi
    ) {
      if (safeAuthKit != null) {
        const settings = {
          apiKey: "B2gs6BuJ9M2EnmspBUvOgqETQjkIUSTk",
          network: Network.ETH_GOERLI,
        };

        const alchemy = new Alchemy(settings);
        const provider = await alchemy.config.getProvider();

        // // const provider = await safeAuthKit.getProvider();
        // const alchemyUrl =
        //   "https://polygon-mumbai.g.alchemy.com/v2/B2gs6BuJ9M2EnmspBUvOgqETQjkIUSTk";
        // // const provider = createAlchemyWeb3(alchemyUrl);
        // const signer = new (window as any).ethers.Wallet();
        // const contractAddress = "0x0B0dA0987d545dB35686C31bBdE282Fae29147EA";
        console.log("getting contract", provider);
        const contract = new (window as any).ethers.Contract(
          contractAddress,
          abi,
          provider
        );
        console.log("created contract");

        try {
          // Call the function
          // const result = await contract.getAllAddresses();

          const contract = setupContract()

          const result = await contract.getAllRequirements();
          console.log("RESS", result); // Process the returned result as needed

          // 0xf96156549083ad7f1ad506dd7C58292424aaC290
        } catch (error) {
          console.log("my err");
          console.error(error);
        }
      }
    }

    // getJobs();
    getJobs("0xf96156549083ad7f1ad506dd7C58292424aaC290", roleAbi);
  }, [signInResult, safeAuthKit]);

  return (
    <div className="flex flex-col gap-4">
      <JobCard
        id="123"
        logo="/logo-ams.png"
        title="Guitar Teacher"
        subtitle="City of Amsterdam"
        description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. "
        compensation="25$ per Lesson"
        frequency="Weekly, 8 times"
        jobsUnlocked="AMS Certified Teacher"
      />

      <JobCard
        id="321"
        logo="/logo-ableton.png"
        title="User Group Master"
        subtitle="Ableton"
        description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. ."
        compensation="30$ per Lesson"
        frequency="Weekly, 4 times"
        jobsUnlocked="AMS Certified Teacher"
        isLocked
      />
    </div>
  );
};

export default Home;
