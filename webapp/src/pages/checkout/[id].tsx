import * as React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Layout from "n/components/layout";
import JobCard from "n/components/card/jobcard";
import Card from "n/components/card/card";
import { JobHeader } from "n/components/jobheader";
import Txt from "n/components/txt";

import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { useRouter } from "next/router";
import Button from "n/components/button";
import { CardButton } from "n/components/card-button";
import { roleAbi } from "n/chain-utils/config";
import { setupContract } from "n/chain-utils";
import VerificationSection from "n/components/verification-section";
import CountdownTimer from "n/components/countdown-timer";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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

            <div className="mt-32 flex justify-center">
              <Txt size="m">Task in progress</Txt>
            </div>
            <div className="mb-32 flex justify-center">
              <CountdownTimer seconds={0} countUp />
            </div>

            <CardButton
              onClick={() => {
                router.push(`/job-success`);
              }}
              text="End Task"
            />
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
