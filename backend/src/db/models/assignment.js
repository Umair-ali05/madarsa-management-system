/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const assignmentSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

assignmentSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const AssignmentModel = mongoose.model('Assignment', assignmentSchema);
export default AssignmentModel;
