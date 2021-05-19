const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}?retryWrites=true&w=majority&ssl=true`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        console.log("Connected successfully to mongo");
        MongoLib.connection = this.client.db(this.dbName);
      } catch (error) {
        console.log(error);
      }
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect();
      return await db.collection(collection).find(query).toArray();
    } catch (error) {
      console.log(error);
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect();
      return await db.collection(collection).findOne({ _id: ObjectId(id) });
    } catch (error) {
      console.log(error);
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect();
      const insertedData = await db.collection(collection).insertOne(data);
      return insertedData.insertedId;
    } catch (error) {
      console.log(error);
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect();
      const updatedData = await db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      return updatedData.insertedId || id;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect();
      const deletedData = await db
        .collection(collection)
        .deleteOne({ _id: ObjectId(id) });
      return deletedData.id || id;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MongoLib;
