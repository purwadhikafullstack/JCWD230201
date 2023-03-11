import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Cart() {

    const [productCart, setProductCart] = useState([])

    let getData = async () => {
        try {
            let response = await axios.get('http://localhost:8000/cart/data-cart', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            console.log(response.data.data)
            setProductCart(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className={productCart.length > 3 ? "pt-24 h-max" : "pt-24 h-screen"}>

                {/* grid */}
                <div className="grid grid-cols-12">
                    {/* Card Start */}
                    <div className="col-start-3 col-end-9 mr-3">
                        {
                            productCart.map((value, index) => {
                                return (
                                    <div className=' border my-3 rounded-sm'>
                                        <div className="border-b-2">
                                            {/* Content Start */}
                                            <div className="flex justify-between p-3 h-[100px]">
                                                <div className="flex items-center w-full">
                                                    <div className="flex justify-center w-[60px]">
                                                        <img src={require(`../../Assets/${value.product.product_images[0].img}`)} alt="...." />
                                                    </div>
                                                    <div className='text-sm'>
                                                        <div className='font-semibold text-neutral-600'>
                                                            {value.product.name}, {value.product_detail.memory_storage} GB, {value.product_detail.color}
                                                        </div>
                                                        <div className="font-bold">
                                                            Price : Rp. {value.product_detail.price.toLocaleString()}
                                                        </div>
                                                        <div className="pt-3">
                                                            Subtotal : Rp {(value.product_detail.price * value.qty).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end ">
                                                    <div className="border w-8 h-8 text-xs flex justify-center items-center bg-slate-200 border-neutral-300 rounded-sm">
                                                        {value.qty}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='pl-5 py-3 text-sm text-gray-400 hover:text-gray-800'>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Card End */}

                    <div className="col-start-9 col-end-11 relative">
                        <div className="px-5 sticky">
                            <div className="font-bold py-4 border-b-2">
                                Summary
                            </div>
                            <div className="py-4 flex justify-between">
                                Total <span className="font-bold">Rp. 45.000.000</span>
                            </div>
                            <button className="bg-neutral-900 text-white w-full py-1 rounded-sm">
                                BUY
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}