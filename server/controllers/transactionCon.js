const Transaction = require('../models/Transaction')
const { ObjectId } = require('mongoose').Types

class TransactionController {
  static create(req, res, next) {

    Transaction
      .create({
        userId: ObjectId(req.body.id)
      })
      .then(transaction => {
        res
          .status(200)
          .json({
            msg: "create success",
            transaction
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

    Transaction
      .find()
      .then(transactions => {
        res
          .status(200)
          .json({
            msg: "fetch success",
            transactions
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
    Transaction
      .find({ _id: req.params.id })
      .then(transactions => {
        res
          .status(200)
          .json({
            msg: "fetch success",
            transactions
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
    Transaction
      .update({ _id: req.params.id }, req.body)
      .then(transactions => {
        res
          .status(200)
          .json({
            msg: "udpare success",
            transactions
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
    Transaction
      .update({ _id: req.params.id }, req.body)
      .then(transactions => {
        res
          .status(200)
          .json({
            msg: "delete success",
            transactions
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

module.exports = TransactionController