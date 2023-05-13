import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import { AuthContext } from "n/components/authprovider";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Alchemy, Network } from "alchemy-sdk";
import { setupContract } from "n/chain-utils";
import { jobIndexerAddress, roleContractAddress } from "n/chain-utils/config";

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
    async function getJobs() {
      const indexerContract = await setupContract(
        jobIndexerAddress,
        jobIndexerAbi
      );

      const allJobs = await indexerContract.getAllAddresses();
      console.log("alljobs", allJobs);
      const rolesContract = await setupContract(allJobs[0], roleAbi);
      const allRequirements = await rolesContract.getAllRequirements();
      console.log("allRequirements", allRequirements);
    }
    getJobs();
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
