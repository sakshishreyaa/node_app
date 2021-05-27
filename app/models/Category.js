const mongoose = require('mongoose')
const CategorySchema = mongoose.Schema({
    _id : {type:mongoose.Schema.Types.ObjectId,index:true},
    category_name:{type:String,required:true},
    // products : [{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
})

module.exports = mongoose.model('Category',CategorySchema)