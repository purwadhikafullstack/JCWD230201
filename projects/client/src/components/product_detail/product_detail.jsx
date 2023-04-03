import axios from "axios"
import { Carousel } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import Loading from "../loading/loading";

export default function ProductDetail(props) {

    const { id } = useParams()

    const [quantity, setQuantity] = useState(1)
    const [colors, setColors] = useState([])
    const [memory, setMemory] = useState([])
    const [selected, setSelected] = useState(0)

    let incrementQuantity = () => {
        if (quantity < selected.qty) {
            setQuantity(quantity + 1)
        }
    }
    let decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    let getSelected = async (mem) => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/${id}/${colors}/${mem}`)
            setMemory(mem)
            setSelected(response.data.data[0]);
        } catch (error) {

        }
    }

    let addToCart = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, { qty: quantity, product_id: selected.product_id, product_detail_id: selected.id }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            toast.success('Add to cart')

            props.func.getCart()
        } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message)
        }
    }


    var arrColor=[]
    var arrColorHex=[]
    props.data.detailProduct.forEach((item, index) => {
        if(!arrColor.includes(item.color)) arrColor.push(item.color)
        if(!arrColorHex.includes(item.colorhex)) arrColorHex.push(item.colorhex)
    });
    // console.log(arrColor);

    let arrMemory = []
    for (let i = 0; i < props.data.detailProduct.length; i++) {
        if (!arrMemory.includes(props.data.detailProduct[i].memory_storage)) {
            arrMemory.push(props.data.detailProduct[i].memory_storage)
        }
    }
    // console.log(arrMemory);

    useEffect(() => {
        props.func.getProductDetail(id)
    }, [])

    if (props.data.detail.length == 0) {
        return (
            <div>
                <Loading/>
            </div>
        )
    }
    return (
        <>
            <div className="pt-20 md:pt-32 grid justify-center w-screen md:flex md:justify-center lg:flex lg:justify-center md:gap-7 relative">
                <div className="lg:hidden flex items-center justify-between bg-white w-full px-3 md:px-5 py-2 border-b-2 fixed top-20">
                    <div className="text-xl font-semibold">
                        {props.data.detail.name}
                    </div>
                    <div className="text-xl font-semilight">
                        Rp {selected ? (selected.price * quantity).toLocaleString() : props.data.detailProduct[0].price.toLocaleString()}
                    </div>
                </div>
                <div className="w-full h-full md:w-full md:h-full lg:w-96 lg:h-full -z-10">
                    <div className="grid h-[500px] md:h-[300px] lg:h-96">
                        <Carousel>
                            <img src={require(`../../Assets/${props.data.detail.product_images[0].img}`)} alt="...."  className="w-44 md:w-80 lg:w-96"/>
                        </Carousel>
                    </div>
                </div>
                <div className="border lg:justify-center rounded-sm px-4 py-5">
                    <div className="text-2xl font-bold text-neutral-600">
                        {props.data.detail.name}
                    </div>
                    <div className="my-4">
                        <div className="bg-blue-500 text-white text-[11px] font-bold w-max px-3 rounded-tl-lg rounded-br-lg">
                            CLICK & PICKUP
                        </div>
                    </div>
                    <div>
                    <div className="flex gap-2">
                            {arrColor.map((value, index)=>{
                                return(
                                    <div>
                                        {value?
                                        <div>
                                            <div className="text-sm font-bold py-3 px-1 text-neutral-600">
                                                COLOR :
                                            </div>
                                            <button onClick={()=>setColors(value)} style={{backgroundColor: colors==value? "#113F90":"white", color: colors==value?"white":"black"}} className="flex items-center gap-2 border border-gray-400 px-3 py-1 rounded hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white min-w-[100px]">
                                                <div style={{backgroundColor: `${arrColorHex[index]}`}} className={`w-4 h-4 border rounded-full`}></div> {value}
                                            </button>
                                        </div>:null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {arrMemory.map((val) => {
                            return (
                                <div>
                                    {val ?
                                    <div>
                                        <div className="text-sm font-bold py-3 px-1 text-neutral-600">
                                            CAPACITY :
                                        </div>
                                        <button onClick={() => getSelected(val)} style={{ backgroundColor: memory == val ? "#113F90" : "white", color: memory == val ? "white" : "black" }} className="border border-gray-400 px-3 py-1 rounded hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white">
                                            {val} GB
                                        </button> 
                                    </div>: null
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full hidden md:block lg:hidden">
                        <button onClick={() => {
                            addToCart()
                        }}
                            className="bg-[#113F90] disabled:bg-[#6a9ffb] disabled:cursor-not-allowed text-white w-full font-semibold py-2 mt-3 rounded-sm" disabled={localStorage.getItem("token") == null ? true : selected.qty === 0 ? true : !selected ? true : false}>
                            Add to cart
                        </button>
                    </div>

                    <div className="w-80 md:w-96 mt-10">
                        {props.data.detail.description}
                    </div>
                    <div className="font-semibold mt-10">
                        Isi Kotak :
                        <li>{props.data.detail.name.split(' ')[0]} dengan iOS 16.</li>
                        <li>Kabel USB-C ke Lightning.</li>
                        <li>Buku Manual dan dokumentasi lain.</li>
                    </div>

                </div>

                <div className="fixed bottom-0 w-full md:hidden">
                    <button onClick={() => {
                        addToCart()
                    }}
                        className="bg-[#113F90] disabled:bg-[#6a9ffb] disabled:cursor-not-allowed text-white w-full font-semibold py-2 mt-3 rounded-sm" disabled={localStorage.getItem("token") == null ? true : selected.qty === 0 ? true : !selected ? true : false}>
                        Add to cart
                    </button>
                </div>

                <div className=" hidden lg:flex flex-col items-center px-7 py-3 h-max border rounded w-full md:w-[250px]">
                    <div className="text-2xl font-semibold">
                        Rp {selected ? (selected.price * quantity).toLocaleString() : props.data.detailProduct[0].price.toLocaleString()}
                    </div>
                    <div className="mt-1 line-through">
                        Rp. 19.999.000
                    </div>
                    <div className="flex items-center mt-3">
                        <button onClick={decrementQuantity} disabled={localStorage.getItem("token") == null ? true : selected.qty === 0 ? true : !selected ? true : false} className="disabled:hidden mr-4 text-xl">
                            -
                        </button>
                        <div className="border text-center w-24 hidden md:block">
                            {quantity}
                        </div>
                        <button onClick={incrementQuantity} disabled={localStorage.getItem("token") == null ? true : selected.qty === 0 ? true : !selected ? true : false} className="disabled:hidden ml-4 text-xl">
                            +
                        </button>
                    </div>
                    {
                        props.data.detailQty==0?
                            <div className=" text-red-500">
                                Out of stock
                            </div>
                            :
                            <div className=" text-red-500">
                                Stocks: {props.data.detailQty}
                            </div>
                    }
                    <button onClick={() => {
                        addToCart()
                        }}
                        className="bg-[#113F90] disabled:bg-[#6a9ffb] disabled:cursor-not-allowed text-white font-semibold px-3 py-1 mt-3 rounded-sm" disabled={localStorage.getItem("token") == null ? true : selected.qty === 0 ? true : !selected ? true : false}>
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}