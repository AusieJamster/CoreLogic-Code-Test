import type { NextApiHandler } from 'next';
import dbConnect from '@lib/dbConnect';
import { HTTPMethods, questionRequestSchema } from '@src/models/endpoints';
import { getLargestPrimeNumberFrom } from '@src/lib/mathFunctions';
import RecordSchema from '@src/models/record.schema';
import { formatName } from '@src/lib/formatting';
import { logger } from '@src/lib/logger';
import { QuestionTitles, problemsList } from '@src/models/problems';

const handler: NextApiHandler<boolean> = async (req, res) => {
  await dbConnect();

  const { method, body } = req;

  const allowedMethod = HTTPMethods.POST;
  if (method !== allowedMethod) {
    res.status(405).end(`Method not allowed, only ${allowedMethod} allowed`);
    throw new Error(`Bad Request, only ${allowedMethod} allowed`);
  }

  const safeBody = questionRequestSchema.safeParse(body);

  if (safeBody.success === false) {
    res.status(400).end(safeBody.error.message);
    return;
  }

  const correctAnswer = getLargestPrimeNumberFrom(600851475143);
  const isCorrect = safeBody.data.answer === correctAnswer;

  logger.info(
    `Receieved ${safeBody.data.answer}, correct answer is ${correctAnswer}. isCorrect = ${isCorrect}`
  );

  try {
    await RecordSchema.create({
      name: formatName(safeBody.data.name.toLowerCase()),
      isCorrect: isCorrect,
      questionId: problemsList.find(
        (prob) => prob.name === QuestionTitles.FIBONACCI
      )?.id
    });
    res.status(201).json(isCorrect);
  } catch (err) {
    res.status(400).end();
  }
};

export default handler;
