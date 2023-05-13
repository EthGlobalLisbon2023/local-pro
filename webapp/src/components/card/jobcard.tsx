import React from "react";
import Card from "./card";
import Txt from "../txt";
import Button from "../button";
import { JobHeader } from "../jobheader";
import { useRouter } from "next/router";
import { CardButton } from "../card-button";

type JobCardProps = {
  logo: string; // URL to the logo image
  title: string;
  subtitle: string;
  description: string;
  compensation: string;
  frequency: string;
  jobsUnlocked?: string;
  isLocked?: boolean;
  id: string;
};

const JobCard: React.FC<JobCardProps> = ({
  logo,
  title,
  subtitle,
  description,
  compensation,
  frequency,
  jobsUnlocked,
  isLocked = false,
  id,
}) => {
  const router = useRouter();
  return (
    <Card>
      <JobHeader logo={logo} title={title} subtitle={subtitle} />

      {isLocked ? (
        <div className="mt-3 flex flex-col items-center justify-center rounded-lg bg-[#d8ddea] p-2">
          <Txt size="s" bold className="">
            This job requires
          </Txt>
          <Txt className="text-[#128FA3] font-zilla text-lg" bold>
            AMS Trusted Teacher{" "}
          </Txt>
          <Txt size="s" bold>
            status
          </Txt>
        </div>
      ) : (
        <>
          <Txt size="m" className="mb-4">
            {description}
          </Txt>

          <div className="my-4 border-b border-t border-dashed border-gray-200 py-4">
            <div className="flex justify-between px-8">
              <div className="flex flex-col items-center justify-center">
                <Txt size="s" color="secondary" className="mb-1 font-semibold">
                  Compensation
                </Txt>
                <Txt size="m">{compensation}</Txt>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Txt size="s" color="secondary" className="mb-1 font-semibold">
                  Frequency
                </Txt>
                <Txt size="m">{frequency}</Txt>
              </div>
            </div>
          </div>

          <CardButton
            onClick={() => router.push("verify/" + id)}
            text={"Apply"}
          />

          {jobsUnlocked && (
            <div className="mt-3 flex flex-col items-center justify-center ">
              <Txt size="s" bold className="">
                Completion of task unlocks
              </Txt>
              <Txt className="text-[#128FA3] font-zilla text-lg" bold>{jobsUnlocked}</Txt>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default JobCard;
