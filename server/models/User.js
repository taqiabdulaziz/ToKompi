const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

var userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Item"
    }],
    role: String,
    kota: String,
})

var User = mongoose.model("User", userSchema)

module.exports = User

