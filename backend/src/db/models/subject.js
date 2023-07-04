/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const subjectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

subjectSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const SubjectModel = mongoose.model('Subject', subjectSchema);
export default SubjectModel;
