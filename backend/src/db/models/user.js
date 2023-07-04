/** @format */
import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String },
    email: String,
    role: {
      type: String,
      enum: ['Teacher', 'Admin', 'Student'],
      default: 'Student',
    },
    grade: {
      type: String,
    },
    category: {
      type: String,
    },
    teacherLevel: { type: String },
    class: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
    subject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    phoneNumber: { type: Number },
    otp: { type: Number },
    isActive: { type: Boolean, default: false },
    isLogout: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    // eslint-disable-next-line comma-dangle
  }
);

UserSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
