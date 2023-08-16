import type { NextApiHandler } from 'next';
import dbConnect from '@lib/dbConnect';
import { HTTPMethods } from '@src/models/endpoints';
import { logger } from '@src/lib/logger';
import type { IScoreboardItem } from '@src/models/apiHandlers';
import type { IRecord } from '@src/models/record.schema';
import Record from '@src/models/record.schema';

const handler: NextApiHandler<IScoreboardItem[]> = async (req, res) => {
  await dbConnect();

  const { query } = req;
  let questionId: number | null = null;

  if (query.questionId && !Array.isArray(query.questionId)) {
    try {
      questionId = parseInt(query.questionId);
    } catch (err) {
      res.status(400).end();
      throw new Error('Bad request, questionId must be a number');
    } finally {
      if (Number.isNaN(questionId)) {
        res.status(400).end();
        throw new Error('Bad request, questionId must be a number');
      }
    }
  }

  const allowedMethod = HTTPMethods.GET;
  if (req.method !== allowedMethod) {
    res.status(405).end(`Method not allowed, only ${allowedMethod} allowed`);
    throw new Error(`Bad Request, only ${allowedMethod} allowed`);
  }

  try {
    logger.info('Retrieving scoreboard from the database...');
    const client = Record.find<IRecord>();
    if (questionId) client.where({ questionId: questionId });
    const results = await client.exec();

    logger.info(`Retrieved ${results.length} items from the database.`);

    const records: IScoreboardItem[] = results.reduce((acc, curr) => {
      const existingIndex = acc.findIndex(
        (item) => item.name === curr.name && item.questionId === curr.questionId
      );

      if (existingIndex >= 0) {
        acc[existingIndex].numberOfAttempts += 1;
        if (
          curr.isCorrect &&
          (acc[existingIndex].earliestCorrectSubmission === undefined ||
            acc[existingIndex].earliestCorrectSubmission! > curr.submissionTime)
        ) {
          acc[existingIndex].earliestCorrectSubmission = curr.submissionTime;
        }
      } else {
        acc.push({
          name: curr.name,
          earliestCorrectSubmission: curr.isCorrect
            ? curr.submissionTime
            : undefined,
          numberOfAttempts: 1,
          questionId: curr.questionId
        });
      }
      return acc;
    }, [] as IScoreboardItem[]);

    res.status(200).json(records);
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
