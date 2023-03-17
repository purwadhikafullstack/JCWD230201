import axios from 'axios'
// import { Card } from 'flowbite-react';
import { useEffect, useRef, useState, useContext } from 'react';
import { userData } from '../../data/userData';
// import { Link } from 'react-router-dom';
// import {AiOutlinePlus} from 'react-icons/ai'
import {BsPencil,BsTrash} from 'react-icons/bs'
import toast,{ Toaster } from "react-hot-toast";
import { Modal, Button, Label, Pagination } from 'flowbite-react'
import ButtonWithIcon from '../core/buttonWithIcon';
import { useParams } from 'react-router-dom';

export default function AdminProducts(props){

    let {user} = useContext(userData)
    const {id} = useParams()
    console.log(id);

    let numInc = 1
    
    let onAddName = useRef()
    let onAddCategory = useRef()
    let onAddDescription = useRef()
    let onAddPrice = useRef()
    let onAddStorage = useRef()
    let onAddColor = useRef()
    let onAddColorHex = useRef()
    let onAddQuantity = useRef()
    let onUpdateName = useRef()
    let onUpdateDescription = useRef()
    let onUpdateCategory = useRef()
    let onUpdatePrice = useRef()
    let onUpdateStorage = useRef()
    let onUpdateColor = useRef()
    let onUpdateColorHex = useRef()
    let onUpdateQty = useRef()
    // console.log(props.data.showProduct);
    const [message, setMessage] = useState('')
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [showEditProduct, setShowEditProduct] = useState(false)
    const [editName, setEditName] = useState("")
    const [editProductCategoryId, setEditProductCategoryId] = useState("")
    const [deleteProductId, setDeleteProductId] = useState("")
    const [deleteProductCategoryId, setDeleteProductCategoryId] = useState("")
    const [editId, setEditId] = useState("")
    const [editProductCategory, setEditProductCategory] = useState("")
    const [editPrice, setEditPrice] = useState("")
    const [editStorage, setEditStorage] = useState("")
    const [editColor, setEditColor] = useState("")
    const [editColorHex, setEditColorHex] = useState("")
    const [editQuantity, setEditQuantity] = useState("")
    const [editDesc, setEditDesc] = useState("")
    const [deleteProductName, setDeleteProductName] = useState("")
    const [showDeleteProduct, setShowDeleteProduct] = useState(false)
    const [imgProduct, setImgProduct] = useState({
        photo_product: []
    })
    const [arrProducts, setArrProducts] = useState([])
    const [showPage, setShowPage] = useState(1)


    let getEveryProducts = async(_page, btn)=>{
        try {
            console.log("masuk")
            console.log(_page)
            let response = await axios.get(`http://localhost:8000/product/products/all?page=${_page?_page:showPage}`)
                console.log(response.data);
                setShowPage({page: response.data.page, pages: response.data.pages, total: response.data.total})
                console.log(response.data.page);
                setArrProducts(response.data.data)
            if(btn==="next"){
                _page = Number(_page) + 1
                let response = await axios.get(`http://localhost:8000/product/products/all?page=${_page?_page:showPage}`)
                console.log(response.data);
                setShowPage({page: response.data.page, pages: response.data.pages, total: response.data.total})
                console.log(response.data.page);
                setArrProducts(response.data.data)
            }else if(btn==="prev"){
                _page = Number(_page) - 1
                let response = await axios.get(`http://localhost:8000/product/products/all?page=${_page?_page:showPage}`)
                console.log(response.data);
                setShowPage({page: response.data.page, pages: response.data.pages, total: response.data.total})
                console.log(response.data.page);
                setArrProducts(response.data.data)
            }
        } catch (error) {
            
        }
    }    

    let onImageValidation = (e) => {
        try {
            let files = [...e.target.files]
            console.log(files)
            setImgProduct({ ...imgProduct, photo_product: files })

            if (files.length !== 0) {
                files.forEach((value) => {
                    if (value.size > 1000000) throw { message: `${value.name} more than 1000 Kb` }
                })
            }


        } catch (error) {
            console.log(error)
            setMessage(error.message)
        }
    }

    let addProduct = async()=>{
        try {
            let inputAddName = onAddName.current.value
            let inputAddCategory = onAddCategory.current.value
            let inputAddDescription = onAddDescription.current.value
            let inputAddPrice = onAddPrice.current.value
            let inputAddStorage = onAddStorage.current.value
            let inputAddColor = onAddColor.current.value
            let inputAddColorHex = onAddColorHex.current.value
            let inputAddQuantity = onAddQuantity.current.value
            let fd = new FormData()
            fd.append('images', imgProduct.photo_product[0])
            fd.append('data', JSON.stringify({name: inputAddName, description: inputAddDescription, category_id: inputAddCategory, price: inputAddPrice, memory_storage: inputAddStorage, color: inputAddColor, colorhex: inputAddColorHex, qty: inputAddQuantity}))
            let response = await axios.post('http://localhost:8000/product/add-product',fd)
            console.log(response);
            onAddName.current.value = ""
            onAddCategory.current.value = ""
            onAddPrice.current.value = ""
            onAddStorage.current.value = ""
            onAddColor.current.value = ""
            onAddColorHex.current.value = ""
            onAddQuantity.current.value = ""
            setTimeout(() => {
                toast.success('Add New Product Success', {
                    duration: 3000
                })
            }, 100)
            setShowAddProduct(false)
            props.func.getCategory()
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                toast.error(error.message, {
                    duration: 3000
                })
            }, 100)
        }
    }

    let updateProduct = async(value, index, valdesc, valPrice, valmemory_storage, valcolor, valcolorhex, valqty, valueid, valcategoryid)=>{
        try {
            console.log(valueid, "product.id"); 
            setEditId(valueid)// product.id
            setEditName(value) // product.name
            console.log(value, "product.name");
            console.log(valdesc, "product.desc");
            console.log(valcategoryid, "product.category_id");
            setEditProductCategoryId(index)
            // console.log(props.data.getProductDetail);
            console.log(index, "product_detail.id");
            setEditDesc(valdesc)
            setEditPrice(valPrice);
            setEditStorage(valmemory_storage)
            console.log(editStorage);
            setEditColor(valcolor)
            console.log(valcolorhex);
            setEditColorHex(valcolorhex)
            setEditQuantity(valqty)
            // setShowEditProduct(false)
            props.func.getProduct()
        } catch (error) {
            
        }
    }
    
    let getDetail = async(val)=>{
        try {
            // setEditId(val);
            let response = await axios.post('http://localhost:8000/product/edit-product/detail', {id: val})
            console.log(response);
            setEditProductCategory(response.data.data.name)
        } catch (error) {
            
        }
    }
    
    let updateProductAgain = async()=>{
        try {
            console.log(editId); // product.id
            let inputUpdateName = onUpdateName.current.value //product.name
            console.log(inputUpdateName);
            let inputUpdateDescription = onUpdateDescription.current.value //product.description
            let inputUpdateCategory = onUpdateCategory.current.value.split(",")[1] // product.category_id
            console.log(editProductCategoryId) // product_detail.id
            let inputUpdatePrice = onUpdatePrice.current.value // product_detail.price
            let inputUpdateStorage = onUpdateStorage.current.value // product_detail.memory_storage
            let inputUpdateColor = onUpdateColor.current.value // product_detail.color
            let inputUpdateColorHex = onUpdateColorHex.current.value // product_detail.color
            let inputUpdateQty = onUpdateQty.current.value // product_detail.qty
            let response = await axios.patch('http://localhost:8000/product/update-product/detail/a/a', {id: editId, name: inputUpdateName, description: inputUpdateDescription, category_id: inputUpdateCategory })
            console.log(response);
            let fd = new FormData()
            fd.append('images', imgProduct.photo_product[0])
            fd.append('data', JSON.stringify({id: editProductCategoryId, qty: inputUpdateQty, price: inputUpdatePrice, memory_storage: inputUpdateStorage, color: inputUpdateColor, colorhex: inputUpdateColorHex, product_id: editId}))
            if(imgProduct.photo_product.length==0){
                let data = await axios.patch('http://localhost:8000/product/update-product/detail/a/a/a/a', {id: editProductCategoryId, qty: inputUpdateQty, price: inputUpdatePrice, memory_storage: inputUpdateStorage, color: inputUpdateColor,colorhex: inputUpdateColorHex, product_id: editId})
            }else{

                let data = await axios.patch('http://localhost:8000/product/update-product/detail/a/a/a', fd)
                console.log(data);
            }
            // onUpdateName.current.value = ""
            // onUpdateDescription.current.value = ""
            // onUpdateCategory.current.value.split(",")[1] = ""
            // onUpdatePrice.current.value = ""
            // onUpdateStorage.current.value = ""
            // onUpdateColor.current.value = ""
            // onUpdateQty.current.value = ""
            setTimeout(() => {
                toast.success('Update Product Success', {
                    duration: 3000
                })
            }, 100)
            setShowEditProduct(false)
        } catch (error) {
            console.log(error.message);
            setTimeout(() => {
                toast.error(error.message, {
                    duration: 3000
                })
            }, 100)
        }
    }

    let getDeleteProduct = (valueid, valid, valuename)=>{
        try {
            setDeleteProductId(valueid);
            setDeleteProductCategoryId(valid);
            setDeleteProductName(valuename)
        } catch (error) {
            
        }
    }

    let deleteProduct = async()=>{
        try {
            let data = await axios.post('http://localhost:8000/product/delete-product/detail/a/a', {id: deleteProductId})
            console.log(data);
            let response = await axios.post('http://localhost:8000/product/delete-product/detail/a/a/a', {id: deleteProductCategoryId})
            console.log(response);
            setTimeout(() => {
                toast.success('Delete Product Success', {
                    duration: 3000
                })
            }, 100)
            setShowDeleteProduct(false)
            props.func.getProduct()
        } catch (error) {
            setTimeout(() => {
                toast.error(error.message, {
                    duration: 3000
                })
            }, 100)
        }
    }

    useEffect(() => {
      props.func.getCategory()
      props.func.getProduct()
      props.func.getProductDetail()
      getEveryProducts(showPage)
    }, [])
    

    return(
        <div>
            <div className='flex justify-end pr-12'>
                
                {/* Add Product */}
                {user.role == 1?
                <ButtonWithIcon handleClick={()=>{setShowAddProduct(!showAddProduct)}} label="Add Product"/>
                :null}
                <Modal
                    show={showAddProduct}
                    size="2xl"
                    popup={true}
                    onClose={()=>setShowAddProduct(!showAddProduct)  }
                >
                <Modal.Header/>
                    <Modal.Body>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                        Add Product
                    </h3>
                    <div className='gap-5 overflow-x-hidden h-96'>
                        <div className="mb-2 block">
                            <Label
                                value="Name"
                            />
                        </div>
                        <input ref={onAddName} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="Name"
                            placeholder="Name"
                            required={true}
                        />
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    value="Category"
                                />
                            </div>
                            <select
                                onChange={() => console.log(onAddCategory.current.value)}
                                ref={onAddCategory}
                                id="category"
                                className="w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                            >
                                {props.data.category.map((value, index) => {
                                    return <option value={`${value.id}`}>{value.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="mb-2 block">
                            <Label
                                value="Image"
                            />
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => onImageValidation(e)} className="w-full pr-3 border rounded-sm" />
                        <div>
                            {message}
                        </div>
                        <div className="mb-2 block">
                            <Label
                                value="Description"
                            />
                        </div>
                        <input ref={onAddDescription} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="description"
                            placeholder="Description"
                            required={true}
                        />
                        <div className="mb-2 block">
                            <Label
                                value="Price"
                            />
                        </div>
                        <input ref={onAddPrice} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="price"
                            placeholder="899000"
                            required={true}
                        />
                        <div className="mb-2 block">
                            <Label
                                value="Storage"
                            />
                        </div>
                        <input ref={onAddStorage} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="Storage"
                            placeholder="128"
                            required={true}
                        />
                        <div className="mb-2 block">
                            <Label
                                value="Color"
                            />
                        </div>
                        <input ref={onAddColor} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="Color"
                            placeholder="White"
                            required={true}
                        />
                        <div className="mb-2 block">
                            <Label
                                value="Color Hex"
                            />
                        </div>
                        <input ref={onAddColorHex} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="ColorHex"
                            placeholder="#DF2E38"
                            required={true}
                        />
                        <div className="mb-2 block">
                            <Label
                                value="Quantity"
                            />
                        </div>
                        <input ref={onAddQuantity} className='mb-2 w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                            id="Quantity"   
                            placeholder="24"
                            required={true}
                        />
                    </div>
                    <div className=" flex justify-center py-5">
                        <Button onClick={()=>addProduct()} className='hover:border-black text-white border rounded-sm hover:text-black border-black bg-neutral-900 hover:bg-white w-[640px]'>                                                                                
                            Submit
                        </Button>
                    </div>
                </Modal.Body>
                </Modal>
                {/* Add Product */}

                {/* Edit Product */}
                <Modal
                    show={showEditProduct}
                    size="2xl"
                    popup={true}
                    onClose={()=>setShowEditProduct(!showEditProduct)  }
                >
                <Modal.Header/>
                    <Modal.Body>
                    <h3 className=" mb-8 text-xl font-medium text-gray-900 dark:text-white text-center">
                        Edit Product
                    </h3>
                    <div className='gap-5 overflow-x-hidden h-96'>
                        
                        <div>
                            <div className=" mb-2 block">
                                <Label
                                    value="New Product Name"
                                />
                            </div>
                            <input ref={onUpdateName} className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                id="Product Name"
                                placeholder="name"
                                required={true}
                                defaultValue={editName}
                            />
                            <div className=" mb-2 block">
                                <Label
                                    value="New Product Category"
                                />
                            </div>
                            <select
                                onChange={() =>{ console.log(onUpdateCategory.current.value)}}
                                ref={onUpdateCategory}
                                id="category"
                                className="w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                            >
                                {props.data.category.map((value, index) => {
                                    return <option value={`${value.name}, ${value.id}`}>{value.name}</option>;
                                })}
                            </select>
                            <div className=" mb-2 block">
                                <Label
                                    value="New Description"
                                />
                            </div>
                            <input ref={onUpdateDescription}  className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                id="desc"
                                placeholder="Description"
                                required={true}
                                defaultValue={editDesc}
                            />
                            <div className=" mb-2 block">
                                <Label
                                    value="New Price"
                                />
                            </div>
                            <input ref={onUpdatePrice} className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                id="price"
                                placeholder="899000"
                                required={true}
                                defaultValue={editPrice}
                            />
                            {/* {editStorage==null?null: */}
                            <div>
                                <div className=" mb-2 block">
                                    <Label
                                        value="New Storage"
                                    />
                                </div>
                                <input ref={onUpdateStorage} className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                    id="storage"
                                    placeholder="256"
                                    required={true}
                                    defaultValue={editStorage}
                                />
                            </div>
                            {/* } */}
                            {/* {editColor==null?null: */}
                            <div>
                                <div className=" mb-2 block">
                                    <Label
                                        value="New Color"
                                    />
                                </div>
                                <input ref={onUpdateColor} className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                    id="Color"
                                    placeholder="White"
                                    required={true}
                                    defaultValue={editColor}
                                />
                            </div>
                            <div>
                                <div className=" mb-2 block">
                                    <Label
                                        value="New Color Hex"
                                    />
                                </div>
                                <input ref={onUpdateColorHex} className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                    id="Colorhex"
                                    placeholder="#ffff"
                                    required={true}
                                    defaultValue={editColorHex}
                                />
                            </div>
                            {/* } */}
                            <div className=" mb-2 block">
                                <Label
                                    value="New Quantity"
                                />
                            </div>
                            <input ref={onUpdateQty} className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' 
                                id="Quantity"
                                placeholder="24"
                                required={true}
                                defaultValue={editQuantity}
                            />
                        </div>
                    </div>
                    <div className="mb-2 block">
                                <Label
                                    value="Image"
                                />
                            </div>
                            <input type="file" accept="image/*" onChange={(e) => onImageValidation(e)} className="w-full pr-3 border rounded-sm" />
                            <div>
                                {message}
                            </div>
                    <div className=" flex justify-center py-5">
                        <Button onClick={()=>updateProductAgain()} className='hover:border-black text-white border rounded-sm hover:text-black border-black bg-neutral-900 hover:bg-white w-[640px]'>                                                                                
                            Submit
                        </Button>
                    </div>
                </Modal.Body>
                </Modal>
                {/* Edit Product */}

                {/* Delete Product */}
                <Modal
                    show={showDeleteProduct}
                    size="sm"
                    popup={true}
                    onClose={()=>setShowDeleteProduct(!showDeleteProduct)  }
                >
                <Modal.Header/>
                    <Modal.Body>
                        <div className="flex-col">
                            <div className="felx text-xl mb-10 font-bold text-gray-900 dark:text-white text-center gap-5">
                                Delete {deleteProductName} ?
                            </div>
                            <div className="flex justify-center gap-5">
                                <Button color="failure" onClick={()=>deleteProduct()} className="w-[150px] h-[50px]">
                                    <div className="text-xl font-bold">
                                        Yes
                                    </div>
                                </Button>
                                <Button onClick={()=>setShowDeleteProduct(!showDeleteProduct)} color="light" className="w-[150px] h-[50px]">
                                    <div className="text-xl font-bold">
                                        No
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Delete Product */}

            </div>
            <div className="flex justify-center p-10">
                <div className="flex justify-center gap-10 p-5">
                    <div className="relative overflow-y-auto shadow-md  sm:rounded-lg">
                        <table className="w-full text-sm text-center border text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Storage
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color Hex
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    {user.role == 1?
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>:null
                                    }
                                </tr>
                            </thead>
                            {
                                !props.data.showProduct.length==0?props.data.showProduct.map((value, index)=>{
                                    return(
                                        <tbody >
                                            {value.product_details.map((val, idx)=>{
                                                return(
                                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                        <td className="px-6 py-3 font-bold">
                                                            {numInc++}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {value.name}
                                                        </td>
                                                        <tr className="px-6">
                                                            {value.description.slice(0, 100)}...
                                                        </tr>
                                                        <td className="px-6 py-3">
                                                            {val.price}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {val.memory_storage}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {val.color}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {val.colorhex}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {val.qty}
                                                        </td>
                                                        {user.role == 1?
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-4">
                                                                <button onClick={()=>{getDetail(val.id);updateProduct(value.name, val.id, value.description, val.price, val.memory_storage, val.color, val.colorhex, val.qty, value.id, value.category_id);setShowEditProduct(!showEditProduct)}} className="flex items-center"> 
                                                                    <BsPencil size={'15px'}/>
                                                                </button>
                                                                <button onClick={()=>{getDeleteProduct(value.id, val.id, value.name);setShowDeleteProduct(!showDeleteProduct)}} className="flex items-center">
                                                                    <BsTrash size={'15px'} />
                                                                </button>
                                                            </div>
                                                            {/* <button onClick={()=>console.log(val.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button> */}
                                                        </td>:null
                                                        }
                                                    </tr>
                                                )
                                            })}
                                        
                                        </tbody>
                                    )
                                })
                            :
                            arrProducts.map((value, index)=>{
                                return(
                                    <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <td className="px-6 py-3 font-bold">
                                                        {value.id}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {value.product.name}
                                                    </td>
                                                    <tr className="px-6">
                                                        {value.product.description.slice(0, 100)}...
                                                    </tr>
                                                    <td className="px-6 py-3">
                                                        {value.price}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {value.memory_storage}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {value.color}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {value.colorhex}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {value.qty}
                                                    </td>
                                                    {user.role == 1?
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-4">
                                                            <button onClick={()=>{getDetail(value.id);updateProduct(value.product.name, value.product.id, value.product.description, value.price, value.memory_storage, value.color, value.colorhex, value.qty, value.product.id, value.prodduct.category_id);setShowEditProduct(!showEditProduct)}} className="flex items-center"> 
                                                                <BsPencil size={'15px'}/>
                                                            </button>
                                                            <button onClick={()=>{getDeleteProduct(value.id, value.product.id, value.product.name);setShowDeleteProduct(!showDeleteProduct)}} className="flex items-center">
                                                                <BsTrash size={'15px'} />
                                                            </button>
                                                        </div>
                                                        {/* <button onClick={()=>console.log(val.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button> */}
                                                    </td>:null
                                                    }
                                                </tr>
                                    </tbody>
                                )
                            })
                            }
                        </table>
                            <div className='flex justify-center border p-5'>
                                <button className='border font-semibold rounded-l-lg px-4 hover:bg-black hover:text-white' onClick={()=> {getEveryProducts(showPage.page, "prev");console.log(showPage)}}>
                                    Previous
                                </button>
                                <button className='border font-semibold rounded-r-lg px-7 hover:bg-black hover:text-white' onClick={()=> {getEveryProducts(showPage.page, "next");console.log(showPage)}}>
                                    Next
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}