const express = require('express')
const Cart = require('../models/Cart')
const mongoose = require('mongoose')
const router = express.Router()
router.get('/',(req,resp,next)=>{
    resp.status(200).json({message:"get carts"})
})
/***********add a single product*******/
router.post('/',(req,resp,next)=>{
    const cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        products: [{
            product : req.body.product_id,
            quantity : req.body.quantity,
        },]
    })
    cart.save().then(result => {
        resp.status(200).json({ message: 'saved',data:result })
    }).catch(err => {
        resp.status(400).json({ message: err })
    })
})
/***********get cart info *********** */

router.get('/:cart_id',(req,resp,next)=>{
    resp.status(200).json({message:"get  cart info "})
})
/***********update single product in a cart *****************/
router.patch('/:cart_id',(req,resp,next)=>{
    const id = req.params.cart_id
    const update_ops= {}
    for (const ops of req.body){
        update_ops[ops.prop_name] = ops.value
    }
    cart.updateOne({_id:id},{$set :update_ops}).exec().then(result => {
        if (result) {
            resp.status(200).json({ 
                message: 'updated crt succesfulllly' ,
                data:result,
        })
        }
        else {
            resp.status(404).json({message:"no valid entry found"})
        }
    }).catch(err => {
        resp.status(400).json({ message: err  })
    })})
/***********checkout / change cart status by adding address */

router.delete('/:cart_id',(req,resp,next)=>{
    const id = req.params.cart_id
    Cart.remove(id).exec().then(result => {
        if (result) {
            resp.status(200).json({ 
                message: 'deleted cart' ,
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
