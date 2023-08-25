const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  is_donated: {
    type: String,
  },
  donation_date: [Date],
  donation_hospital: [String],
})

const user = mongoose.model('User', userSchema)
module.exports.user = user
