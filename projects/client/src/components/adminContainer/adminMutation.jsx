import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { userData } from "../../data/userData"
import { Modal, Button, Label, Pagination } from 'flowbite-react'
import toast,{ Toaster } from "react-hot-toast";
import { MdOutlineDescription } from 'react-icons/md'
import { BsClock, BsFillChatDotsFill } from 'react-icons/bs'
import noData from '../../Assets/data_not_found2.jpg'

export default function AdminMutation(){
    let {user} = useContext(userData)
        console.log(user)

    let onLocation = useRef()
    let onCategory = useRef()
    let onName = useRef()
    let onSpec = useRef()
    let onQty = useRef()
    const [locationName, setLocationName] = useState([])
    let [shotgun, setShotgun] = useState([
        'Request Lists', 'Response Lists'
    ])
    let shotgunStatus = [
        'bg-yellow-100 text-yellow-400 text-sm font-bold p-1',
        'bg-orange-100 text-orange-400 text-sm font-bold p-1',
        'bg-purple-200 text-purple-600 text-sm font-bold p-1',
        'bg-blue-100 text-blue-600 text-sm font-bold p-1',
        'bg-lime-400 bg-opacity-30 text-green-600 text-sm font-bold p-1',
        'bg-red-200 text-red-600 text-sm font-bold p-1',
        'bg-yellow-100 text-yellow-400 text-sm font-bold p-1',
    ]
    let [page, setPage] = useState(0)
    let [detailWarehouse, setDetailWarehouse] = useState([])
    let [detailCategory, setDetailCategory] = useState([])
    let [detailName, setDetailName] = useState([])
    let [detailSpec, setDetailSpec] = useState([])
    let [thisName, setThisName] = useState([])
    let [thisQty, setThisQty] = useState("")
    let [wantQty, setWantQty] = useState(0)
    let [showReq, setShowReq] = useState(false)
    let [myMutation, setMyMutation] = useState([])
    let [myRequest, setMyRequest] = useState([])
    let [myConfirm, setMyConfirm] = useState([])
    let [halo, setHalo] = useState()
    let [showConfirm, setShowConfirm] = useState(false)
    let [showCancel, setShowCancel] = useState(false)
    let [forId, setForId] = useState("") 
    let [forOrigin, setForOrigin] = useState("") 
    let [forTarget, setForTarget] = useState("") 
    let [forQty, setForQty] = useState("") 
    let [forCancel, setForCancel] = useState("") 
    let [forImg, setForImg] = useState("") 
    let [forName, setForName] = useState("") 
    let [forColor, setForColor] = useState("") 
    let [forStorage, setForStorage] = useState("") 
    let [forPrice, setForPrice] = useState("") 
    let [forProDetId, setForProDetId] = useState("") 
    let [forProId, setForProId] = useState("") 
    let [forLocTarget, setForLocTarget] = useState("") 
    let [forLocOrigin, setForLocOrigin] = useState("") 
    
    let getLocation = async()=>{
        try {
            let response = await axios.get('http://localhost:8000/location')
            // console.log(response.data.data);
            setLocationName(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    let ab = []
    for(let i=0 ; i<locationName.length ; i++){
        ab.push(locationName[i].city)
    }
    console.log(ab);


    let getDetailWarehouse = async()=>{
        try {
            setThisQty(0)
            let a = Number(onLocation.current.value)
            console.log(a);
            // console.log(id);
            let response = await axios.post('http://localhost:8000/location/detail', {location_warehouse_id: a})
            console.log(response);
            setDetailWarehouse(response.data.data)
            getDetailCategory()
        } catch (error) {
            
        }
    }

    let getDetailCategory = async()=>{
        try {
            if(onLocation.current.value!=0){
                let response = await axios.get('http://localhost:8000/location/category')
                console.log(response);
                setDetailCategory(response.data.data)
                // getName()
            }
        } catch (error) {
            
        }
    }

    // let getDetailName = async()=>{
    //     try {
    //         let a = Number(onLocation.current.value)
    //         let b = Number(onCategory.current.value)
    //         console.log(a);
    //         console.log(b)
    //         // console.log(id);
    //         let response = await axios.post('http://localhost:8000/location/name', {location_warehouse_id: a, category_id: b})
    //         console.log(response.data.data);
    //         setDetailName(response.data.data)
    //         // getDetailSpec()
            
    //     } catch (error) {
            
    //     }
    //         // setLocationName(response.data.data);
    // }

    let getDetailSpec = async()=>{
        try {
            setThisQty(0)
            let a = Number(onLocation.current.value)
            let b = Number(onCategory.current.value)
            let c = Number(onName.current.value)
            console.log(a);
            console.log(b)
            console.log(c)
            // console.log(id);
            let response = await axios.post('http://localhost:8000/location/spec', {location_warehouse_id: a, category_id: b, product_id: c})
            console.log(response.data.data);
            setDetailSpec(response.data.data)
            // getDetailLast()
        } catch (error) {
            console.log(error);
        }
    }

    let getDetailLast = async()=>{
        try {
            let a = Number(onLocation.current.value)
            // let b = Number(onCategory.current.value)
            // let c = Number(onName.current.value)
            let d = Number(onSpec.current.value)
            console.log(a);
            // console.log(b)
            // console.log(c)
            console.log(d);
            // console.log(id);
            let response = await axios.post('http://localhost:8000/location/getqty', {location_warehouse_id: a, product_detail_id: d })
            console.log(response.data.data.qty);
            setThisQty(response.data.data.qty);
            // console.log(response);
            // setDetailSpec(response.data.data)
            
        } catch (error) {
            
        }
            // setLocationName(response.data.data);
    }

    let getName = async()=>{
        try {
            setThisQty(0)
            let b = Number(onCategory.current.value)
            let response = await axios.post(`http://localhost:8000/location/getname`, {category_id: b})
            console.log(response.data.data);
            setThisName(response.data.data);
        } catch (error) {
            
        }
    }

    let submitLog = async()=>{
        try {
            let a = Number(onLocation.current.value)
            let d = Number(onSpec.current.value)
            let e = Number(onQty.current.value)
            if(onQty.current.value!=0){
            let response = await axios.post(`http://localhost:8000/location/a`, {qty: e, order_status_id: 7, product_detail_id: d, location_warehouse_id_origin: user.warehouse_id, location_warehouse_id_target: a})
            console.log(response);
            let response2 = await axios.patch(`http://localhost:8000/location/origin`, {id: response.data.data.id, product_detail_id: d, location_warehouse_id: user.warehouse_id})
            console.log(response2);
            onLocation.current.value=""
            onSpec.current.value=""
            onQty.current.value=""
            onName.current.value=""
            onCategory.current.value=""
            setShowReq(false)
            getMutation()
            setTimeout(() => {
                toast.success("Request Product Success", {
                    duration: 3000
                })
            }, 100)
            }else if(onQty.current.value==0){
                setTimeout(() => {
                    toast.error("Quantity Cannot 0", {
                        duration: 3000
                    })
                }, 100)
            }
        } catch (error) {
            
        }
    }

    let getMutation = async(status)=>{
        try {
            console.log(status);
            let response = await axios.get(`http://localhost:8000/location/all-mutation/${user.warehouse_id}`)
                console.log(response.data.data);
                setMyMutation(response.data.data);
            if(status==='all'){
                let response = await axios.get(`http://localhost:8000/location/all-mutation/${user.warehouse_id}`)
                console.log(response.data.data);
                setMyMutation(response.data.data);
            }else if(status==7){
                console.log(status);
                let response = await axios.get(`http://localhost:8000/location/all-mutation/${user.warehouse_id}/${status}`)
                console.log(response.data.data);
                setMyMutation(response.data.data);
            }else if(status==5){
                let response = await axios.get(`http://localhost:8000/location/all-mutation/${user.warehouse_id}/${status}`)
                console.log(response.data.data);
                setMyMutation(response.data.data);
            }else if(status==6){
                let response = await axios.get(`http://localhost:8000/location/all-mutation/${user.warehouse_id}/${status}`)
                console.log(response.data.data);
                setMyMutation(response.data.data);
            }
        } catch (error) {
            
        }
    }

    let getRequest = async()=>{
        try {
            let response = await axios.post(`http://localhost:8000/location/request/${user.warehouse_id}`, {order_status_id: 7})
            console.log(response.data.data);
            setMyRequest(response.data.data)
        } catch (error) {
            
        }
    }

    let simpanConfirm = async(valueid, valuelocation_product_id_origin, valueqty, valueimg, valuename, valuecolor, valuestorage, valueprice, valueproduct_detailid, valueproduct_detailproductid, valuelocation_warehouse_id_target, valuelocation_warehouse_id_origin, valuelocation_product_id_target)=>{
        try {
            setForId(valueid)
            setForOrigin(valuelocation_product_id_origin)
            setForTarget(valuelocation_product_id_target)
            setForQty(valueqty)
            setForImg(valueimg)
            setForName(valuename)
            setForColor(valuecolor)
            setForStorage(valuestorage)
            setForPrice(valueprice)
            setForProDetId(valueproduct_detailid)
            setForProId(valueproduct_detailproductid)
            setForLocTarget(valuelocation_warehouse_id_target)
            setForLocOrigin(valuelocation_warehouse_id_origin)
        } catch (error) {
            
        }
    }

    let simpanCancel = async(valueid)=>{
        try {
            setForCancel(valueid)
        } catch (error) {
            
        }
    }

    let postConfirm = async()=>{
        try {
            let a = Number(forId)
            let b = Number(forOrigin)
            let c = Number(forQty)
            let e = Number(forTarget)
            let response = await axios.post(`http://localhost:8000/location/confirm`, {id: a, order_status_id: 5, qty: forQty, location_warehouse_id: forLocTarget, product_detail_id: forProDetId, product_id: forProId, location_warehouse_id_target: forLocOrigin })
            console.log(response.data.data)
            let response2 = await axios.post(`http://localhost:8000/location/updateqty`, {id: b, qty: c, id_target: e})
            console.log(response2.data.data)
            getMutation()
            getRequest()
            setShowConfirm(false)
            setTimeout(() => {
                toast.success("Confirmation Product Success", {
                    duration: 3000
                })
            }, 100)
        } catch (error) {
            setTimeout(() => {
                toast.error(error.message, {
                    duration: 3000
                })
            }, 100)
        }
    }

    // let getConfirm = async()=>{
    //     try {
    //         let response = await axios.post(`http://localhost:8000/location/request/${user.warehouse_id}`, {order_status_id: 5})
    //         console.log(response.data.data);
    //         setMyConfirm(response.data.data)
    //     } catch (error) {
            
    //     }
    // }

    let postCancel = async()=>{
        try {
            let a = Number(forCancel)
            let response = await axios.post(`http://localhost:8000/location/cancel`, {id:a, order_status_id: 6})
            console.log(response.data.data);
            setMyConfirm(response.data.data)
            getMutation()
            getRequest()
            setShowCancel(false)
            setTimeout(() => {
                toast.success("Cancel Product Success", {
                    duration: 3000
                })
            }, 100)
        } catch (error) {
            setTimeout(() => {
                toast.error(error.message, {
                    duration: 3000
                })
            }, 100)
        }
    }
    
    useEffect(() => {
        getLocation()
        getMutation()
        getRequest()
        // getConfirm()
    }, [])
    if(myRequest.length==0){
        <div>
            Loading
        </div>
    }
    
    return(
        <div className="p-5 flex flex-col gap-8 min-h-screen">
            <div className="text-2xl font-semibold">
                {user.warehouse}'s Mutation
            </div>
            {
                user.role==1?
                <div className="border rounded-sm flex justify-between w-full">
                    <div className="flex gap-5 py-3 px-5 overflow-y-hidden">
                    {locationName.map((value, index)=>{
                        return(
                            // <Link to={`/admin/products-location/${value.id}`}>
                                <button onClick={()=>{console.log(value.id)}} className="border border-gray-400 px-3 py-2 rounded hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white min-w-[100px] ">
                                    {value.city}
                                </button>
                            // {/* </Link> */}
                        )
                    })}
                    </div>
                </div>:null
            }
            <div>
                <div className='flex justify-between'>
                    <div className='flex items-center mt-5 mb-5'>
                        <div className='flex gap-5 ml-5'>
                            {
                                shotgun.map((item, index) => {
                                    return (
                                        <button
                                            disabled={page == index ? true : false}
                                            onClick={() => {setPage(index)
                                                    // getTr(pickWH, index)
                                            }} className={`font-semibold hover:text-black ${page == index ? 'underline-offset-4 underline text-black' : 'text-gray-300'}  `}>
                                                {item}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex mt-5 mb-5 gap-4'>
                        <select className=' text-gray-600 p-1 rounded-sm border border-[#DBDBDB] focus:ring-transparent focus:border-black'
                            onChange={(e) => {getMutation(e.target.value)}}
                            id="bulan"
                            required={true}
                        >
                            <option value={'all'}>All Status</option>
                            <option value={7}>Waiting</option>
                            <option value={5}>Confirmed</option>
                            <option value={6}>Canceled</option>
                            
                            </select>
                        <Button onClick={()=>{setShowReq(!showReq)}} className="mr-5 hover:border-black border rounded-lg hover:text-black border-black bg-neutral-900 hover:bg-white w-[150px] h-[40px]"> 
                            <div className='text-md'>
                                Request Product
                            </div>
                        </Button>
                    </div>
                </div>
                 

                    <Modal
                        show={showReq}
                        size="2xl"
                        popup={true}
                        onClose={()=>setShowReq(!showReq)  }
                    >
                    <Modal.Header/>
                        <Modal.Body>
                    
                        <h3 className="text-xl mb-6 font-medium text-gray-900 dark:text-white text-center">
                            Request Product
                        </h3>
                        <div className="mb-2 block">
                            <Label
                                value="Warehouse Origin"
                            />
                        </div>
                        <select
                            disabled
                            id="city"
                            className="flex justify-center w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                        >
                            <option>{user.warehouse}</option>
                        </select>
                        <div className='flex-col gap-3 mb-2'>
                            <div className=''>
                                <div className="mb-2 block">
                                    <Label
                                        value="Warehouse Target"
                                    />
                                </div>
                                <select
                                    ref={onLocation}
                                    onChange={(e) => {
                                        getDetailWarehouse(e.target.value)
                                        onCategory.current.value="chooseCategory"
                                        onName.current.value="chooseProduct"
                                        onSpec.current.value="chooseSpec"
                                    }}
                                    id="city"
                                    className="w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                >
                                    <option value={"chooseWarehouse"}>Choose Warehouse</option>
                                    {locationName.map((value, index)=>{
                                        if(value.city===user.warehouse){
                                            return(
                                                null
                                            )
                                        }else{
                                            return (
                                                <option value={`${value.id}`}>{value.city}</option>
                                            )
                                        }
                                    })}
                                </select>
                                <div className="mb-2 block">
                                    <Label
                                        value="Category"
                                    />
                                </div>
                                <select
                                ref={onCategory}
                                onChange={(e) => {
                                    getName(e.target.value)
                                    onName.current.value="chooseProduct"
                                    onSpec.current.value="chooseSpec"}}
                                className="w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                >
                                    <option value={"chooseCategory"}>Choose Category</option>
                                    {detailCategory.map((value, index)=>{
                                        return(
                                            <option value={`${value.id}`} className='flex gap-4'>
                                                {value.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <div className="mb-2 block">
                                    <Label
                                        value="Product"
                                    />
                                </div>
                                <select
                                ref={onName}
                                onChange={(e) => {
                                    getDetailSpec(e.target.value)
                                    onSpec.current.value="chooseSpec"}}
                                className="w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                >
                                    <option value={"chooseProduct"}>Choose Product</option>
                                    {thisName.map((value, index)=>{
                                            return(
                                                <option value={`${value.id}`} className='flex gap-4'>
                                                    {value.name}
                                                </option>
                                            )
                                        
                                    })}
                                </select>
                                <div className="mb-2 block">
                                    <Label
                                        value="Specs"
                                    />
                                </div>
                                <select
                                ref={onSpec}
                                onChange={(e) => {
                                    getDetailLast(e.target.value)}}
                                className="w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                >
                                    <option value={"chooseSpec"}>Choose Specs</option>
                                    {detailSpec.map((value, index)=>{
                                        if(value.product_detail == null){
                                            return(null)
                                        }else if(value.product_detail.color==null && value.product_detail.memory_storage==null){
                                            return(
                                                <option value={`${value.product_detail.id}`} className='flex gap-4'>
                                                    Price: {value.product_detail.price}
                                                </option>
                                            )
                                        }else if(value.product_detail.color && value.product_detail.memory_storage==null){
                                            return(
                                                <option value={`${value.product_detail.id}`} className='flex gap-4'>
                                                    Price: {value.product_detail.price}, Color: {value.product_detail.color}
                                                </option>
                                            )   
                                        }else{
                                            return(
                                                <option value={`${value.product_detail.id}`} className='flex gap-4'>
                                                    Color: {value.product_detail.color}, Storage: {value.product_detail.memory_storage} GB
                                                </option>
                                            )
                                        }
                                    })}
                                </select>
                                <div className="mb-2 block">
                                    <Label
                                        value="Warehouse Target Quantity"
                                    />
                                </div>
                                <input className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={onQty}
                                        disabled
                                        defaultValue={thisQty}
                                />
                                <div className="mb-2 block">
                                    <Label
                                        value="Quantity Request"
                                    />
                                </div>
                                <input className='w-full mb-2 py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={onQty}
                                        id="qty"
                                        placeholder="0"
                                        required={true}
                                    />
                            </div>
                        </div>
                        <Button onClick={()=>submitLog()} className='hover:border-black text-white border rounded-sm hover:text-black border-black bg-neutral-900 hover:bg-white w-full'>                                                                                
                            Submit
                        </Button>
                    </Modal.Body>
                    </Modal>
                    {page==1?
                    <div>
                        { myMutation.length>0?
                            myMutation.map((value, index)=>{
                                return(
                                    <div className='flex flex-col rounded-md border border-slate-200 shadow-sm z-0'>
                                            <div className='flex font-semibold gap-3 p-3'>
                                                <div className='flex w-1/2 gap-3'>
                                                    {/* <div className='font-semibold'>
                                                        {value.id}
                                                    </div> */}
                                                    <div className={`${shotgunStatus[value.order_status_id - 1]} px-2 rounded-xl py-1`}>
                                                        {value.order_status.status}
                                                    </div>

                                                    <div className='flex items-center opacity-50 gap-3'>
                                                        <BsClock />
                                                        {value.updatedAt.slice(0, 10)}
                                                    </div>
                                                </div>

                                                <div className='flex w-1/2 justify-end items-center gap-3'>
                                                    <div className='opacity-60 text-sm font-medium'>
                                                        Request to :
                                                    </div>
                                                    Warehouse {ab[value.location_warehouse_id_target-1]}
                                                </div>
                                            </div>

                                            <div className='flex px-5 justify-between'>
                                                <div className='w-4/5 flex flex-col'>
                                                    <div className='flex'>
                                                        <img src={require(`../../../../server/src/Public/images/${value.product_detail.product.product_images[0].img}`)} className='w-20 h-20 object-contain' alt="" />
                                                        <div className='mt-4 font-bold flex flex-col items-start'>
                                                            <button>
                                                            {value.product_detail.product.name}
                                                            </button>
                                                            <div className='flex gap-2'>
                                                            {
                                                                (value.product_detail.color==null && value.product_detail.memory_storage==null)==true?
                                                                    <div className='text-center opacity-60 font-lg'>
                                                                        Price: Rp. {value.product_detail.price}
                                                                    </div>
                                                                    :
                                                                    (value.product_detail.color && value.product_detail.memory_storage==null)==true?
                                                                    <div className='text-center opacity-60 font-lg'>
                                                                        Price: {value.product_detail.price}, Color: {value.product_detail.color}
                                                                    </div>
                                                                    :
                                                                    <div className='text-center opacity-60 font-lg'>
                                                                        Color: {value.product_detail.color}, Storage: {value.product_detail.memory_storage} GB
                                                                    </div>
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='w-1/5 flex'>
                                                    <div className='border'></div>
                                                    <div className='flex flex-col w-full h-full items-center justify-center text-lg font-bold'>
                                                        <div className='text-sm font-medium opacity-60'>Total Products</div>
                                                        <div>{value.qty} Pcs</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-8 p-5'>
                                                <div className='flex items-center gap-2'>
                                                    <div>
                                                        Category : 
                                                    </div>
                                                    <div className=' text-green-500'>
                                                        {value.product_detail.product.category.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })
                            :
                            <div className='h-full w-full flex flex-col items-center justify-center'>
                                <img src={noData} width={'300px'} alt="" />
                                <div className='text-xl font-semibold'>
                                    Sorry Data Not Found
                                </div>
                            </div>
                        }
                    </div>
                : null}
                {page==0?
                    <div>
                        { myRequest.length>0?
                            myRequest.map((value, index)=>{
                                return(
                                    <div className='flex flex-col rounded-md border border-slate-200 shadow-sm z-0'>
                                            <div className='flex font-semibold gap-3 p-3'>
                                                <div className='flex w-1/2 gap-3'>
                                                    {/* <div className='font-semibold'>
                                                        {value.id}
                                                    </div> */}
                                                    <div className="bg-yellow-100 text-yellow-400 text-sm font-bold p-1 px-2 rounded-xl py-1">
                                                        {value.order_status.status}
                                                    </div>

                                                    <div className='flex items-center opacity-50 gap-3'>
                                                        <BsClock />
                                                        {value.updatedAt.slice(0, 10)}
                                                    </div>
                                                </div>
                                                <div className='flex w-1/2 justify-end items-center gap-3'>
                                                    <div className='opacity-60 text-sm font-medium'>
                                                        Request from :
                                                    </div>
                                                    Warehouse {ab[value.location_warehouse_id_origin-1]}
                                                </div>
                                            </div>

                                            <div className='flex px-5 justify-between'>
                                                <div className='w-4/5 flex flex-col'>
                                                    <div className='flex'>
                                                    <img src={require(`../../../../server/src/Public/images/${value.product_detail.product.product_images[0].img}`)} className='w-20 h-20 object-contain' alt="" />
                                                        <div className='mt-4 font-bold flex flex-col items-start'>
                                                            <button>
                                                            {value.product_detail.product.name}
                                                            </button>
                                                            <div className='flex gap-2'>
                                                            {
                                                                (value.product_detail.color==null && value.product_detail.memory_storage==null)==true?
                                                                    <div className='text-center opacity-60 font-lg'>
                                                                        Price: Rp. {value.product_detail.price}
                                                                    </div>
                                                                    :
                                                                    (value.product_detail.color && value.product_detail.memory_storage==null)==true?
                                                                    <div className='text-center opacity-60 font-lg'>
                                                                        Price: {value.product_detail.price}, Color: {value.product_detail.color}
                                                                    </div>
                                                                    :
                                                                    <div className='text-center opacity-60 font-lg'>
                                                                        Color: {value.product_detail.color}, Storage: {value.product_detail.memory_storage} GB
                                                                    </div>
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-1/5 flex'>
                                                    <div className='border'></div>
                                                    <div className='flex flex-col w-full h-full items-center justify-center text-lg font-bold'>
                                                        <div className='text-sm font-medium opacity-60'>Total Products</div>
                                                        <div>{value.qty} Pcs</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center gap-8 p-5'>
                                                <div className='flex items-center gap-2'>
                                                    <div>
                                                        Category : 
                                                    </div>
                                                    <div className=' text-green-500'>
                                                        {value.product_detail.product.category.name}
                                                    </div>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Button onClick={()=>{console.log(value.location_warehouse_id_target);simpanConfirm(value.id, value.location_product_id_origin, value.qty, value.product_detail.product.product_images[0].img, value.product_detail.product.name, value.product_detail.color, value.product_detail.memory_storage, value.product_detail.price, value.product_detail.id, value.product_detail.product.id, value.location_warehouse_id_target, value.location_warehouse_id_origin, value.location_product_id_target);setShowConfirm(true)}} color="success" className="w-[80px] h-[30px]">
                                                        <div className="text-md font-bold">
                                                            Confirm
                                                        </div>
                                                    </Button>
                                                    <Button onClick={()=>{simpanCancel(value.id);setShowCancel(true)}} color="failure" className="w-[80px] h-[30px]">
                                                        <div className="text-md font-bold">
                                                            Reject
                                                        </div>
                                                    </Button>
                                                </div>
                                                {/* Confirm */}
                    <Modal
                        show={showConfirm}
                        size="sm"
                        popup={true}
                        onClose={()=>setShowConfirm(!showConfirm)  }
                    >
                       
                    <Modal.Header/>
                        <Modal.Body>
                            <div className="flex-col">
                                    <div className="felx text-xl mb-5 font-bold text-gray-900 dark:text-white text-center gap-5">
                                        Confirm Request? {forId}
                                    </div>
                                <div className='flex-col mb-10 border-2 border-solid'>
                                {/* <div className='flex'> */}
                                {/* {console.log(forImg)} */}
                                    {/* <img src={require(`../../../../server/src/Public/images/${forImg}`)} className='w-20 h-20 object-contain' alt="" /> */}
                                    {/* <div className='font-bold flex flex-col items-center justify-center'> */}
                                    <div className='font-bold text-lg text-center'>
                                        {forName}
                                    </div>
                                    {
                                        (forColor==null && forStorage==null)==true?
                                            <div className='text-center opacity-60 font-lg'>
                                                Price: Rp. {forPrice}
                                            </div>
                                            :
                                            (forColor && forStorage==null)==true?
                                                <div className='text-center opacity-60 font-lg'>
                                                    Price: {forPrice}, Color: {forColor}
                                                </div>
                                                :
                                                <div className='text-center opacity-60 font-lg'>
                                                    Color: {forColor}, Storage: {forStorage} GB
                                                </div>
                                    }
                                    <div className='font-bold text-lg text-center'>
                                        {forQty} Pcs
                                    </div>
                                </div>
                                    {/* </div> */}
                                {/* </div> */}
                                <div className="flex justify-center gap-5">
                                    <Button color="success" onClick={()=>{postConfirm()}} className="w-[150px] h-[50px]">
                                        <div className="text-xl font-bold">
                                            Yes
                                        </div>
                                    </Button>
                                    <Button onClick={()=>setShowConfirm(false)} color="light" className="w-[150px] h-[50px]">
                                        <div className="text-xl font-bold">
                                            No
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Confirm */}

                    {/* Cancel */}
                        <Modal
                        show={showCancel}
                        size="sm"
                        popup={true}
                        onClose={()=>setShowCancel(!showCancel)  }
                    >
                    <Modal.Header/>
                        <Modal.Body>
                            <div className="flex-col">
                                <div className="felx text-xl mb-10 font-bold text-gray-900 dark:text-white text-center gap-5">
                                    Reject Request? {forCancel}
                                </div>
                                <div className='flex-col mb-10 border-2 border-solid'>
                                {/* <div className='flex'> */}
                                {/* {console.log(forImg)} */}
                                    {/* <img src={require(`../../../../server/src/Public/images/${forImg}`)} className='w-20 h-20 object-contain' alt="" /> */}
                                    {/* <div className='font-bold flex flex-col items-center justify-center'> */}
                                    <div className='font-bold text-lg text-center'>
                                        {forName}
                                    </div>
                                    {
                                        (forColor==null && forStorage==null)==true?
                                            <div className='text-center opacity-60 font-lg'>
                                                Price: Rp. {forPrice}
                                            </div>
                                            :
                                            (forColor && forStorage==null)==true?
                                                <div className='text-center opacity-60 font-lg'>
                                                    Price: Rp. {forPrice}, Color: {forColor}
                                                </div>
                                                :
                                                <div className='text-center opacity-60 font-lg'>
                                                    Color: {forColor}, Storage: {forStorage} GB
                                                </div>
                                    }
                                    <div className='font-bold text-lg text-center'>
                                        {forQty} Pcs
                                    </div>
                                </div>
                                <div className="flex justify-center gap-5">
                                    <Button color="success" onClick={()=>postCancel()} className="w-[150px] h-[50px]">
                                        <div className="text-xl font-bold">
                                            Yes
                                        </div>
                                    </Button>
                                    <Button onClick={()=>setShowCancel(false)} color="light" className="w-[150px] h-[50px]">
                                        <div className="text-xl font-bold">
                                            No
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Cancel */}
                                            </div>
                                        </div>
                                )
                            })
                            :
                            <div className='h-full w-full flex flex-col items-center justify-center'>
                                <img src={noData} width={'300px'} alt="" />
                                <div className='text-xl font-semibold'>
                                    Sorry Data Not Found
                                </div>
                            </div>
                        }
                    </div>
                : null}
            </div>
        </div>
    )
}