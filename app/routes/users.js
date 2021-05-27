const express = require('express')

const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User= require('../models/User')


/******************* show a list of all users **********************/ 
router.get('/',(req,resp,next)=>{
    User.find().then(result => {
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

/***************************register a user**************************/
router.post('/signup',(req,resp,next)=>{

    User.find({email:req.body.email}).then(user=>{
        if(user.length>=1){
            resp.status(400).json({message:'email exists already'})
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hashed_val)=>{
                if(err){
                    resp.status(400).json({message:err})
                }
                else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        name: req.body.name,
                        password :hashed_val,
                    })
                    user.save().then(result => {
                        resp.status(200).json({ message: result })
                    }).catch(err => {
                        resp.status(400).json({ message: err })
                    })
                }
            })
        }   
    }).catch(err=>resp.status(400).json({message:err}))
})
/***************************login user**************************/
router.post('/login',(req,resp,next)=>{

    User.findOne({email:req.body.email}).then(user=>{
        if(user.length<1){
            resp.status(400).json({message:'user does not exist'})
        }
        else{
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                    resp.status(400).json({message:'authentiation failed : incorrect email password'})
                }
                if(result){
                    resp.status(200).json({message:'login success'})
                }
                resp.status(400).json({message:'wrong password'})
            })
        }   
    }).catch(err=>resp.status(400).json({message:err}))
})

/*************update user info **************/
router.patch('/:user_id',(req,resp,next)=>{
    resp.status(200).json({message:"updated a user  "})
})

/*************deleted user **************/
router.delete('/:user_id',(req,resp,next)=>{
    User.remove({_id:req.params.user_id}).then(resp.status(200).json({
        message:"successfully deleted user"}).catch(err=>
            resp.status(400).json({message:err}))
    )
})

module.exports = router
