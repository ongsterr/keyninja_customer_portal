const router = require('express').Router()
const customerRouter = require('./customers')

router.use('/customers', customerRouter)

module.exports = router
