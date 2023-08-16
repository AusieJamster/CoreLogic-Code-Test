import { NextApiHandler } from "next";
import dbConnect from "@lib/dbConnect";

interface IProblems {
  name: string;
  url: string;
}

const problemsList: IProblems[] = [
  { name: "Multiples of 3 or 5", url: "/multiples" },
  { name: "Even Fibonacci Numbers", url: "/fibonacci" },
];

const handler: NextApiHandler<IProblems[]> = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method !== "GET") {
    res.status(405).end("Method not allowed, only GET allowed");
    return;
  }

  res.status(200).json(problemsList);
};

export default handler;
