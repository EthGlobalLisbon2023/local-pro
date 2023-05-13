import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
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

export default Home;
