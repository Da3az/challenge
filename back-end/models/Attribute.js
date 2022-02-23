const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttributeValueType = require('./AttributeValue')

const attributeSchema = new Schema({
    name :{
        type: String,
        required : true,
    },
    type:{
        type: Schema.Types.Mixed,
        required : true
    },
    attributeValue:{
        type: AttributeValueType,
        required: true
    }
});

module.exports = attributeSchema


