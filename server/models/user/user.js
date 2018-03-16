const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: Number },
  avatar: { type: String, default: '' },
  createAt: {type: Number},
  create_time: { type: String },
  create_address: { type: String },
})

userSchema.index({ id: 1 })
const User = mongoose.model('User', userSchema)

module.exports = User
