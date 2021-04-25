const { urlencoded } = require("express");
const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true }
});

// creating a new collection with a name of Itemdata
const Item = mongoose.model("itemdata", itemSchema)

module.exports = Item