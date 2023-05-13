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
            logo="logo-ams.png"
            title="Guitar Teacher"
            subtitle="City of Amsterdam"
            description="This is a great job opportunity."
            compensation="$100,000"
            frequency="Full-time"
            jobsUnlocked="AMS Certified Teacher"
          />

          <JobCard
            logo="logo-ableton.png"
            title="User Group Master"
            subtitle="Ableton"
            description="This is a great job opportunity."
            compensation="$100,000"
            frequency="Full-time"
            jobsUnlocked="AMS Certified Teacher"
            isLocked
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;
