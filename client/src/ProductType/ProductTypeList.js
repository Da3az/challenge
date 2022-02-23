import React , { useEffect, useState } from "react"
import axios from 'axios'
import Alert from '../Alert';
import ProductTypeForm from './ProductTypeForm';
import AddProductTypeForm from "./AddProductTypeForm";
import Notification from "../Notification"; 


export default function ProductTypeList({productTypes}) {
    const [attributes,setAttributes] = useState([])
    const [open,setOpen] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [selected,setSelected] = useState('')
    const [deletedItem,setDeletedItem] = useState('')
    const [toast,setToast] = useState(false)
    const [notification,setNotification] = useState({})

    useEffect(() => {
        
        axios.get(process.env.REACT_APP_SERVER+'/attribute')
            .then( ({data}) => setAttributes(data))
            .catch(err => console.log('err on finding attributes',err))

    },[refresh])  

    useEffect(() => {
      if(toast){
        setTimeout(() => setToast(false),3000)
      }
    },[toast])

    function deleteItem(id){
        axios.post(process.env.REACT_APP_SERVER+'/productType/delete',{
                "id":id
        }).then(res => 
          {
            setNotification(res.data)
            setToast(true)
            setRefresh((state) => !state)
          }
        )
        .catch(err => console.log('err on deleting productType',err))
    }

    function openForm(id){
        if(selected === ''){
            setSelected(id)
        }else if(id === selected){
            setSelected('')
        }else{
            setSelected(id)
        }
    }

    async function alertFunction(open){
      setTimeout(() => {
        setOpen(open)
      },100)
    }

    return (
      <div className="flex flex-col w-10/12 m-auto">
       
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          { toast && <Notification  type={notification?.type} message={notification?.message} close={() => setToast(false)}/> }
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attributes (Ids)
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <Alert title={"Deleting Item"} setOpen={(bool) => setOpen(bool)} open={open} type={"delete"} deleteItem={() => deleteItem(deletedItem)} />
                  {productTypes?.map((product,index) => (
                    <React.Fragment key={product._id+'_product_type_list_'+index+'_'+product.name}>
                    <tr  >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{(new Date(product.created_at)).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 flex flex-col whitespace-nowrap text-sm text-gray-500">
                          {product.attributes.map(
                              (assigned_attr,index) => 
                                    <span key={assigned_attr?._id+'_product_list_attrs_'+index} className="px-2 my-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {assigned_attr?._id}
                                    </span>
                          )}
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openForm(product._id )}  className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button  onClick={() => {setDeletedItem(product._id);setOpen(true)}} className="text-rose-500 hover:text-rose-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {
                        selected === product._id 
                        &&
                        <tr >
                            <td colSpan={6}>
                                <div className="flex w-12/12 m-auto" >
                                    <ProductTypeForm setToast={(e) => setToast(e)} setNotification={(e) => setNotification(e)}  refresh={() => setRefresh(state => !state)} setSelected={setSelected} attributes={attributes} product={product} />
                                </div>
                            </td>
                        </tr>
                    }
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <button onClick={() => openForm('add product')} className="transition m-4 my-6 bg-stone-300 hover:bg-stone-200 p-4 text-amber-800 rounded-md">Add a new ProductType</button>
              {
                selected === 'add product' 
                &&
                <div className="flex w-12/12 m-auto" >
                   <AddProductTypeForm setToast={(e) => setToast(e)} setNotification={(e) => setNotification(e)} refresh={() => setRefresh(state => !state)} setSelected={setSelected} attributes={attributes} productTypes={productTypes}  />
                </div>
              }      
            </div>
          </div>
        </div>
      </div>
    )
  }
  