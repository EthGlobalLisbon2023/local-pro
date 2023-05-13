import { NextApiRequest, NextApiResponse } from "next";
import { setupContract } from "n/chain-utils";
import { roleAbi } from "n/chain-utils/config";
import { serverSetupContract } from "server/utils";

export default async function checkout(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    response.status(405).send({ message: "Only POST requests are accepted" });
    return;
  }

  const { checkoutLocation, taskDuration, roleAddress, userId } = request.body;

  if (!roleAddress || !userId) {
    response.status(400).send({ message: "Missing required parameters" });
    return;
  }

  try {
    console.log("pre contract");
    const roleContract = await serverSetupContract(roleAddress, roleAbi);
    console.log("setup contract");
    // Task completion logic:
    if (checkoutLocation == 1 && taskDuration == 1) {
      const allJobs = await roleContract.completeTask(userId);

      // TODO: Now issue a task completed credential!
      // xxxxxxxxx

      // TODO: Check if "Star Teacher" NFT has been unlocked and if so, auto-mint!
      // xxxxxxxxx

      response.status(200).send(allJobs);
    }
  } catch (error) {
    response
      .status(500)
      .send({ message: "Server error", error: (error as any).message });
  }
}
