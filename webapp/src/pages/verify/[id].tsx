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

type VerificationSectionProps = {
  stepName: string;
  description: string;
};

const VerificationSection: React.FC<VerificationSectionProps> = ({
  stepName,
  description,
}) => {
  return (
    <div className="flex items-center rounded-lg bg-gradient-to-l from-green-400 to-white p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400">
        <CheckIcon className="h-6 w-6 text-white" />
      </div>

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

{
  /* <VerificationSection
stepName="Proof of Personhood"
description="Connect with Worldcoin ID"
/>
<VerificationSection
stepName="Criminal Record"
description="Upload NL Local Authority Criminal Record"
/>
<VerificationSection
stepName="Amsterdam Screening"
description="Internal Background check"
/> */
}

const Home: NextPage = () => {
  const router = useRouter();
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

            <img className="mt-4" src="/steps-min.png"></img>

            <Txt className="px-6 pb-4 pt-4" as="p" size="s">
              Security Level 3 Verification required for job involving minors
              with the public municipality.
            </Txt>

            <CardButton
              onClick={() => {
                // router.push()
              }}
              text="Verify"
            />
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
