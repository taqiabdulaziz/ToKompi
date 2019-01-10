const Item = require('../models/Item')

class ItemController {
  static create(req, res, next) {

    Item
      .create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
      })
      .then(item => {
        res
          .status(200)
          .json({
            msg: "create success",
            item
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            msg: "internal server error",
            err
          })
      })
  }

  static getAll(req, res, next) {
    let query = {}

    if (req.query) {
      query = {
        name: {
          $regex: '.*' + req.query.name + '.*',
          $options: 'i'
        }
      }
    }
    Item
      .find(query)
      .then(items => {
        res
          .status(200)
          .json({
            msg: "fetch success",
            items
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "data not found",
            err
          })
      })
  }

  static getOne(req, res, next) {
    Item
      .find({ _id: req.params.id })
      .then(item => {
        res
          .status(200)
          .json({
            msg: "fetch success",
            item
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "data not found",
            err
          })
      })
  }

  static update(req, res, next) {
    Item
      .update({ _id: req.params.id }, req.body)
      .then(items => {
        res
          .status(200)
          .json({
            msg: "fetch success",
            items
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "data not found",
            err
          })
      })
  }


  static delete(req, res, next) {
    Item
      .update({ _id: req.params.id }, req.body)
      .then(items => {
        res
          .status(200)
          .json({
            msg: "fetch success",
            items
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: "data not found",
            err
          })
      })
  }
}

module.exports = ItemController