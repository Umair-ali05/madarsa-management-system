import Base from './base.js';
import ResultModel from '../db/models/result.js';

class Result extends Base {
  async getResultData(query) {
    return this.getRecord(query);
  }
  async getResultDataWithPopulate(query, populate) {
    return this.getRecordsWithPopulate(query, populate);
  }

  async getResultData(query) {
    return this.getRecords(query);
  }

  async createResult(data) {
    return this.createRecord(data);
  }

  async updateResult(user, data) {
    return this.updateRecord(user, data);
  }

  async deleteResult(query) {
    return this.deleteRecord(query);
  }
}

export default new Result(ResultModel);
