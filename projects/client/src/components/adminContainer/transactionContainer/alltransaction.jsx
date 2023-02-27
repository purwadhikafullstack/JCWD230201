import { useState, useEffect } from 'react'
import axios from 'axios'
import { BsClock, BsFillChatDotsFill } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'
import iPhone_14_1 from '../../../Assets/iPhone_14_1.jpg'

import Loading from '../../loading/loading'

export default function AllTransaction() {

    let [dataTR, setDataTR] = useState([]), [totalPrice, setTotalPrice] = useState(0)

    let [shotgunStatus, setShotgunStatus] = useState([
        'bg-yellow-100 text-yellow-400 text-sm font-bold p-1',
        'bg-orange-100 text-orange-400 text-sm font-bold p-1',
        'bg-purple-200 text-purple-600 text-sm font-bold p-1',
        'bg-blue-100 text-blue-600 text-sm font-bold p-1',
        'bg-lime-400 bg-opacity-30 text-green-600 text-sm font-bold p-1',
        'bg-red-200 text-red-600 text-sm font-bold p-1'

    ])

    let getAllTr = async () => {
        let response = await axios.get('http://localhost:8000/transaction/getAllTransaction')
        setDataTR(response.data.data)

        let loaderPrice = []
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
            let TP = 0
            TP += response.data.data[i].ongkir
            response.data.data[i].transaction_details.forEach((item) => {
                TP += (item.qty * item.price)
            })
            loaderPrice.push(TP)
        }
        console.log(loaderPrice)
        setTotalPrice(loaderPrice)

    }

    useEffect(() => {
        getAllTr()
    }, [])

    return (
        dataTR ?
            <div className="py-5 px-12">
                <div className="text-3xl font-semibold mb-10">
                    Transactions
                </div>
                <div className='flex gap-7 items-center'>
                    <div className="relative w-1/4 opacity-70">
                        <input className="block p-1.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Product Name" />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-black rounded-r-lg borderhover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <div className='flex'>
                        transaction per page
                    </div>
                </div>

                <div className='h-full flex flex-col gap-7 mt-5'>
                    {
                        dataTR.map((item, index) => {
                            return (
                                <div className='flex flex-col border border-slate-200 shadow-xl'>
                                    <div className='flex font-semibold gap-3 p-3'>
                                        <div className='font-semibold'>
                                            {item.id}
                                        </div>

                                        <div className={`${shotgunStatus[item.order_status_id-1]}`}>
                                            {item.order_status.status}
                                        </div>

                                        <div className='flex items-center opacity-50 gap-3'>
                                            <BsClock />
                                            {item.updatedAt}
                                        </div>
                                    </div>

                                    <div className='ml-4 text-sm font-bold'>
                                        WH-{item.location_warehouse.city}
                                    </div>
                                    <div className='flex px-5 justify-between'>
                                        <div className='w-4/5 flex flex-col'>
                                            {
                                                item.transaction_details.map((item, index) => {
                                                    return (
                                                        <div className='flex'>
                                                            <img src={require(`../../../Assets/${item.product_img}`)} className='w-20 h-20 object-contain' alt="" />
                                                            <div className='mt-4 font-bold flex flex-col items-start'>
                                                                <button>
                                                                    {item.product_name}
                                                                </button>
                                                                <div className='text-sm opacity-60 font-medium'>
                                                                    {item.qty} item x Rp. {(item.price).toLocaleString()}
                                                                </div>


                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>

                                        <div className='w-1/5 flex'>
                                            <div className='border'></div>
                                            <div className='flex flex-col w-full h-full items-center justify-center text-lg font-bold'>
                                                <div className='text-sm font-medium opacity-60'>Total Shopping</div>
                                                <div>RP. {(totalPrice[index]).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-8 p-5 text-green-500'>
                                        <button className='flex items-center gap-2'>
                                            <BsFillChatDotsFill />
                                            Chat with Buyer
                                        </button>

                                        <button className='flex gap-2 items-center'>
                                            <MdOutlineDescription />
                                            Transaction Description
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            :
            <Loading />
    )
}