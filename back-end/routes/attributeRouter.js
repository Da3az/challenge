const express = require('express');
const mongoose = require('mongoose');

const attributeRouter = express.Router();

const attributeSchema = require('../models/Attribute.js')
const Attribute = mongoose.model('Attribute',attributeSchema);

attributeRouter.get('/',(req,res)=>{
    Attribute.find()
           .sort({})
           .then(attributes => res.json(attributes))
           .catch(err => res.status(400).json('Error: ' + err))
})

attributeRouter.post('/find',(req,res)=>{
  const attributeId = req.body.AttributeId;
  Attribute.findById({_id:attributeId})
       .sort({})
       .then(attribute => {res.json(attribute)})
       .catch(err => res.status(400).json('Error: ' + err))
})

attributeRouter.post('/new',(req,res)=>{
    const { 
      name,
      attributeValue,
    } = req.body;

    const newAttribute = new Attribute({name,attributeValue})

    newAttribute.save()
            .then(() => res.json('New Attribute'))
            .catch(err => res.status(400).json('Error: ' + err))
})



exports.attributeRouter = attributeRouter;
exports.Attribute = Attribute