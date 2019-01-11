const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const Item = require('../models/Item')

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  shippingCost: { type: Number, default: 0 },
  itemCost: {Number},
  totalPrice: { type: Number, default: 0 }
})



var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction