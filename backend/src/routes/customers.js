const router = require('express').Router()
const mongoose = require('mongoose')

const { customerErrorHandling } = require('../utils/errors')

const Customer = mongoose.model('Customer')

router.get('/', (req, res, next) => {
  let limit = 20
  let offset = 0

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset
  }

  return Customer.find()
    .limit(Number(limit))
    .skip(Number(offset))
    .exec()
    .then(results => {
      return res.json({
        customers: results,
      })
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  const newCustomersPromise = req.body.customers.map(customer => {
    const newCustomer = new Customer(customer)
    return newCustomer.save()
  })

  Promise.all(newCustomersPromise)
    .then(customers => {
      return res.json({
        customers,
      })
    })
    .catch(err => {
      customerErrorHandling(err, res, next)
    })
})

// Preload customer objects on routes with ':customer'
router.param('customer', (req, res, next, customerId) => {
  Customer.findById({ _id: customerId })
    .then(customer => {
      if (!customer) {
        return res.sendStatus(404)
      }
      req.customer = customer
      return next()
    })
    .catch(next)
})

router.get('/:customer', (req, res, next) => {
  return res.json({
    customer: req.customer.toResponse(),
  })
})

router.put('/:customer', (req, res, next) => {
  if (typeof req.body.customer.firstName !== 'undefined') {
    req.customer.firstName = req.body.customer.firstName
  }

  if (typeof req.body.customer.lastName !== 'undefined') {
    req.customer.lastName = req.body.customer.lastName
  }

  if (typeof req.body.customer.email !== 'undefined') {
    req.customer.email = req.body.customer.email
  }

  req.customer
    .save()
    .then(customer => {
      return res.json({
        customer: customer.toResponse(),
      })
    })
    .catch(err => {
      customerErrorHandling(err, res, next)
    })
})

router.delete('/:customer', (req, res, next) => {
  return req.customer.remove().then(() => res.sendStatus(204))
})

module.exports = router
