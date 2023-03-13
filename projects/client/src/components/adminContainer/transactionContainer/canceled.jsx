import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { BsClock, BsFillChatDotsFill } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'
import noData from '../../../Assets/data_not_found2.jpg'
import { TransactionData } from '../../../data/transactionAdmin'
import { userData } from '../../../data/userData'

import Loading from '../../loading/loading'

export default function Canceled() {
    const { transaction, setTransaction } = useContext(TransactionData)
    const { user, setUser } = useContext(userData)
    console.log(user)

    let [select, setSelect] = useState(null), [toogle, setToogle] = useState(false), [dataFilter, setDataFilter] = useState([])
    let [dataTR, setDataTR] = useState([]), [totalPrice, setTotalPrice] = useState(0), [date, setDate] = useState([])

    let shotgunStatus = [
        'bg-yellow-100 text-yellow-400 text-sm font-bold p-1',
        'bg-orange-100 text-orange-400 text-sm font-bold p-1',
        'bg-purple-200 text-purple-600 text-sm font-bold p-1',
        'bg-blue-100 text-blue-600 text-sm font-bold p-1',
        'bg-lime-400 bg-opacity-30 text-green-600 text-sm font-bold p-1',
        'bg-red-200 text-red-600 text-sm font-bold p-1'
    ]

    let option = [
        'Filter',
        'Warehouse'
    ]

    let filter = async (input) => {
        if (input == "Filter") return setDataFilter([])
        if (input == "Warehouse") {
            setSelect(input)
            let response = await axios.post('http://localhost:8000/transaction/filter', { data: input })

            setDataFilter(response.data.data)
        }
    }

    let searchFilter = async (input) => {
        if (input == "All Transaction") return getAllTr()
        let response = await axios.post('http://localhost:8000/transaction/FWarehouse', { warehouse_city: input, order_status_id:6 })
        setDataTR(response.data.data)
    }


    let getAllTr = async () => {
        let response = await axios.post('http://localhost:8000/transaction/getAllTransaction', user.warehouse ? { warehouse: user.warehouse, order_status_id:1 } : {order_status_id:6})
        setDataTR(response.data.data)

        let loaderPrice = [], loaderDate = []
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
            let TP = 0
            // loaderDate.push(new Date(response.data.data[i].updatedAt).toGMTString().replace('GMT', 'WIB'))
            loaderDate.push(response.data.data[i].updatedAt.split('T')[0])
            TP += response.data.data[i].ongkir
            response.data.data[i].transaction_details.forEach((item) => {
                TP += (item.qty * item.price)
            })
            loaderPrice.push(TP)
        }
        // console.log(loaderPrice)
        setTotalPrice(loaderPrice)
        setDate(loaderDate)
    }

    let description = (index, type) => {
        setTransaction(dataTR[index])
    }

    useEffect(() => {
        getAllTr()
        setDataFilter([])
    }, [])

    return (
    
        dataTR ?
            <div className="p-5">
                <div className="text-3xl font-semibold mb-10">
                    Transactions
                </div>
                {
                    !user.warehouse ?
                        <div>
                            <div className='flex justify-end gap-3 '>
                                {
                                    dataFilter.length > 0 ?
                                        <div>
                                            <select onChange={(e) => searchFilter(e.target.value)} className="border-gray-300 shadow-sm rounded-md" placeholder="Select Warehouse">
                                                <option value="All Transaction">All Transaction</option>
                                                {
                                                    dataFilter.map((item, index) => {
                                                        return (
                                                            <option value={item.city}>{item.city}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div> : null
                                }
                                <div className="relative">

                                    <select onChange={(e) => filter(e.target.value)}
                                        className="rounded-md border border-gray-300 shadow-sm" placeholder="Filter"
                                    >
                                        {
                                            option.map((item, index) => {
                                                return (
                                                    <option value={item} >{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>

                            <div className='flex justify-start items-center mt-5'>
                                <div className='flex'>
                                    transaction per page
                                </div>

                            </div>
                        </div>
                        :
                        null
                }


                <div className='h-full flex flex-col gap-7 mt-5'>
                    {
                        dataTR.length > 0 ?
                            dataTR.map((item, index) => {
                                return (
                                    <div className='flex flex-col rounded-md border border-slate-200 shadow-sm z-0'>
                                        <div className='flex font-semibold gap-3 p-3'>
                                            <div className='flex w-1/2 gap-3'>
                                                <div className='font-semibold'>
                                                    {item.id}
                                                </div>

                                                <div className={`${shotgunStatus[item.order_status_id - 1]}`}>
                                                    {item.order_status.status}
                                                </div>

                                                <div className='flex items-center opacity-50 gap-3'>
                                                    <BsClock />
                                                    {(date[index])}
                                                </div>
                                            </div>

                                            <div className='flex w-1/2 justify-end items-center gap-3'>
                                                <div className='opacity-60 text-sm font-medium'>
                                                    Deliver from :
                                                </div>
                                                WH-{item.location_warehouse.city}
                                            </div>
                                        </div>

                                        <div className='flex px-5 justify-between'>
                                            <div className='w-4/5 flex flex-col'>
                                                <div className='flex'>
                                                    <img src={require(`../../../Assets/${item.transaction_details[0].product_img}`)} className='w-20 h-20 object-contain' alt="" />
                                                    <div className='mt-4 font-bold flex flex-col items-start'>
                                                        <button>
                                                            {item.transaction_details[0].product_name}
                                                        </button>
                                                        <div className='text-sm opacity-60 font-medium'>
                                                            {item.transaction_details[0].qty} item x Rp. {(item.transaction_details[0].price).toLocaleString()}
                                                        </div>
                                                        {
                                                            (item.transaction_details.length - 1) == 0 ?
                                                                null
                                                                :
                                                                <div className='text-sm opacity-60 font-medium'>
                                                                    ({item.transaction_details.length - 1} products more..)
                                                                </div>
                                                        }

                                                    </div>
                                                </div>
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

                                            <button onClick={() => description(index)} className='flex gap-2 items-center'>
                                                <MdOutlineDescription />
                                                Transaction Description
                                            </button>
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
            </div>
            :
            <Loading />
    )
}