const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttributeValueType = require('./AttributeValue')

const assignedAttributeSchema = new Schema({
    attributeValue:{
        type : AttributeValueType,
        required : true,
    },
});



module.exports = assignedAttributeSchema
