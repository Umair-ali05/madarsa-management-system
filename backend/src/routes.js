/** @format */

import express from 'express';
import { config } from 'dotenv';

import authController from './modules/auth/controller.js';
import userController from './modules/user/controller.js';
import classController from './modules/class/controller.js';
import subjectController from './modules/subject/controller.js';
import assignmentController from './modules/assignment/controller.js';
import paymentController from './modules//payment/controller.js';
import attendanceController from './modules/attendance/controller.js';
import resultController from './modules/result/controller.js';
// import teacherController from './modules/teacher/controller.js';
// import studentController from './modules/student/controller.js';
import auth from './middleware/auth.js';

config();
const router = express.Router();

router.post('/sign-up', authController.signUpUser);
router.post('/sign-in', authController.signInUser);
router.post('/verify-otp', authController.verifyOtp);
router.post('/resend-otp', authController.resendOtp);

router.get('/users', auth, userController.getUsersData);
router.get('/user', auth, userController.getUserData);
router.get('/students', auth, userController.students);

router.post('/class', auth, classController.createClass);
router.get('/classes', auth, classController.getClasses);
router.get('/class/:id', auth, classController.getClass);

// router.put('/class', auth, classController.updateClass);
router.delete('/class/:id', auth, classController.deleteClass);

router.post('/subject/:classId', auth, subjectController.addSubject);
router.get('/subject/:subjectId', auth, subjectController.getSubject);
router.get('/subjects', auth, subjectController.getSubjects);
router.put('/subject', auth, subjectController.updateSubject);
router.delete('/subject/:id', auth, subjectController.deleteSubject);

router.post('/assignment', auth, assignmentController.addAssignemnt);
router.get(
  '/assignments/:subjectId',
  auth,
  assignmentController.getAssignments
);
router.get(
  '/assignment/:assignmentId',
  auth,
  assignmentController.getAssignment
);
router.get('/classes', auth, classController.getClasses);
router.get('/class/:id', auth, classController.getClass);
router.post('/payment', paymentController.pay);
router.post('/mark-attendace', auth, attendanceController.mark);
router.post('/result', auth, resultController.result);
router.get('/result', auth, resultController.getResult);
router.use('*', (req, res) => {
  res.status(404).json({
    code: "404 : page not found'",
  });
});
export default router;
