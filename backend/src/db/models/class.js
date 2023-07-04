/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  grade: {
    type: String,
  },
  discription: {
    type: String,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
});

classSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const ClassModel = mongoose.model('Class', classSchema);
export default ClassModel;
