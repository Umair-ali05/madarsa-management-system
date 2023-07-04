import Base from './base.js';
import AssignmentModel from '../db/models/assignment.js';

class User extends Base {
  async getAddignmentData(query) {
    return this.getRecord(query);
  }

  async getAssignmentsData(query) {
    return this.getRecords(query);
  }

  async createAssignment(data) {
    return this.createRecord(data);
  }

  async updateAssignment(user, data) {
    return this.updateRecord(user, data);
  }

  async deleteAssignment(query) {
    return this.deleteRecord(query);
  }
}

export default new User(AssignmentModel);
