import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TransactionData } from '../../data/transactionAdmin'
import { userData } from '../../data/userData'
import noData from '../../Assets/data_not_found2.jpg'
import React from 'react';
import Moment from 'react-moment';
import { BsClock, BsFillChatDotsFill } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../loading/loading'

export default function TransactionXYZ() {
    const { transaction, setTransaction } = useContext(TransactionData)
    const { user, setUser } = useContext(userData)

    let [pickWH, setPickWH] = useState(0), [pickStatus, setPickStatus] = useState(0)
    let [select, setSelect] = useState(null), [dataFilter, setDataFilter] = useState([]), [page, setPage] = useState(0)
    let [dataTR, setDataTR] = useState([]), [totalPrice, setTotalPrice] = useState(0), [loadDate, setLoadDate] = useState([])

    const [date, setDate] = useState({
        from: "",
        to: "",
    });
    const [selectedDate, setSelectedDate] = useState({
        from: "",
        to: "",
    });
    let [shotgun, setShotgun] = useState([
        'Transaction', 'Payment', 'Confirmation', 'Processing', 'Shipped', 'Done', 'Canceled'
    ])


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
        let response = await axios.post('http://localhost:8000/transaction/FWarehouse', { warehouse_city: input })
        setDataTR(response.data.data)

        let loaderPrice = [], loaderDate = []
        for (let i = 0; i < response.data.data.length; i++) {
            let TP = 0
            // loaderDate.push(new Date(response.data.data[i].updatedAt).toGMTString().replace('GMT', 'WIB'))
            loaderDate.push(response.data.data[i].updatedAt.split('T')[0])
            TP += response.data.data[i].ongkir
            response.data.data[i].transaction_details.forEach((item) => {
                TP += (item.qty * item.price)
            })
            loaderPrice.push(TP)

            setTotalPrice(loaderPrice)
            setLoadDate(loaderDate)
        }
    }

    let getAllTr = async () => {
        setPickWH(user.warehouse_id ? user.warehouse_id : 0)
        let response = await axios.post('http://localhost:8000/transaction/getAllTransaction', user.warehouse_id ? { warehouse: user.warehouse_id, order_status_id: 0 } : { order_status_id: 0 })
        setDataTR(response.data.data)

        let loaderPrice = [], loaderDate = []
        for (let i = 0; i < response.data.data.length; i++) {
            let TP = 0
            // loaderDate.push(new Date(response.data.data[i].updatedAt).toGMTString().replace('GMT', 'WIB'))
            loaderDate.push(response.data.data[i].createdAt.split('T')[0])
            TP += response.data.data[i].ongkir
            response.data.data[i].transaction_details.forEach((item) => {
                TP += (item.qty * item.price)
            })
            loaderPrice.push(TP)
        }
        setTotalPrice(loaderPrice)
        setLoadDate(loaderDate)
    }

    let getTr = async (wh, status, from, to) => {
        try {
            setPickWH(wh)
            setPickStatus(status)
            var response = await axios.post('http://localhost:8000/transaction/getAllTransaction', { warehouse: wh, order_status_id: status, from: from ? from.toISOString().split("T")[0] : null, to: to ? to.toISOString().split("T")[0] : null })
            console.log(response.data.data)
            setDataTR(response.data.data)

            let loaderPrice = [], loaderDate = []
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
            setTotalPrice(loaderPrice)
            setLoadDate(loaderDate)
        } catch (error) {
            setDataTR([])
        }
    }

    let description = (index, type) => {
        setTransaction(dataTR[index])
    }

    useEffect(() => {
        getAllTr()
    }, [])
    return (

        dataTR ?
            <div className="p-5">
                <div className="text-2xl font-bold">
                    Transaction
                </div>
                <div className='text-gray-500 font-semibold mb-6'>
                    {dataTR.length} transactions found
                </div>
                <div>

                </div>
                <div>
                    <div className='flex justify-between gap-3 '>
                        <div className='flex gap-5 items-center'>
                            <DatePicker
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                scrollableYearDropdown={true}
                                selected={selectedDate.from === "" ? null : selectedDate.from}
                                className="bg-gray-100 border w-fit border-gray-100 text-gray-900 text-xs rounded-md"
                                onChange={(date) => {
                                    setDate({ ...date, from: date.toISOString().split("T")[0] });
                                    setSelectedDate({ ...selectedDate, from: date });
                                    getTr(pickWH, pickStatus, date, selectedDate.to)
                                }}
                            />
                            to
                            <DatePicker
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                scrollableYearDropdown={true}
                                selected={selectedDate.to === "" ? null : selectedDate.to}
                                className="bg-gray-100 border w-fit border-gray-100 text-gray-900 text-xs rounded-md"
                                onChange={(date) => {
                                    setDate({ ...date, to: date.toISOString().split("T")[0] });
                                    setSelectedDate({ ...selectedDate, to: date });
                                    getTr(pickWH, pickStatus, selectedDate.from, date)
                                }}
                            />
                        </div>
                        <div className='flex gap-3'>
                            {
                                dataFilter.length > 0 ?
                                    <div>
                                        <select onChange={(e) => getTr(e.target.value, pickStatus, selectedDate.from, selectedDate.to)} className="border-gray-200 focus:ring-0 focus:border-border-200 focus:outline-none rounded-md" placeholder="Select Warehouse">
                                            <option value="All Transaction">All Transaction</option>
                                            {
                                                dataFilter.map((item, index) => {
                                                    return (
                                                        <option value={item.id}>{item.city}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div> : null
                            }
                            {
                                !user.warehouse ?
                                    <div className="relative">

                                        <select onChange={(e) => filter(e.target.value)}
                                            className="rounded-md border border-gray-200 focus:ring-0 focus:border-gray-200 focus:outline-none" placeholder="Filter"
                                        >
                                            {
                                                option.map((item, index) => {
                                                    return (
                                                        <option value={item} >{item}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div> : null
                            }

                        </div>

                    </div>

                    <div className='flex justify-start items-center mt-5'>
                        <div className='flex gap-5 ml-5'>
                            {
                                shotgun.map((item, index) => {
                                    return (
                                        <button
                                            disabled={page == index ? true : false}
                                            onClick={() => {
                                                setPage(index)
                                                getTr(pickWH, index)
                                            }} className={`font-semibold relative hover:text-black ${page == index ? 'underline-offset-4 underline text-black' : 'text-gray-300'}  `}>
                                            {item}
                                            {/* {
                                                index==1 || index==4?
                                                <div className='absolute w-4 -top-1.5 text-xs -right-3 rounded-full bg-green-700 text-white'>
                                                1
                                            </div>:null
                                            } */}

                                        </button>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>


                <div className='h-full flex flex-col gap-7 mt-5'>
                    {
                        dataTR.length > 0 ?
                            dataTR.map((item, index) => {
                                return (
                                    <div className='flex flex-col rounded-md border border-slate-200 shadow-sm z-0'>
                                        <div className='flex font-semibold gap-3 p-3'>
                                            <div className='flex w-3/4 gap-3'>
                                                <div className='font-semibold'>
                                                    {item.id}
                                                </div>

                                                <div className={`${shotgunStatus[item.order_status_id - 1]} px-2 rounded-xl py-1`}>
                                                    {item.order_status.status}
                                                </div>


                                                <div className='flex items-center text-gray-500 opacity-70 text-sm gap-2'>
                                                    <BsClock size={'12px'} />

                                                    <Moment format="DD MMMM YYYY">
                                                        {(loadDate[index])}
                                                    </Moment>

                                                </div>
                                                {
                                                    page == 1 || page == 2 ?
                                                        Date.now() < item.expired ?
                                                            <div className='flex gap-3'>
                                                                expired at
                                                                <Moment date={item.exprired}
                                                                    durationFromNow
                                                                    interval={1000}
                                                                />
                                                            </div>
                                                            : null
                                                        : null
                                                }
                                            </div>

                                            <div className='flex w-1/4 justify-start items-center gap-3'>
                                                <div className='opacity-60 text-sm font-medium'>
                                                    Deliver from :
                                                </div>
                                                WH-{item.location_warehouse.city}
                                            </div>
                                        </div>

                                        <div className='flex px-5 justify-between'>
                                            <div className='w-4/5 flex flex-col'>
                                                <div className='flex'>
                                                    <img src={require(`../../Assets/${item.transaction_details[0].product_img}`)} className='w-20 h-20 object-contain' alt="" />
                                                    {/* <img src={`http://localhost:8000/Public/images/${item.transaction_details[0].product_img}`} className='w-20 h-20 object-contain' alt="" /> */}
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