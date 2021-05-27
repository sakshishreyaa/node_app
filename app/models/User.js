const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type:String,required:true,unique:true},
    name : {type:String,required:true},
    password : {type:String,required:true},
    role : {type:String ,default : 'customer'},
    carts : [{type:mongoose.Schema.Types.ObjectId,ref:'Cart'}]
})

module.exports = mongoose.model('User',UserSchema)