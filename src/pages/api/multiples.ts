import { NextApiHandler } from "next";
import dbConnect from "@lib/dbConnect";
import { HTTPMethods } from "@src/lib/http";
import { sumNaturalNumsBelowX } from "@src/lib/mathFunctions";
import RecordSchema from "@src/models/record";
import { formatName } from "@src/lib/formatting";
import { logger } from "@src/lib/logger";
import { IAnswersResponse } from "@src/models/apiHandlers";

const handler: NextApiHandler<IAnswersResponse> = async (req, res) => {
  await dbConnect();

  const { method, body } = req;

  const allowedMethod = HTTPMethods.POST;
  if (method !== allowedMethod) {
    res.status(405).end(`Method not allowed, only ${allowedMethod} allowed`);
    throw new Error(`Bad Request, only ${allowedMethod} allowed`);
  }

  // TODO: Validate with zod
  const requiredKeys = ["name", "answer"];
  requiredKeys.forEach((key) => {
    if (!body?.[key]) {
      res.status(400).end(`Missing ${key}`);
      return;
    }
  });

  const correctAnswer = sumNaturalNumsBelowX(1000);
  const isCorrect = body.answer === correctAnswer;

  logger.info(
    `Receieved ${body.answer}, correct answer is ${correctAnswer}. isCorrect = ${isCorrect}`
  );

  try {
    await RecordSchema.create({
      name: formatName(body.name.toLowerCase()),
      isCorrect: isCorrect,
    });
    res.status(201).json({ success: true, isCorrect });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

export default handler;
