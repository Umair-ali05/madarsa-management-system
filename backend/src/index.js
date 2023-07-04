/** @format */

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import cors from 'cors';
import db from './db/index.js';
import Router from './routes.js';

config();
const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(morgan('dev'));
try {
  db();
  app.use('/api', Router);
  app.listen(PORT, () => {
    console.log(`Successfully connected on PORT ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
