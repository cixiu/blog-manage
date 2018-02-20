const mongoose = require('mongoose')

const Schema = mongoose.Schema

const idsSchema = new Schema({
  admin_id: { type: Number },
  user_id: { type: Number },
  article_id: { type: Number },
  img_id: { type: Number }
})

const Ids = mongoose.model('Ids', idsSchema)

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      admin_id: 0,
      user_id: 0,
      article_id: 0,
      img_id: 0
    })
    newIds.save()
  }
})

module.exports = Ids
