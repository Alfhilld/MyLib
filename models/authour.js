const mongoose = require('mongoose')

const authourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Authour', authourSchema)
