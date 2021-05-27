const express = require('express')

const router = express.Router()
const mongoose = require('mongoose')
const Category= require('../models/Category')


/******************* show a list of all categories **********************/ 
router.get('/',(req,resp,next)=>{
    Category.find().then(result => {
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
/***********************show a list of products in all categories ********************/
router.get('/categorywiseproducts',(req,resp,next)=>{
    Category.find().select().populate("products" ,"name price description").then(result => {
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

/***********************show a list of products in a category ********************/
router.get('/categorywiseproducts/category_id',(req,resp,next)=>{
    Category.findOne({_id:req.params.category_id}).select().populate("products" ,"name price description").then(result => {
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


/***************************create a category**************************/
router.post('/',(req,resp,next)=>{

    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    })
    category.save().then(result => {
        resp.status(200).json({ message: result })
    }).catch(err => {
        resp.status(400).json({ message: err })
    })
})


/****************************update a category/add a product in category **************************************/
router.patch('/:category_id',(req,resp,next)=>{
    const id = req.params.category_id
    const update_ops= {}
    for (const ops of req.body){
        update_ops[ops.prop_name] = ops.value
    }
    Category.updateOne({_id:id},{$set :update_ops}).exec().then(result => {
        if (result) {
            resp.status(200).json({ 
                message: 'updated category' ,
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

/************************* delete a category ************/

router.delete('/:category_id',(req,resp,next)=>{
    const id = req.params.category_id
    Category.remove(id).exec().then(result => {
        if (result) {
            resp.status(200).json({ 
                message: 'deleted category' ,
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
