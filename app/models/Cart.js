const mongoose = require('mongoose')
const CartSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    products : [
        {product :{
            type:mongoose.Schema.Types.ObjectId,ref:'Product'},
            quantity:{type:Number,default:1}
        }
    ],
    status : {type: String ,default:'inactive'},
    address : {type : String, } //if address is added cart becomes active 
})

module.exports = mongoose.model('Cart',CartSchema)