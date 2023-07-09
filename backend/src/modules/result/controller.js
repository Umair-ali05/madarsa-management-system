/** @format */

import { config } from 'dotenv';
import ResultRepo from '../../repo/result.js';
import mongoose from 'mongoose';

config();

export default {
  result: async (req, res) => {
    const { body } = req;

    try {
      const attendance = await ResultRepo.createResult(body);
      if (!attendance) {
        return res.status(500).json({
          success: false,
          message: 'issue in the Attendance',
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
  getResult: async (req, res) => {
    const { user } = req.user;
    const studentId = new mongoose.Types.ObjectId(user._id);
    const query = { studentId };
    try {
      const attendance = await ResultRepo.getResultDataWithPopulate(
        query,
        'subjectId'
      );

      if (!attendance) {
        return res.status(500).json({
          success: false,
          message: 'issue in the result',
        });
      }

      return res.json({
        success: true,
        message: 'result',
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
