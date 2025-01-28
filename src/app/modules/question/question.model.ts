import { Schema, model } from 'mongoose';
import { IQuestion, QuestionModel } from './question.interface';
import { INPUT_TYPE } from '../../../enums/type';

const questionSchema = new Schema<IQuestion, QuestionModel>(
    {
        medication: {
            type: Schema.Types.ObjectId,
            ref: 'Medication',
            required: true
        },
        type: {
            type: String,
            enum: Object.values(INPUT_TYPE),
            required: true
        },
        question: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);



export const Question = model<IQuestion, QuestionModel>('Question', questionSchema);