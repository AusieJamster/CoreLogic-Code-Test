export interface IScoreboardItem {
  name: string;
  earliestCorrectSubmission?: Date;
  numberOfAttempts: number;
  questionId: number;
}
