import z from 'zod';

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST'
}

export const questionRequestSchema = z.object({
  name: z.string(),
  answer: z.number()
});

export type questionRequestType = z.infer<typeof questionRequestSchema>;
