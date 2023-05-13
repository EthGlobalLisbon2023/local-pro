import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import XIcon from "@heroicons/react/24/solid/XMarkIcon";
import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import { AuthContext } from "n/components/authprovider";
import { setupContract } from "n/chain-utils";
import {
  jobIndexerAbi,
  jobIndexerAddress,
  roleAbi,
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
  const [isVisible, setIsVisible] = React.useState(true);
  const [shouldRender, setShouldRender] = React.useState(true);

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

  React.useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 6500); // slightly longer than the transition duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isUnlocked === "true" && shouldRender && (
        <div
          className={`custom-class relative flex items-center justify-between rounded-lg bg-purple-600 py-3 transition-opacity duration-[1.5s] ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="mx-auto text-white">
            You have unlocked 1 new job!
          </span>
        </div>
      )}
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
        title="User Group Lead"
        subtitle="Ableton"
        description="We are looking for our new User Group Lead Amsterdam. In Ableton User Groups you will find independent musicians and producers who are willing to share their knowledge and experience."
        compensation="100$ voucher"
        frequency="1x month"
        isLocked={!isUnlocked}
      />
      <JobCard
        id="321"
        logo="/logo-fyta.png"
        title="Growth Hacker"
        subtitle="FYTA"
        description="Become a plant ambnassador! The FYTA Beam is an innovative plant sensor that helps you to better understand your plants and keep them healthy. And all around."
        compensation="Commission based"
        frequency="10h per week "
        // isLocked={!isUnlocked}
      />
      {/* {isUnlocked === "true" && (
        <JobCard
          id="321"
          logo="/logo-fyta.png"
          title="Growth Hacker"
          subtitle="FYTA"
          description="Become a plant ambnassador! The FYTA Beam is an innovative plant sensor that helps you to better understand your plants and keep them healthy. And all around."
          compensation="Commission based"
          frequency="10h per week "
          isLocked={!isUnlocked}
        />
      )} */}
    </div>
  );
};

export default Home;
