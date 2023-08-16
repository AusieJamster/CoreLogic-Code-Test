export enum QuestionTitles {
  MULTIPLES = 'Multiples of 3 or 5',
  FIBONACCI = 'Even Fibonacci Numbers'
}

export interface IQuestion {
  id: number;
  name: string;
  url: string;
  description: string[];
}

// you probably want this in a database, however, as our mongoDB is in docker and we'd need to push it in as soon as we run it each time.
// We would need it here anyway to push and that being the case we may as well just use it from here.
export const problemsList: IQuestion[] = [
  {
    id: 1,
    name: QuestionTitles.MULTIPLES,
    url: '/multiples',
    description: [
      'If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.',
      'Find the sum of all the multiples of 3 or 5 below 1000.'
    ]
  },
  {
    id: 3,
    name: QuestionTitles.FIBONACCI,
    url: '/fibonacci',
    description: [
      'The prime factors of 13195 are 5, 7, 13 and 29.',
      'What is the largest prime factor of the number 600851475143?'
    ]
  }
];
