import Base from './base.js';
import AttendanceModel from '../db/models/attendance.js';

class User extends Base {
  async getAttendanceData(query) {
    return this.getRecord(query);
  }

  async getAttendancesData(query) {
    return this.getRecords(query);
  }

  async createAttendance(data) {
    return this.createRecord(data);
  }

  async updateAttendance(user, data) {
    return this.updateRecord(user, data);
  }

  async deleteAttendance(query) {
    return this.deleteRecord(query);
  }
}

export default new User(AttendanceModel);
