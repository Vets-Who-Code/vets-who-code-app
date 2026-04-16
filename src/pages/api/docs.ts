import { getApiDocs } from "../../swagger";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const spec = getApiDocs();
  res.status(200).json(spec);
}
