const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const hash = require('../helpers/hashPw')

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be Empty']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be Empty'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: {
            validator: function(email) {
                return User.findOne({email : email, _id: {$ne: this._id}})
                    .then(user => {
                        if(user) throw 'Email has been used'
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
    },
    password: { 
        type: String,
        minlength: [8, 'minimum length is 8']
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Item"
    }],
    role: { 
        type: String,
        default: 'customer'
    },
    kota: String,
})

userSchema.pre('save', function(next) {
    this.password = hash.hashPw(this.password)
    next()
})

var User = mongoose.model("User", userSchema)

module.exports = User


























// name: {
//     type: String,
//     required: [true, 'Name cannot be Empty']
// },
// email: {
//     type: String,
//     required: [true, 'Email cannot be Empty'],
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//     validate: {
//         validator: function(email) {
//             return Member.findOne({email : email, _id: {$ne: this._id}})
//                 .then(member => {
//                     if(member) throw 'Email has been used'
//                 })
//                 .catch(err => {
//                     throw err
//                 })
//         }
//     },
// },
// password: { 
//     type: String,
//     minlength: [8, 'minimum length is 8']
// },
// items: [{
//     type: Schema.Types.ObjectId,
//     ref: "Item"
// }],
// role: { 
//     type: String,
//     default: 'customer'
// },
// kota: String,