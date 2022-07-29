const mongoose=require('mongoose')
const {Schema}=require('mongoose')


var messageSchema=new mongoose.Schema({
    name : String,
    message : String
  })

  module.exports=mongoose.model("minimessage",messageSchema)