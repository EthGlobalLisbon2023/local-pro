import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import { AuthContext } from "n/components/authprovider";
import { setupContract } from "n/chain-utils";
import {
  jobIndexerAbi,
  jobIndexerAddress,
  roleAbi,
  roleContractAddress,
} from "n/chain-utils/config";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <JobsList />
      </Layout>
    </>
  );
};

const JobsList = () => {
  const router = useRouter();
  const { isUnlocked } = router.query;

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
      setJobs(allJobs);
      const rolesContract = await setupContract(allJobs[0], roleAbi);
      const allRequirements = await rolesContract.getAllRequirements();
      console.log("allRequirements", allRequirements);
    }
    getJobs();
  }, [signInResult, safeAuthKit]);

  return (
    <div className="flex flex-col gap-4">
      {isUnlocked !== "true" &&
        jobs.map((el) => (
          <JobCard
            id={el}
            logo="/logo-ams.png"
            title="Guitar Teacher"
            subtitle="City of Amsterdam"
            description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. "
            compensation="25$ per Lesson"
            frequency="Weekly, 8 times"
            jobsUnlocked="AMS Trusted Teacher"
          />
        ))}

      <JobCard
        id="321"
        logo="/logo-ableton.png"
        title="User Group Master"
        subtitle="Ableton"
        description="We are seeking a skilled and passionate music teacher to provide after-school guitar lessons to students between 12 and 16 years old. ."
        compensation="30$ per Lesson"
        frequency="Weekly, 4 times"
        jobsUnlocked="AMS Trusted Teacher"
        isLocked={!isUnlocked}
      />
    </div>
  );
};

export default Home;
