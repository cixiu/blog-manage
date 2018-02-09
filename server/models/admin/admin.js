const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: Number }, // 0 => 超级管理员， 1 => 普通管理员
  id: { type: Number },
  avatar: { type: String, default: '' },
  create_time: { type: String },
  create_address: { type: String },
  admin: { type: String, default: '管理员' }
})

adminSchema.index({ id: 1 })
const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
