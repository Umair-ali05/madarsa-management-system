/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

resultSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const ResultModel = mongoose.model('Result', resultSchema);
export default ResultModel;
