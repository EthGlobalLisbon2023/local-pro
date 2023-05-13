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

  const [jobs, setJobs] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getJobs() {
      const indexerContract = await setupContract(
        jobIndexerAddress,
        jobIndexerAbi
      );

      const allJobs = await indexerContract.getAllAddresses();

      console.log("alljobs", allJobs);
      setJobs(allJobs);
      let jobsData = [];
      for (let i = 0; i < allJobs.length; i++) {
        const jobAddr = allJobs[i];

        const rolesContract = await setupContract(allJobs[0], roleAbi);
        const data = await Promise.all([
          rolesContract.logo(),
          rolesContract.description(),
          rolesContract.title(),
          rolesContract.subtitle(),
          rolesContract.compensation(),
          rolesContract.frequency(),
          rolesContract.jobsUnlocked(),
          rolesContract.getAllRequirements(),
        ]).then(
          ([
            logo,
            description,
            title,
            subtitle,
            compensation,
            frequency,
            jobsUnlocked,
            requirements,
          ]) => ({
            id: jobAddr,
            logo,
            description,
            title,
            subtitle,
            compensation,
            frequency,
            jobsUnlocked,
            requirements,
          })
        );

        console.log("data", data);
        jobsData.push(data);
      }
      console.log("jobsData", jobsData);
      setJobs(jobsData);
      // const allRequirements = await rolesContract.getAllRequirements();
      // console.log("allRequirements", allRequirements);
    }
    getJobs();
  }, [signInResult, safeAuthKit]);

  return (
    <div className="flex flex-col gap-4">
      {isUnlocked !== "true" &&
        jobs.map((el) => (
          <JobCard
            id={el.id}
            logo={el.logo}
            title={el.title}
            subtitle={el.subtitle}
            description={el.description}
            compensation={el.compensation}
            frequency={el.frequency}
            jobsUnlocked={el.jobsUnlocked}
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
