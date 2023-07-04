/** @format */

import { config } from 'dotenv';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../repo/user.js';
import { trusted } from 'mongoose';

config();

export default {
  signUpUser: async (req, res) => {
    try {
      let { body } = req;

      const { name, password, email, role } = body;
      if (!name || !password || !email || !role) {
        return res.status(400).json({
          success: false,
          message: 'Name, Email, Password and Role are required fields',
        });
      }
      const existingUser = await UserModel.getRecord({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'This Email is already in use',
        });
      }
      body.password = await bcrypt.hash(password, 10);
      body.otp = 123456;

      const newUser = await UserModel.createUser(body);

      if (role === 'Student') {
      }

      return res.status(200).json({
        success: true,
        message: 'Account Created Successfully',
        response: newUser,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  signInUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getRecord({ email });

      if (!user.isActive) {
        return res
          .status(404)
          .json({ success: false, message: 'Please Verify Your Account' });
      }

      if (!user) {
        return res.status(404).json({ success: false, message: 'Wrong Email' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid password' });
      }

      await UserModel.updateRecord(
        { _id: user._id },
        { otp: null, isLogout: false }
      );
      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      res.status(200).json({
        success: true,
        message: 'Login Successfully',
        response: `JWT ${token}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to login' });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      let { email, otp } = req.body;
      otp = Number(otp);
      const user = await UserModel.getRecord({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Wrong Email' });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
      await UserModel.updateRecord(
        { _id: user._id },
        { otp: null, isActive: true }
      );
      res
        .status(200)
        .json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
  },

  resendOtp: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UserModel.getRecord({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Wrong Email' });
      }

      await UserModel.updateRecord(
        { _id: user._id },
        { otp: 123456, isActive: false }
      );

      res
        .status(200)
        .json({ success: true, message: 'OTP resent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to resend OTP' });
    }
  },
  updateDetails: async (req, res) => {
    try {
      const { user } = req.user;
      const { name, email, phoneNumber } = req.body;

      const updatedUser = await UserModel.updateRecord(
        { _id: user._id },
        { name, email, phoneNumber },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Updated Successfully',
        user: updatedUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to update user details' });
    }
  },

  logout: async (req, res) => {
    try {
      const { user } = req.user;
      const logoutUser = await UserModel.updateRecord(
        { _id: user._id },
        { isLogout: true },
        { new: true }
      );
      if (!logoutUser) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'Logout successful' });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to logout' });
    }
  },
};
