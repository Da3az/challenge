const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const port = process.env.PORT||5000;
const productRouter = require('./routes/productRouter');
const productTypeRouter = require('./routes/productTypeRouter');
const { attributeRouter } = require('./routes/attributeRouter');
const { assignedAttributeRouter } = require('./routes/assignedAttributeRouter');


const initData = require('./initValues')

require('dotenv').config();

const uri = process.env.ATLAS_URI

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, connectionParams);

const connection = mongoose.connection
connection.once('open',()=>console.log('mongodb database'))



app.use(cors());
app.use(express.json());


app.use('/product',productRouter);
app.use('/productType',productTypeRouter);
app.use('/attribute',attributeRouter);
app.use('/assignedAttribute',assignedAttributeRouter);


 

 


initData()

app.listen(port,() => console.log('Server is running'))
