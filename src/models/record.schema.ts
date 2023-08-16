import mongoose from 'mongoose';

export interface IRecord {
  name: string;
  submissionTime: Date;
  isCorrect: boolean;
  questionId: number;
}

const recordSchema = new mongoose.Schema<IRecord>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  submissionTime: {
    type: Date,
    default: Date.now
  },
  isCorrect: {
    type: Boolean,
    required: [true, 'Please provide rather the answer was correct.']
  },
  questionId: {
    type: Number,
    required: [
      true,
      'Please provide context as to what question this submission relates to.'
    ]
  }
});

export default mongoose.models.Record || mongoose.model('Record', recordSchema);
