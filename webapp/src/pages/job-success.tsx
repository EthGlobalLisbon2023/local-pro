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
              <Txt size="m" className="font-zilla text-2xl" bold>
                Congratulations!
              </Txt>
            </div>
            <div className="flex justify-center">
              <img className="my-8 h-56" src="/rocket.gif"></img>
            </div>

            <div className="flex flex-col items-center justify-center ">
              {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400">
                <CheckIcon className="h-6 w-6 text-white" />
              </div> */}
              <Txt size="s">You have unlocked</Txt>
              <Txt size="l" bold className="pb-8 font-zilla text-2xl">
                AMS trusted teacher
              </Txt>
            </div>
            <CardButton
              onClick={() => {
                router.push(`/?isUnlocked=true`);
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
