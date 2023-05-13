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

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [requirements, setRequirements] = React.useState([]);

  React.useEffect(() => {
    async function getReqs() {
      const rolesContract = await setupContract(id, roleAbi);
      const allRequirements = await rolesContract.getAllRequirements();
      console.log("allRequirements", allRequirements);
      setRequirements(allRequirements);
    }
    getReqs();
  }, [id]);

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

            {/* <img className="mt-4" src="/steps-min.png"></img> */}
            <div className="my-3 flex flex-col gap-2">
              {requirements.map((el) => (
                <VerificationSection
                  key={JSON.stringify(el)}
                  stepName={el}
                  description="Connect with Worldcoin ID"
                />
              ))}
            </div>

            {/* 
            <VerificationSection
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
            /> */}

            <Txt className="px-6 pb-4 pt-4" as="p" size="s">
              Security Level 3 Verification required for job involving minors
              with the public municipality.
            </Txt>

            <CardButton
              onClick={() => {
                router.push("/task/" + id);
              }}
              text="Verify"
            />
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
