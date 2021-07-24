const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
})

module.exports = mongoose.model('Url', urlSchema)
