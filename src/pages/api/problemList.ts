import type { NextApiHandler } from 'next';
import dbConnect from '@lib/dbConnect';
import type { IQuestion } from '@src/models/problems';
import { problemsList } from '@src/models/problems';

const handler: NextApiHandler<IQuestion[]> = async (req, res) => {
  await dbConnect();

  const { method } = req;

  if (method !== 'GET') {
    res.status(405).end('Method not allowed, only GET allowed');
    return;
  }

  res.status(200).json(problemsList);
};

export default handler;
