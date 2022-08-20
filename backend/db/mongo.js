require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const items = require("../data/items");
const uri = process.env.MONGOCLOUD_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("redux-test").collection("items");
// client.connect((err) => {
//   const collection = client.db("redux-test").collection("items");
//   // perform actions on the collection object
//   // console.log(items);
//   // collection.insertMany(items);

//   // client.close();
// });

const getItems = async () => await collection.find({}).toArray();

const insertItem = (item) => collection.insertOne(item);

/**
 *
 * @param {object} options .type .model .color || .id
 * @param {number} count new stock size
 * @returns {boolean} result of updating
 */
const updateCountItem = async (options, count) => {
  try {
    const result = await collection.updateOne(options, {
      $set: { count: count },
    });
    console.log(result);
    return !!result.modifiedCount;
  } catch (err) {
    return false;
  }
};

const deleteItem = async (options) => {
  try {
    const result = await collection.deleteOne(options);
    return !!result.deletedCount;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getItems,
  insertItem,
  updateCountItem,
  deleteItem,
};
