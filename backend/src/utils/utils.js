/* eslint-disable comma-dangle */
/* eslint-disable */
/* eslint-disable arrow-body-style */

import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
  uploadFile: (image, imageName) => {
    try {
      let imageUrl = process.env.VIEW_IMAGE_URL;
      const Path = path.join(__dirname, `../../downloads/${imageName}`);
      return new Promise((resolve, reject) => {
        fs.writeFile(Path, image, (err) => {
          if (err) {
            reject(err.message);
          }
          resolve(`${imageUrl}/${imageName}`);
        });
      });
    } catch (error) {
      throw error.message;
    }
  },
};
