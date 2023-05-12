import { type NextApiRequest, type NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const owner = request.query.owner_addr;

  console.log("owner", owner);

  response.status(200).json({
    // body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
