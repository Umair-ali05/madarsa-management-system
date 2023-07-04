/** @format */

import Base from './base.js';
import UserModel from '../db/models/user.js';

class User extends Base {
  async getUserData(query) {
    return this.getRecord(query);
  }

  async getUsersData(query) {
    return this.getRecords(query);
  }

  async createUser(data) {
    return this.createRecord(data);
  }

  async updateUser(user, data) {
    return this.updateRecord(user, data);
  }
}

export default new User(UserModel);
