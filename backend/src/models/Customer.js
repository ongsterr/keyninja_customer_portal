const mongoose = require('mongoose')

const { Schema } = mongoose

const CustomerSchema = new Schema(
  {
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
  },
  { timestamps: { createdAt: 'created_at' } }
)

CustomerSchema.methods.toResponse = function() {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    customerId: this._id,
  }
}

const customerModel = mongoose.model('Customer', CustomerSchema)

module.exports = customerModel
