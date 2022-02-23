const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributeValueSchema = new Schema({
    name :{
        type : String,
        required : true,
    },
    boolean:{
        type:Boolean,
        required : true
    },
    date:{
        type:Date,
        required: true,
        default: Date.now()
    }
});


module.exports = attributeValueSchema
