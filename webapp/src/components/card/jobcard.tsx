import React from "react";
import Card from "./card";
import Text from "../txt";
import Button from "../button";

type JobCardProps = {
  logo: string; // URL to the logo image
  title: string;
  subtitle: string;
  description: string;
  compensation: string;
  frequency: string;
  jobsUnlocked: string;
  isLocked?: boolean;
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
}) => (
  <Card>
    <div className="mb-4 flex items-center">
      <img
        src={logo}
        alt="Company Logo"
        className="mr-4 h-16 w-16 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-1">
        <Text size="l" bold>
          {title}
        </Text>
        <Text size="m" color="secondary">
          {subtitle}
        </Text>
      </div>
    </div>

    {isLocked ? (
      <div className="mt-3 flex flex-col items-center justify-center rounded-lg bg-[#CBD0DD] p-2">
        <Text size="m" bold>
          This job requires
        </Text>
        <Text className="text-[#128FA3]" bold>AMS Certified Teacher </Text>
        <Text size="m" bold>
          status
        </Text>
      </div>
    ) : (
      <>
        <Text size="m" className="mb-4">
          {description}
        </Text>

        <div className="my-4 border-b border-t border-dashed border-gray-200 py-4">
          <div className="flex justify-between px-8">
            <div className="flex flex-col items-center justify-center">
              <Text size="s" color="secondary" className="mb-1">
                Compensation
              </Text>
              <Text size="m">{compensation}</Text>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Text size="s" color="secondary" className="mb-1">
                Frequency
              </Text>
              <Text size="m">{frequency}</Text>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button
            variant="primary"
            className="flex w-[90%] justify-center px-8 py-2"
          >
            <Text size="l" className="text-white ">
              Apply
            </Text>
          </Button>
        </div>

        {jobsUnlocked && (
          <div className="mt-3 flex flex-col items-center justify-center ">
            <Text size="m" bold>
              Completion of task unlocks
            </Text>
            <Text className="text-[#128FA3]">{jobsUnlocked}</Text>
          </div>
        )}
      </>
    )}
  </Card>
);

export default JobCard;
