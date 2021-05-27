const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product_name:{type:String,required:true},
    price : {type:Number,required:true},
    description:String,
    product_image:{type:String,required:true},
    categories : [{type:mongoose.Schema.Types.ObjectId,ref:'Category'}]
})

module.exports = mongoose.model('Product',ProductSchema)