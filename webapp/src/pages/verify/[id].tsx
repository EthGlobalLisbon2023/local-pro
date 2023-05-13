import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import Card from "n/components/card/card";
import { JobHeader } from "n/components/jobheader";
import Txt from "n/components/txt";

import { CheckIcon } from "@heroicons/react/24/solid/CheckIcon";

type VerificationSectionProps = {
  stepName: string;
  description: string;
};

const VerificationSection: React.FC<VerificationSectionProps> = ({
  stepName,
  description,
}) => {
  return (
    <div className="flex items-center rounded-lg bg-gradient-to-r from-green-400 to-white p-4">
      <CheckIcon className="mr-4 h-6 w-6 text-white" />
      <div className="flex flex-col">
        <Txt size="m" bold>
          {stepName}
        </Txt>
        <Txt size="s" color="secondary">
          {description}
        </Txt>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4">
          <Card className="gap-2">
            <JobHeader
              logo="/logo-ams.png"
              title="Guitar Teacher"
              subtitle="City of Amsterdam"
            />

            <Txt className="text-center">
              In order to complete your application, please finish the
              verification
            </Txt>
          </Card>
          {/* <JobCard
            id="321"
            logo="logo-ableton.png"
            title="User Group Master"
            subtitle="Ableton"
            description="This is a great job opportunity."
            compensation="$100,000"
            frequency="Full-time"
            jobsUnlocked="AMS Certified Teacher"
            isLocked
          /> */}
        </div>
      </Layout>
    </>
  );
};

export default Home;
