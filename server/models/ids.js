const mongoose = require('mongoose')

const Schema = mongoose.Schema

const idsSchema = new Schema({
  admin_id: { type: Number },
  user_id: { type: Number },
  topic_id: { type: Number }
})

const Ids = mongoose.model('Ids', idsSchema)

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      admin_id: 0,
      user_id: 0,
      topic_id: 0
    })
    newIds.save()
  }
})

module.exports = Ids
