import './App.css';
import { useState, useEffect } from 'react';
import Nav from './Nav';
import Product from './Product';
import ProductType from './ProductType';
import axios from 'axios';

function App() {

  const [productTypes,setProductTypes] = useState([])


  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER+'/productType')
            .then( ({data}) => setProductTypes(data))
            .catch(err => console.log('err on finding productTypes',err))
  })

  return (
    <div className='app '>
      <Nav />
      <Product productTypes={productTypes} />
      <ProductType productTypes={productTypes} />
    </div>
  );
}

export default App;
