import axios from "axios"
// import { Carousel } from "flowbite-react"
import { useEffect, useState } from "react"
// import iPhone14pro from './../../Assets/iphone_14_pro.jpg'
// import iPhone14pro1 from './../../Assets/iphone_14_pro_1.jpg'
// import iPhone14pro2 from './../../Assets/iphone_14_pro_2.jpg'
// import iPhone14pro3 from './../../Assets/iphone_14_pro_3.jpg'
// import iPhone14pro4 from './../../Assets/iphone_14_pro_4.jpg'
import {useParams} from 'react-router-dom';

export default function ProductDetail(props) {

    const {id} = useParams()

    const [quantity, setQuantity] = useState(1)
    const [detail, setDetail] = useState([])
    const [detailProduct, setDetailProduct] = useState([])
    const [colors, setColors] = useState([])
    const [memory, setMemory] = useState([])
    const [selected, setSelected] = useState(0)
    // const [arrDuplicate, setArrDuplicate] = useState([])

    let incrementQuantity = () => {
        setQuantity(quantity + 1)
    }
    let decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    let getProductDetail = async()=>{
        try {
            // console.log(id);
            let response = await axios.get(`http://localhost:8000/product/productdetail/${id}`)
            // console.log(response.data.data[0].product_images[0].img);
            setDetail(response.data.data[0])
            setDetailProduct(response.data.data[0].product_details)
        } catch (error) {
            console.log(error)
        }
    }

    let getSelected = async(mem)=>{
        try {
            let response = await axios.get(`http://localhost:8000/product/${id}/${colors}/${mem}`)
            setMemory(mem)
            setSelected(response.data.data[0]);
        } catch (error) {
            
        }
    }

    
    let arrColor = []
    for(let i=0 ; i<detailProduct.length ; i++){
        if(!arrColor.includes(detailProduct[i].color)){
            arrColor.push(detailProduct[i].color)
        }
    }
    // console.log(arrColor);
    
    let arrMemory = []
    for(let i=0 ; i<detailProduct.length ; i++){
        if(!arrMemory.includes(detailProduct[i].memory_storage)){
            arrMemory.push(detailProduct[i].memory_storage)
        }
    }
    // console.log(arrMemory);

    useEffect(() => {
      getProductDetail()
    },[])
    
    if(detail.length==0){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
        {/* {console.log(detail)} */}
        
        {/* {console.log([detail.name, colors, memory, quantity])} */}
            <div className="pt-28 flex justify-center gap-7">
                <div className="w-96 h-full">
                    <div className="grid h-56 sm:h-64 xl:h-80 2xl:h-96">
                        {/* <Carousel> */}            
                            <img src={require(`../../Assets/${detail.product_images[0].img}`)} alt="...." />                                    
                        {/* </Carousel> */}
                    </div>
                </div>
                <div className="border rounded px-4 py-5">
                    <div className="text-2xl font-bold">
                        {detail.name}
                    </div>
                    <div>
                    <div className="text-sm font-bold py-3 px-1">
                        COLOR :
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {arrColor.map((value, index)=>{
                            return(
                                <div>
                                    {value?
                                        <button onClick={()=>setColors(value)} style={{backgroundColor: colors==value? "#113F90":"white", color: colors==value?"white":"black"}} className="border border-gray-400 px-3 py-1 rounded hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white min-w-[100px]">
                                            {value}
                                        </button>:null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    </div>
                    <div className="text-sm font-bold py-3 px-1">
                        CAPACITY :
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {arrMemory.map((val)=>{
                            return(
                                <div>
                                    {val?
                                    <button onClick={()=>getSelected(val)} style={{backgroundColor: memory==val? "#113F90":"white", color: memory==val?"white":"black"}} className="border border-gray-400 px-3 py-1 rounded hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white">
                                        {val} GB
                                    </button>:null
                        }
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="w-96 mt-10">
                        {detail.description}
                    </div>
                    <div className="font-semibold mt-10">
                        Isi Kotak :
                        <li>iPhone dengan iOS 16.</li>
                        <li>Kabel USB-C ke Lightning.</li>
                        <li>Buku Manual dan dokumentasi lain.</li>
                    </div>

                </div>
                <div className="flex flex-col items-center px-7 py-3 h-max border rounded w-[250px]">
                    <div className="text-2xl font-semibold">
                        Rp {selected?(selected.price*quantity).toLocaleString():detailProduct[0].price.toLocaleString()}
                    </div>
                    <div className="mt-1 line-through">
                        Rp. 19.999.000
                    </div>
                    <div className="flex items-center mt-3">
                        <button onClick={decrementQuantity} className="mr-4 text-xl">
                            -
                        </button>
                        <div className="border text-center w-24">
                            {quantity}
                        </div>
                        <button onClick={incrementQuantity} className="ml-4 text-xl">
                            +
                        </button>
                    </div>
                    <button className=" bg-sky-800 text-white font-semibold px-3 py-1 mt-3 rounded">
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}