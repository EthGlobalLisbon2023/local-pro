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
            <div className="mt-2 flex justify-center">
              <Txt size="m" className="text-2xl" bold>
                Congratulations!
              </Txt>
            </div>
            <img className="mb-4 p-16" src="/rocket.gif"></img>
            <div className="flex justify-center gap-4 ">
              {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400">
                <CheckIcon className="h-6 w-6 text-white" />
              </div> */}
              <p>you are now a certified teacher!</p>
            </div>
            <CardButton
              onClick={() => {
                router.push(`/`);
              }}
              text="Go to marketplace"
            />
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
