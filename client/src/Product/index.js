import React from "react";
import ProductList from "./ProductList";

export default function Product({productTypes}){
    return(
        <div>
            <h1 className="flex ml-20 mb-10 text-2xl font-bold text-green-500">#Products</h1>
            <ProductList productTypes={productTypes} />
        </div>
    )
}