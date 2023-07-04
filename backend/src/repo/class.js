import Base from './base.js';
import ClassModel from '../db/models/class.js';

class User extends Base {
  async getClassData(query) {
    return this.getRecord(query);
  }

  async getClassesData(query) {
    return this.getRecords(query);
  }

  async createClass(data) {
    return this.createRecord(data);
  }

  async updateclass(user, data) {
    return this.updateRecord(user, data);
  }

  async deleteclass(query) {
    return this.deleteRecord(query);
  }
}

export default new User(ClassModel);
