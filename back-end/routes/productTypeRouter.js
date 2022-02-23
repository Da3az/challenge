const express = require('express');
const productTypeRouter = express.Router();
const { ProductType } = require('../models/ProductType.js')

productTypeRouter.get('/',(req,res)=>{
    ProductType.find()
           .sort({})
           .then(productTypes => res.json(productTypes))
           .catch(err => res.status(400).json('Error: ' + err))
})


productTypeRouter.post('/find',(req,res)=>{
  const productTypeId = req.body.productTypeId;
  ProductType.findById({_id:productTypeId})
       .sort({})
       .then(product => {res.json(product)})
       .catch(err => res.status(400).json('Error: ' + err))
})


productTypeRouter.post('/create',(req,res)=>{
    const { 
      name,
      attributes
    } = req.body;

    let date = Date.now()
    const newProduct = new ProductType({name,attributes,date})

    newProduct.save()
            .then(() => res.json('New ProductType'))
            .catch(err => res.status(400).json('Error: ' + err))
})


productTypeRouter.post('/new',(req,res)=>{

  ProductType.findOne({name:req.body.name})
       .then(data => {
        if(data){
          res.json({
            type:"error",
            message:"A product with this name already exist"
          })
        }else{
          createProductType()
        }
  }).catch(err => console.log(err))

  function createProductType(){
    const { name, attributes, id} = req.body;
    const newProduct = new ProductType({
        name,
        attributes,
        _id:id
    })
    newProduct.save()
              .then(() => 
                  res.json({
                    type:"success",
                    message:"Product type created successfully"
                  })
              )
              .catch(err => {
                  res.json({
                    type:"error",
                    message:"Something went wrong!"
                  })
              })
  }
    
})

productTypeRouter.post('/update',(req,res)=>{

  ProductType.findOne({name:req.body.name})
       .then(data => {
        if(data){
          res.json({
            type:"error",
            message:"A productType with this name already exist"
          })
        }else{
          updateProductType()
        }
  }).catch(err => console.log(err))

  function updateProductType(){
    const productTypeId = req.body.id;
    ProductType.updateOne({_id:productTypeId},{...req.body})
         .then(_ => {
            res.json({
              type:"success",
              message:"Item updated successfully"
            })
          })
         .catch(err => {
          console.log('Error: ' + err)
          res.json({
            type:"error",
            message:"Something went wrong!"
          })
    })
  }

  
})

productTypeRouter.post('/delete',(req,res)=>{

    const id = req.body.id
    
    ProductType.deleteOne({_id: id})
        .then(() => 
          res.json({
            type:"success",
            message:"Item deleted successfully"
          })
        )
        .catch(err => 
          {
            console.log(err)
            res.json({
              type:"error",
              message:"Something went wrong!"
            })
          }
        )
  
})

productTypeRouter.get('/deleteAll',(req,res)=>{

    ProductType.deleteMany({})
        .then(() => res.json(`Deleted All ProductTypes`))
        .catch(err => res.status(400).json('Error: ' + err))
  
  })

module.exports = productTypeRouter;
