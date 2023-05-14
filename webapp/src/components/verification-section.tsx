import { useRouter } from "next/router";
import Txt from "./txt";

import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

type VerificationSectionProps = {
  stepName?: string;
  description?: string;
  stepId?: string;
  isDisabled?: string;
};

const stepIdMapping = {
  OVER_18: {
    name: "Proof of Personhood",
    description: "Connect with Worldcoin ID",
  },
  CRIMINAL_CHECK: {
    name: "Criminal Record",
    description: "Upload NL Authority Criminal Record",
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
  isDisabled,
}) => {
  const router = useRouter();
  console.log(" Object.keys(stepIdMapping", Object.keys(stepIdMapping), stepId);

  const { name, description: desc } =
    Object.keys(stepIdMapping).includes(stepId) && stepId != null
      ? stepIdMapping[stepId]
      : { name: stepName, description: description };

  return (
    <div
      className={`flex items-center rounded-lg bg-gradient-to-l ${
        isDisabled ? "from-gray-100" : "from-green-200"
      } to-white p-4`}
      onClick={() => {
        router.push("/qr");
      }}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          isDisabled ? "bg-gray-300" : "bg-green-400"
        }`}
      >
        {!isDisabled && <CheckIcon className="h-6 w-6 text-white" />}
      </div>

      <div className="ml-4 flex flex-col">
        <Txt size="m" bold>
          {name}
        </Txt>
        <Txt size="s" className="">
          {desc}
        </Txt>
      </div>
    </div>
  );
};

export default VerificationSection;
