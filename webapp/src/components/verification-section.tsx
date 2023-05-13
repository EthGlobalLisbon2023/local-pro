import Txt from "./txt";

import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

type VerificationSectionProps = {
  stepName?: string;
  description?: string;
  stepId?: string;
};


const stepIdMapping = {
  CRIMINAL_CHECK: {
    name: "iuabsidubas",
    description: "aoisndoisan" 
  }
}

const VerificationSection: React.FC<VerificationSectionProps> = ({
  stepName,
  description,
  stepId,
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

export default VerificationSection;
