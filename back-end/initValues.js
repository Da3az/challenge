const mongoose = require('mongoose');

const initiliazed_attribute_value = [
    {
        name: "attribute_value_name_1",
        boolean: false
    },
    {
        name: "attribute_value_name_2",
        boolean: false
    },
    {
        name: "attribute_value_name_3",
        boolean: true
    },
    {
        name: "attribute_value_name_4",
        boolean: true
    }
]

const initiliazed_attribute = [
    {
        name: "attribute_name_1",
        type: "attribute_type_1",
        attributeValue: initiliazed_attribute_value[0]
    },
    {
        name: "attribute_name_2",
        type: "attribute_type_2",
        attributeValue: initiliazed_attribute_value[1]
    },
    {
        name: "attribute_name_3",
        type: "attribute_type_3",
        attributeValue: initiliazed_attribute_value[2]
    },
]

const initiliazed_assigned_attribute = [
    {
        attributeValue: initiliazed_attribute_value[0]
    },
    {
        attributeValue: initiliazed_attribute_value[1]
    },
    {
        attributeValue: initiliazed_attribute_value[2]
    },
]

const initiliazed_product_type = [
    {
        name:"product_type_name_1",
        attributes:[
            initiliazed_attribute[0],
            initiliazed_attribute[1],
            initiliazed_attribute[2],
        ]
    },
    {
        name:"product_type_name_2",
        attributes:[
            initiliazed_attribute[0],
            initiliazed_attribute[1],
            initiliazed_attribute[2],
        ]
    },
    {
        name:"product_type_name_3",
        attributes:[
            initiliazed_attribute[0],
            initiliazed_attribute[1],
            initiliazed_attribute[2],
        ]
    }
]

const initiliazed_product = [
    {
        name:"product_name_1",
        assignedAttributes:[
            initiliazed_assigned_attribute[0],
            initiliazed_assigned_attribute[1],
            initiliazed_assigned_attribute[2]
        ],
        productType:initiliazed_product_type[0]
    },
    {
        name:"product_name_2",
        assignedAttributes:[
            initiliazed_assigned_attribute[0],
            initiliazed_assigned_attribute[1],
            initiliazed_assigned_attribute[2]
        ],
        productType:initiliazed_product_type[1]
    },
    {
        name:"product_name_3",
        assignedAttributes:[
            initiliazed_assigned_attribute[0],
            initiliazed_assigned_attribute[1],
            initiliazed_assigned_attribute[2]
        ],
        productType:initiliazed_product_type[2]
    }
]

const initData = async function(){

    console.log('initializing dummy data ....')

    const { AssignedAttribute } = require('./routes/assignedAttributeRouter');
    const data = await AssignedAttribute.find({}).exec()
    if(data.length){
        console.log('data already initialized')
        return
    }
    await AssignedAttribute.create(initiliazed_assigned_attribute)


    const { Attribute } = require('./routes/attributeRouter');
    await Attribute.create(initiliazed_attribute)


    const AttributeValue = require('./models/AttributeValue')
    const model3 = mongoose.model('AttributeValue',AttributeValue);
    await model3.create(initiliazed_attribute_value)


    const Product = require('./models/Product')
    await Product.create(initiliazed_product)

    const { ProductType } = require('./models/ProductType')
    await ProductType.create(initiliazed_product_type)


    console.log('initialized dummy data')

}

module.exports = initData



