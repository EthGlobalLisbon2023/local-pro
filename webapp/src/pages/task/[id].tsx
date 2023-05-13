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
import XIcon from "@heroicons/react/24/solid/XMarkIcon";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isVisible, setIsVisible] = React.useState(true);
  const [shouldRender, setShouldRender] = React.useState(true);

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
    <>
      <Layout>
        <div className="flex flex-col gap-4">
          {shouldRender && (
            <div
              className={`custom-class relative flex items-center justify-between rounded-lg bg-purple-600 py-3 transition-opacity duration-[1.5s] ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
             
                <span className="mx-auto text-white ">
                  You've unlocked your first Task Package!
                </span>
            </div>
          )}

          <Card className="gap-2">
            <JobHeader
              logo="/logo-ams.png"
              title="Guitar Teacher"
              subtitle="City of Amsterdam"
            />
            <div className="mb-4 ml-4 flex flex-col">
              <Txt size="m" bold>
                Details
              </Txt>
              <Txt size="s">Frequency: Weekly on Tuesdays</Txt>
              <Txt size="s">Time: 17:30 - 18:30</Txt>
              <Txt size="s">Occurence: 8x</Txt>
              <Txt size="s">&nbsp;</Txt>

              <Txt size="m" bold>
                Location
              </Txt>
              <Txt size="s">Youth Center Buurtwerk</Txt>
              <Txt size="s">Tweede Jan van der Heijdenstraat 75-77</Txt>
              <Txt size="s">1074 XR Amsterdam</Txt>
              <Txt size="s">&nbsp;</Txt>

              <Txt size="m" bold>
                Compensation
              </Txt>
              <Txt size="s">$25 per lesson</Txt>
              <Txt size="s">$200 in total</Txt>
              <Txt size="s">&nbsp;</Txt>

              <Txt size="m" bold>
                Reward
              </Txt>
              <Txt size="s">AMS Trusted Teacher</Txt>
            </div>
            <CardButton
              onClick={() => {
                router.push("/checkin/" + id);
              }}
              text="Go To Check In"
            />
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Home;
