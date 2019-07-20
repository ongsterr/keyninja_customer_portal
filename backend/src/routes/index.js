const router = require('express').Router()
const customerRouter = require('./customers')

router.use('/customers', customerRouter)

router.use((err, req, res, next) => {
  if (err.name == 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message
        return errors
      }, {}),
    })
  }
})

module.exports = router
