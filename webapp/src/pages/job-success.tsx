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
            <div className="mb-8 flex justify-center">
              <Txt size="m" className="text-3xl" bold>
                Congratulations!
              </Txt>
            </div>
            <img className="mb-4" src="/rocket.gif"></img>

            <CardButton
              onClick={() => {
                router.push(`/`);
              }}
              text="Home"
            />
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
