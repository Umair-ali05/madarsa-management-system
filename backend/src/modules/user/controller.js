/** @format */

import { config } from 'dotenv';
import UserModel from '../../repo/user.js';

config();

export default {
  getUsersData: async (req, res) => {
    const { grade, name } = req.query;
    let filter = {
      role: 'Teacher',
      ...(grade && { grade: grade }),
      ...(name && { name: { $regex: new RegExp(name, 'i') } }),
    };
    try {
      const teachers = await UserModel.getUsersData(filter);
      if (teachers.length <= 0) {
        return res.status(500).json({
          success: false,
          message: 'search other one',
        });
      }
      return res.json({
        success: true,
        response: teachers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getUserData: async (req, res) => {
    const { grade, category } = req.query;

    try {
      const teachers = await UserModel.getUsersData({
        role: 'Teacher',
        grade: { $regex: new RegExp(grade, 'i') },
        category: { $regex: new RegExp(category, 'i') },
      });
      if (teachers.length <= 0) {
        return res.status(500).json({
          success: false,
          message: 'search other one',
        });
      }
      return res.json({
        success: true,
        teachers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
