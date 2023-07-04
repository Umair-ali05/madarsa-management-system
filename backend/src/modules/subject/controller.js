/** @format */

import { config } from 'dotenv';
import mongoose from 'mongoose';

import SubjectModel from '../../repo/subject.js';
import ClassModel from '../../repo/class.js';
import UserModel from '../../repo/user.js';

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
  addSubject: async (req, res) => {
    try {
      checkAdmin(res, req.user.user);
      let { classId } = req.params;
      let { body } = req;
      if (!body.name || !classId) {
        return res
          .status(404)
          .json({ success: false, message: 'Name and Class are required' });
      }
      classId = new mongoose.Types.ObjectId(classId);
      const targetClass = await ClassModel.getClassesData({ _id: classId });

      if (!targetClass) {
        return res
          .status(404)
          .json({ success: false, message: 'Class not found' });
      }
      body.class = classId;
      const subject = await SubjectModel.createSubject(body);
      return res.status(200).json({
        success: true,
        message: 'class added Successfully',
        response: subject,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to add subject to class' });
    }
  },
  getSubject: async (req, res) => {
    try {
      let { subjectId } = req.params;

      if (!subjectId) {
        return res
          .status(404)
          .json({ success: false, message: 'Subject Id is missing' });
      }
      subjectId = new mongoose.Types.ObjectId(subjectId);

      const subject = await SubjectModel.getSubjectData({ _id: subjectId });

      if (!subject) {
        return res
          .status(404)
          .json({ success: false, message: 'Subject not found' });
      }

      return res.status(200).json({ success: true, response: subject });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  getSubjects: async (req, res) => {
    try {
      let query = {};
      if (req.query.classId) {
        let { classId } = req.query;
        if (!classId) {
          return res
            .status(404)
            .json({ success: false, message: 'Class id is required' });
        }
        classId = new mongoose.Types.ObjectId(classId);
        const targetClass = await ClassModel.getClassData({ _id: classId });

        if (!targetClass) {
          return res
            .status(404)
            .json({ success: false, message: 'Class not found' });
        }
        query.class = classId;
      }
      if (req.query.teacherId) {
        let { teacherId } = req.query;
        if (!teacherId) {
          return res
            .status(404)
            .json({ success: false, message: 'Class id is required' });
        }
        teacherId = new mongoose.Types.ObjectId(teacherId);
        const targetTeacher = await UserModel.getUserData({ _id: teacherId });

        if (!targetTeacher) {
          return res
            .status(404)
            .json({ success: false, message: 'Teacher not found' });
        }
        query.teacher = teacherId;
      }
      const subjects = await SubjectModel.getSubjectsData(query);

      if (subjects.length <= 0) {
        return res
          .status(400)
          .json({ success: false, message: 'No subject registerd yet' });
      }
      return res.status(200).json({
        success: true,
        message: 'subjects',
        response: subjects,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to add subject to class' });
    }
  },
  updateSubject: async (req, res) => {
    try {
      const subjectData = await SubjectModel.getSubjectData({ _id: subjectId });
      if (!subjectData) {
        return res
          .status(404)
          .json({ success: false, message: 'Subject not found' });
      }
      console.log(subjectData);
      if (subjectData.teacher) {
        subjectData.teacher.has(teacherId);
        console.log('i ma ehtye');
        return 'here';
      }
      console.log('i ma here');
      const updatedSubject = await SubjectModel.updateSubject(
        { _id: subjectId },
        { teacher: { $push: teacherId } },
        { new: true } // Return the updated subject
      );

      await UserModel.updateUser(
        { _id: teacherId },
        { $push: { subject: subjectId } },
        { new: true } // Return the updated subject
      );
      return res.json({
        success: true,
        message: 'Subject updated successfully',
        subject: updatedSubject,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  updateSubject: async (req, res) => {
    try {
      checkAdmin(res, req.user.user);
      let { subjectId, teacherId } = req.body;

      subjectId = new mongoose.Types.ObjectId(subjectId);
      teacherId = new mongoose.Types.ObjectId(teacherId);

      const subjectData = await SubjectModel.getSubjectData({ _id: subjectId });
      if (!subjectData) {
        return res
          .status(404)
          .json({ success: false, message: 'Subject not found' });
      }

      // Check if the subject already has a teacher assigned
      if (subjectData.teacher.includes(teacherId)) {
        return res.status(400).json({
          success: false,
          message: 'Subject already has the teacher assigned',
        });
      }

      // Update the subject by pushing the teacherId to the teachers array
      const updatedSubject = await SubjectModel.updateSubject(
        { _id: subjectId },
        { $push: { teacher: teacherId } },
        { new: true }
      );

      // Update the teacher with the assigned subject
      await UserModel.updateUser(
        { _id: teacherId },
        { $push: { subject: subjectId } },
        { new: true }
      );

      return res.json({
        success: true,
        message: 'Subject updated successfully',
        subject: updatedSubject,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  },
  deleteSubject: async (req, res) => {
    try {
      checkAdmin(res, req.user.user);
      let _id = req.params.id;
      _id = new mongoose.Types.ObjectId(_id);
      // Check if the class exists
      const SubjectToDelete = await SubjectModel.deleteSubject({ _id });
      if (!SubjectToDelete) {
        return res
          .status(404)
          .json({ success: false, message: 'Subject not found' });
      }

      return res.json({
        success: true,
        message: 'Subject deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },
};
