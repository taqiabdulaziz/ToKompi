const User = require(`../models/User`)
const ObjectId = require(`mongoose`).Types.ObjectId

module.exports = {
    addCart: function (req, res) {
        User.findOneAndUpdate({
            _id: req.body.userId
        }, {
                $push: {
                    items: req.params.itemId
                }
            })
            .then((result) => {
                if (result) {
                    res.status(200).json(result)

                } else {
                    res.status(400).json({ msg: `user tidak ditemukan` })
                }
                console.log(result);
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, error: err })
            });
    },
    removeCart: function (req, res) {
        User.findOneAndUpdate({
            _id: req.body.userId
        }, {
                $pull: {
                    items: req.params.itemId
                }
            }).then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, error: err })
            });
    },
    clearCart: function (req, res) {
        User.findOneAndUpdate({
            _id: req.body.userId
        }, {
                items: []
            }).then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({ msg: `internal server error`, error: err })
            });

    },
    getCart: function (req, res) {
        User.findById(req.params.userId)
            .populate(`items`)
            .then((result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({msg: `user tidak ada`})
                }
            }).catch((err) => {
                res.status(500).json({msg: `internal server error`, error: err})
            });
    }
};
