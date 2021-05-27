const express = require('express')
const app =express()
const morgan = require('morgan')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const product_routes = require('./app/routes/products')
const category_routes = require('./app/routes/categories')
const user_routes = require('./app/routes/users')

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

app.use((req,resp,next)=> {
    req.header("Access-Control-Allow-Origin","*") // cors
    next()
})
app.use('/products',product_routes)
app.use('/categories',category_routes)
app.use('/users',user_routes)

mongoose.connect('mongodb+srv://sakshi:sakshi@node-api.ivxrd.mongodb.net/node-rest-api?retryWrites=true&w=majority',{
    useMongoClient:true,
})
module.exports = app