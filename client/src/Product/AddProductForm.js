import React , { useState } from "react"
import axios from 'axios'
import Alert from '../Alert';
import { TrashIcon , PlusIcon} from "@heroicons/react/outline";

export default function AddProductForm({setToast,setNotification,refresh,setSelected,productTypes,assignedAttributes}){
    
    const [name,setName] = useState('')
    const [date,setDate] = useState(new Date())
    const [type,setType] = useState(productTypes[0])
    const [attrs,setAttrs] = useState([])
    const [open,setOpen] = useState(false)
    const [addItem,setAddItem] = useState(assignedAttributes[0])

    function editItem(){
       
        axios.post(process.env.REACT_APP_SERVER+'/product/new',{
            name,
            created_at:date,
            assignedAttributes:attrs,
            productType:type
        }).then(res => {
            setNotification(res.data)
            setToast(true)
            setSelected('')
            refresh()
        })
          .catch(err => console.log('err on Adding product',err))
    }

    function removeAttr(id){
         const array = attrs.filter(e => e._id !== id)
         setAttrs([...array])
    }



    return(
        <form onSubmit={(e) => {e.preventDefault();setOpen(true)}} className="flex flex-col w-10/12 m-auto h-auto my-4 p-4">
            <Alert title={"Adding New Item"} setOpen={setOpen} open={open} type={"edit"} editItem={() => editItem()}/>
            <label htmlFor="product-name" className="my-4 block text-sm font-medium text-gray-700">
                Product Name *
            </label>
            <input
                required
                value={name}
                type="text"
                name="product-name"
                id="name"
                className="shadow-md w-10/12 m-auto my-4 py-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter Product Name"
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="product-date" className="my-4 block text-sm font-medium text-gray-700">
                Created date
            </label>
            <input
                type="date"
                name="product-date"
                id="date"
                className="shadow-md w-10/12 m-auto my-4 py-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                defaultValue={new Date(date).toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
           />
            <label htmlFor="product-type" className="my-4 block text-sm font-medium text-gray-700">
                Product Type*
            </label>
            <select
                id="productType"
                name="product-type"
                className="shadow-md w-10/12 m-auto my-4 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                // placeholder={product.productType}
                value={type.name}
                onChange={(e) => setType(productTypes.find(type => type.name === e.target.value))}
            >
                <>
                {
                    productTypes.map(
                        (type,index) => (
                            <option key={index+'_form_add_product_product_type_'+type._id} id={'form_add_product_'+type.name}>{type.name}</option>
                        )
                    )
                }
                </>
            </select>
            <label htmlFor="assigned-attribute" className="my-4 block text-sm font-medium text-gray-700">
                Assigned Attributes (IDS) 
            </label>
            <div className="flex w-10/12 m-auto items-center justifiy-center">
                <select
                    id="assignedAttribute"
                    name="assigned-attribute"
                    className="shadow-md w-10/12 m-auto my-4 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={addItem._id}
                    onChange={(e) => setAddItem(assignedAttributes.find(attr => attr._id === e.target.value))}
                >
                    {
                        assignedAttributes.map(
                            (attr,index) => (
                                <option key={index+'_form_add_product_select_assigned_attr_'+type._id} id={'form_assigned_attr__'+attr._id}>{attr._id}</option>
                            )
                        )
                    }
                </select>
                <button type="button" onClick={() => setAttrs((state) => [...state,addItem])} className="flex justify-center items-center bg-green-200 w-10 h-10 font-bold  ">
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col w-8/10">
                    {
                        attrs?.map(
                            (attr,index) => (
                                <div key={index+"_form_add_product_assigned_attr_"+attr._id} className="flex my-4 mx-auto ">
                                    <div  className=" p-2 my-2 inline-flex leading-5 font-semibold bg-green-100 text-green-800">
                                        {attr?._id}
                                    </div>
                                    <button type="button" onClick={() => removeAttr(attr?._id)} className="bg-rose-500 text-sky-100  w-10 h-8 my-auto flex justify-center items-center ml-4 font-bold">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                                
                            )
                        )
                    }
            </div>
            <button className="transition p-4 w-60 m-auto my-6 bg-green-300 hover:bg-green-200  text-neutral-800 font-bold">
                Submit
            </button>
        </form>
    )
}
