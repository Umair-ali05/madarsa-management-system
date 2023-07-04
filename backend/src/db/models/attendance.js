/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
});

attendanceSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const AttendanceModel = mongoose.model('Attendance', attendanceSchema);
export default AttendanceModel;
