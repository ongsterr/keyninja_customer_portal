const mongoose = require('mongoose')

const { Schema } = mongoose

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: [true, "Can't be blank"],
  },
  lastName: {
    type: String,
    lowercase: true,
    required: [true, "Can't be blank"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
})

const customerModel = mongoose.model('Customer', CustomerSchema)

model.exports = customerModel
