import React from "react";
import Card from "./card";
import Text from "../txt";

type JobCardProps = {
  logo: string; // URL to the logo image
  title: string;
  subtitle: string;
};

const JobCard: React.FC<JobCardProps> = ({ logo, title, subtitle }) => {
  return (
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
      {/* Add more content as needed */}
    </Card>
  );
};

export default JobCard;
