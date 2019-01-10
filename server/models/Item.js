const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

var itemSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  category: String,
  stock: Number
})

var Item = mongoose.model("Item", itemSchema)

module.exports = Item