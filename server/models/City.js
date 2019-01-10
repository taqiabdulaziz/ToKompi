const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

var citySchema = new Schema({
    city_id: Number,
    province_id: Number,
    province: String,
    type: String,
    city_name: String,
    postal_code: Number
})

var City = mongoose.model("City", citySchema)

module.exports = City