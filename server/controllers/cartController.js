const User = require(`../models/User`)
const ObjectId = require(`mongoose`).Types.ObjectId

module.exports = {
    addCart: function (req, res) {
        User.findOneAndUpdate({
            id: req.params.userId
        }, {
                items: {
                    $push: {
                        items: req.body.itemId
                    }
                }
            }).then((result) => {
                console.log(`testt`);
                
                console.log(result, `result`);
                
            }).catch((err) => {
                console.log(err, `err`);
                
            });
    }
};
