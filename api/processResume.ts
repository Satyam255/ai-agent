import { NextApiRequest, NextApiResponse } from "next";
import { parseResume } from "@/lib/parseResume";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { file } = req.body;
    const parsedData = parseResume(file);
    res.status(200).json(parsedData);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
