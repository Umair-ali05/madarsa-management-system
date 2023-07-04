/** @format */

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const auth = (req, res, next) => {
  const { headers } = req;
  const accessToken = headers.authorization
    ? headers.authorization.split(' ')[1]
    : ''; // if token not send it gives split of undef error
  if (accessToken === '') {
    return res
      .status(400)
      .json({ success: false, message: 'Bearer Token is required.' });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: err.message });
    }
    return res.status(401).json({ msg: err.message });
  }
};
export default auth;
