const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product.js')

productRouter.get('/',(req,res)=>{
    Product.find()
           .sort({})
           .then(products => res.json(products))
           .catch(err => res.status(400).json('Error: ' + err))
})


productRouter.post('/find',(req,res)=>{
  const productId = req.body.productId;
  Product.findById({_id:productId})
       .sort({})
       .then(product => {res.json(product)})
       .catch(err => res.status(400).json('Error: ' + err))
})

productRouter.post('/new',(req,res)=>{
    Product.findOne({name:req.body.name})
       .then(data => {
        if(data){
          res.json({
            type:"error",
            message:"A product with this name already exist"
          })
        }else{
          createProduct()
        }
    }).catch(err => console.log(err))
    
    function createProduct(){
      const { name, productType, assignedAttributes, id} = req.body;
      const newProduct = new Product({
        name,
        productType,
        assignedAttributes,
        _id:id
      })
  
      newProduct.save()
              .then(() => res.json({
                type:"success",
                message:"Item created succesfully"
              }))
              .catch(err => {
                console.log(err)
                res.json({
                  type:"error",
                  message:"Something went wrong"
              })
      })
    }
    
})

productRouter.post('/update',(req,res)=>{
  Product.findOne({name:req.body.name})
       .then(data => {
        if(data && data._id!=req.body.id){
          res.json({
            type:"error",
            message:"A product with this name already exist"
          })
        }else{
          updateProduct()
        }
  }).catch(err => console.log(err))

  function updateProduct(){
    const productId = req.body.id;
    Product.updateOne({_id:productId},{...req.body})
          .then(() => res.json({
            type:"success",
            message:"Item updated successfully"
          }))
          .catch(err => {
            console.log(err)
            res.json({
              type:"error",
              message:"Something went wrong"
          })
    })
  }

  
})


productRouter.post('/delete',(req,res)=>{

  const id = req.body.id
  Product.deleteOne({_id: id})
      .then(() => res.json({
        type:"success",
        message:"Item deleted successfully"
      }))
      .catch(err => res.json({
        type:"error",
        message:"Something went wrong!"
      }))

})

productRouter.get('/deleteAll',(req,res)=>{

  const type = req.body.type
  
  Product.deleteMany({type})
      .then(() =>
        type === '' ? res.json(`Deleted All Products`)
                    : res.json(`Deleted All Products of ${type} type `)
      )
      .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = productRouter;
