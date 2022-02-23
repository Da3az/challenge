const express = require('express');
const mongoose = require('mongoose');

const assignedAttributeRouter = express.Router();

const assignedAttributeSchema = require('../models/AssignedAttribute.js')
const AssignedAttribute = mongoose.model('AssignedAttribute',assignedAttributeSchema);

assignedAttributeRouter.get('/',(req,res)=>{
    AssignedAttribute.find()
           .sort({})
           .then(attributes => res.json(attributes))
           .catch(err => res.status(400).json('Error: ' + err))
})

exports.assignedAttributeRouter = assignedAttributeRouter;
exports.AssignedAttribute = AssignedAttribute;