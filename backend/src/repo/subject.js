import Base from './base.js';
import SubjectModel from '../db/models/subject.js';

class User extends Base {
  async getSubjectData(query) {
    return this.getRecord(query);
  }

  async getSubjectsData(query) {
    return this.getRecords(query);
  }

  async createSubject(data) {
    return this.createRecord(data);
  }

  async updateSubject(user, data) {
    return this.updateRecord(user, data);
  }

  async deleteSubject(query) {
    return this.deleteRecord(query);
  }
}

export default new User(SubjectModel);
