const customerErrorHandling = (err, res, next) => {
  if (err.name && err.name === 'ValidationError') {
    const errorField = Object.keys(err.errors)[0]
    return res.json({
      errors: {
        error: err.name,
        message: `${errorField} ${err.errors[errorField].message}`,
      },
    })
  } else if (err.name && err.name === 'MongoError') {
    const errMsg = `Email ${err.errmsg.split('"')[1]} is duplicated.`

    return res.json({
      errors: {
        error: err.name,
        message: errMsg,
      },
    })
  }

  next()
}

module.exports = {
  customerErrorHandling,
}
