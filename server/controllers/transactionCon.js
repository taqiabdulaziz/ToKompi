const Transaction = require('../models/Transaction')
const { ObjectId } = require('mongoose').Types
const RajaOngkirClient_id = 'f995d037eeedc776a18fb72ca298cbe6'
const City = require('../models/City')
const http = require('https')
const qs = require('querystring')
const axios = require('axios')
const User = require(`../models/User`)


class TransactionController {
  static create(req, res, next) {

    var destinationId = null
    var findShippingCost = null
    console.log(`controllercreate`);
    console.log(req.body.kota, `kotaa`);
    console.log(req.body, `bodyyy`);

    City
      .findOne({ city_name: req.body.kota })
      .then(city => {
        console.log(city);

        destinationId = city.city_id

        axios
          .post(
            `https://api.rajaongkir.com/starter/cost`,
            {
              "origin": '152',
              "destination": destinationId,
              "weight": 1700,
              "courier": 'jne'
            },
            { "headers": { "key": RajaOngkirClient_id } }
          )
          .then(response => {
            findShippingCost = response.data.rajaongkir.results[0].costs[0].cost[0].value
            console.log(findShippingCost)

            console.log(req.body.items);

            Transaction
              .create({
                userId: ObjectId(req.body.id),

                items: JSON.parse(req.body.items),
                shippingCost: findShippingCost,
                totalPrice: req.body.totalPrice
              })
              .then(transaction => {
                console.log(transaction, `TTTTTT`);

                User.findOneAndUpdate({
                  _id: req.body.id
                }, {
                  items: []
                }).then((result) => {
                  console.log(result, `mantap cui`);

                }).catch((err) => {
                  console.log(`err`, err);

                });

                shippingCost: findShippingCost,
                items: req.body.items
              })
              .then(transaction => {

                res
                  .status(200)
                  .json({
                    msg: "create success",
                    transaction
                  })
              })
          })
          .catch(err => {
            console.log("error", err)
            res
              .status(500)
              .json({
                msg: "internal server error",
                err
              })
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