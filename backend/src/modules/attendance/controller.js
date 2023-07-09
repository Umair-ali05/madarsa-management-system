/** @format */

import { config } from 'dotenv';
import AttendanceModel from '../../repo/attendance.js';
import mongoose from 'mongoose';

config();

export default {
  mark: async (req, res) => {
    const { body } = req;

    try {
      const attendance = await AttendanceModel.createAttendance(body);
      if (!attendance) {
        return res.status(500).json({
          success: false,
          message: 'issue in the attendace',
        });
      }

      return res.json({
        success: true,
        message: 'Maekred',
        response: attendance,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
