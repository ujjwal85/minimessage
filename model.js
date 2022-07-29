const mongoose = require('mongoose')
const { Schema } = require('mongoose')


var messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  date: Date
})

module.exports = mongoose.model("minimessage", messageSchema)