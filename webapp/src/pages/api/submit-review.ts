import { NextApiRequest, NextApiResponse } from "next";
import { setupContract } from "n/chain-utils";

export default async function submitreview(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method !== 'POST') {
        response.status(405).send({ message: 'Only POST requests are accepted' });
        return;
    }

    const { rating, taskID, userId } = request.body;

    if (!rating || !taskID || !userId) {
        response.status(400).send({ message: 'Missing required parameters' });
        return;
    }

    try {
        console.log(`Received rating of ${rating} for task ${taskID} and user ${userId}`);
        // TODO: Issue a rating credential!
        // xxxxxxxxx

        // TODO: Check if "Star Teacher" NFT has been unlocked and if so, auto-mint!
        // xxxxxxxxx

        response.status(200).send(1);
    } catch (error) {
        response.status(500).send({ message: 'Server error', error: (error as any).message });
    }
}