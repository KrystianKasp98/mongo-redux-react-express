//https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
const express = require("express");
const mongoClient = require("./db/mongo.js");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();
const itemsPath = "/items";

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get(itemsPath, async (req, res) => {
  try {
    const items = await mongoClient.getItems();
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post(itemsPath, async (req, res) => {
  try {
    const { type, model, color, price, count } = req.body;
    type && model && color && price && count
      ? await mongoClient.insertItem({ type, model, color, price, count })
      : res
          .status(404)
          .send({ message: "failed to add item, check your object" });
    res.status(201).send({ item: req.body });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put(itemsPath, async (req, res) => {
  try {
    const { type, model, color, count, id } = req.body;
    const result =
      id || (type && model && color)
        ? await mongoClient.updateCountItem(id ? {"_id": ObjectId(id)} : { type, model, color }, count)
        : res
            .status(404)
            .send({ message: "failed to update item, check your object" });

    res.status(result ? 201 : 404).send({ result });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete(itemsPath, async (req, res) => {
  try {
    const { type, model, color, id } = req.body;
    const result =
      id || type && model && color
        ? await mongoClient.deleteItem(id ? {"_id": ObjectId(id)}:{ type, model, color })
        : res
            .status(404)
            .send({ message: "failed to delete item, check your object" });
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ message: "bad request" });
});

module.exports = { app, itemsPath };