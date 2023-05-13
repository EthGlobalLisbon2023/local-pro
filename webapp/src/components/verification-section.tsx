import Txt from "./txt";

import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

type VerificationSectionProps = {
  stepName?: string;
  description?: string;
  stepId?: string;
};

const stepIdMapping = {
  OVER_18: {
    name: "Proof of Personhood",
    description: "Connect with Worldcoin ID",
  },
  CRIMINAL_CHECK: {
    name: "Criminal Record",
    description: "Upload NL Local Authority Criminal Record",
  },
  MUSIC_DIPLOMA: {
    name: "Amsterdam Screening",
    description: "Internal Background check",
  },
};

const VerificationSection: React.FC<VerificationSectionProps> = ({
  stepName,
  description,
  stepId,
}) => {
  const { name, desc } =
    Object.keys(stepIdMapping).includes(stepId) && stepId != null
      ? stepIdMapping[stepId]
      : { name: stepName, desc: description };

  return (
    <div className="flex items-center rounded-lg bg-gradient-to-l from-green-400 to-white p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400">
        <CheckIcon className="h-6 w-6 text-white" />
      </div>

      <div className="flex flex-col ml-4">
        <Txt size="m" bold>
          {name}
        </Txt>
        <Txt size="s" color="secondary">
          {desc}
        </Txt>
      </div>
    </div>
  );
};

export default VerificationSection;
