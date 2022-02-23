import React from "react";
import ProductTypeList from "./ProductTypeList";

export default function ProductType({setRefreshTypes,productTypes}){
    return(
        <div>
            <h1 className="flex ml-20 my-10  text-2xl font-bold text-green-500">##ProductTypes</h1>
            <ProductTypeList setRefreshTypes={setRefreshTypes} productTypes={productTypes}/>
        </div>
    )
}