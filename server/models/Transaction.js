const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  userId: {
    type:Schema.Types.ObjectId,
    ref: "User"
  },
  shippingCost: {type: Number, default:0},
})



var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction