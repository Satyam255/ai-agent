import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).json({ message: "File uploaded successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}