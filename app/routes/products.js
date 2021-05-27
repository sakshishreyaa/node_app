const express = require('express')

const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename : function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname)
    }
})
const upload = multer({storage:storage})
const Product = require('../models/Product')



router.get('/', (req, resp, next) => {
    Product.find().populate("categories").then(result => {
        if (result) {
            resp.status(200).json({ message: result })
        }
        else {
            resp.status(404).json({message:"not valid entry found"})
        }
    }).catch(err => {
        resp.status(400).json({ message: err  })
    })
})




router.post('/', upload.single('product_image'),(req, resp, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        product_name: req.body.product_name,
        price: req.body.price,
        description: req.body.description,
        product_image:req.file.path,
        categories: req.body.category_id
    })
    product.save().then(result => {
        resp.status(200).json({ message: result })
    }).catch(err => {
        resp.status(400).json({ message: err })
    })
})

/***********************************
 * gets a product with reference to product id provided
 *******************************/


router.get('/:product_id', (req, resp, next) => {
    const id = req.params.product_id
    Product.findById(id).populate("categories").exec().then(result => {
        if (result) {
            resp.status(200).json({ message: result })
        }
        else {
            resp.status(404).json({message:"not valid entry found"})
        }
    }).catch(err => {
        resp.status(400).json({ message: err  })
    })
})
router.patch('/:product_id', (req, resp, next) => {
    const id = req.params.product_id
    const update_ops= {}
    for (const ops of req.body){
        update_ops[ops.prop_name] = ops.value
    }
    Product.updateOne({_id:id},{$set :update_ops}).exec().then(result => {
        if (result) {
            resp.status(200).json({ 
                message: 'updated product' ,
                data:result,
        })
        }
        else {
            resp.status(404).json({message:"not valid entry found"})
        }
    }).catch(err => {
        resp.status(400).json({ message: err  })
    })
})
router.delete('/:product_id', (req, resp, next) => {
    const id = req.params.product_id
    Product.remove(id).exec().then(result => {
        if (result) {
            resp.status(200).json({ 
                message: 'deleted product' ,
                data:result,
        })
        }
        else {
            resp.status(404).json({message:"not valid entry found"})
        }
    }).catch(err => {
        resp.status(400).json({ message: err  })
    })
})

module.exports = router
