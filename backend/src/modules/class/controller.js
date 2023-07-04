/** @format */

import { config } from 'dotenv';
import ClassModel from '../../repo/class.js';
import mongoose from 'mongoose';

config();

const checkAdmin = (res, user) => {
  if (user.role !== 'Admin') {
    return res
      .status(404)
      .json({ success: false, message: 'You are not Authorized' });
  }

  return true;
};

export default {
  createClass: async (req, res) => {
    try {
      const { user } = req.user;
      const { name, grade, description } = req.body;

      if (user.role !== 'Admin') {
        return res.status(400).json({
          success: false,
          message: 'you are not admin you can not add the class',
        });
      }
      if (!name || !grade) {
        return res.status(400).json({
          success: false,
          message: 'Name and grade are required fields',
        });
      }

      const createClass = await ClassModel.createClass(req.body);

      return res.status(200).json({
        success: true,
        message: 'Class created successfully',
        response: createClass,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to create class' });
    }
  },

  getClass: async (req, res) => {
    try {
      let { id } = req.params;
      let classId = new mongoose.Types.ObjectId(id);

      const checkClass = await ClassModel.getClassData({ _id: classId });
      if (!checkClass) {
        return res
          .status(404)
          .json({ success: false, message: 'Class not found' });
      }

      return res.json({
        success: true,
        message: 'class',
        response: checkClass,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  getClasses: async (req, res) => {
    try {
      const classes = await ClassModel.getClassesData({});

      if (classes.length <= 0) {
        return res
          .status(400)
          .json({ success: false, message: 'No class registerd yet' });
      }

      return res
        .status(200)
        .json({ success: true, message: 'Classes', response: classes });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to fetch classes' });
    }
  },

  updateClass: (req, res) => {},

  deleteClass: async (req, res) => {
    try {
      checkAdmin(res, req.user.user);
      let classId = req.params.id;
      classId = new mongoose.Types.ObjectId(classId);
      // Check if the class exists
      const classToDelete = await ClassModel.deleteclass({ _id: classId });
      if (!classToDelete) {
        return res
          .status(404)
          .json({ success: false, message: 'Class not found' });
      }

      return res.json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },
};
