const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttributeType = require('./Attribute')

const productTypeSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        auto: true,
    },
    name :{
        type : String,
        required : true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    attributes:{
        type: [AttributeType],
        required: true
    }
});

exports.productTypeSchema = productTypeSchema
exports.ProductType = mongoose.model('ProductType',productTypeSchema);
