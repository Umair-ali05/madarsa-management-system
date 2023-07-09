/** @format */

class Base {
  constructor(instanceModel) {
    this.instanceModel = instanceModel;
  }

  async createRecord(data) {
    const instance = await this.instanceModel.create(data);
    return instance;
  }

  async createRecords(data) {
    const instance = await this.instanceModel.insertMany(data);
    return instance;
  }

  async getRecords(query) {
    const instance = await this.instanceModel.find(query).sort({ name: -1 });

    return instance;
  }

  async getRecordsWithPopulate(query, pop) {
    console.log(query, pop);
    const instance = await this.instanceModel.find(query).populate(pop);

    return instance;
  }

  async getRecord(query) {
    const instance = await this.instanceModel.findOne(query);
    return instance;
  }

  async getRecords(query) {
    const instance = await this.instanceModel.find(query);
    return instance;
  }

  async updateRecord(query, body) {
    console.log(query, body);
    const instance = await this.instanceModel.findOneAndUpdate(query, body, {
      new: true,
    });
    return instance;
  }

  async deleteRecord(query) {
    const instance = await this.instanceModel.delete(query);
    return instance;
  }
}

export default Base;
