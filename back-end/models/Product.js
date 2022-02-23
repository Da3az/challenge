const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { productTypeSchema } = require('./ProductType')
const AssignedAttributeType = require('./AssignedAttribute')

const productSchema= new Schema({
  _id:{
    type:Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true
  },
  created_at:{
    type: Date,
    default: Date.now,
  },
  assignedAttributes:{
    type: [AssignedAttributeType],
    required: true
  },
  productType:{
    type: productTypeSchema,
    required: true
  }
});

module.exports = mongoose.model('Product',productSchema);

