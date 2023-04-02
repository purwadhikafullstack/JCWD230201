import { useEffect, useState, useContext } from 'react'
import { Label } from "flowbite-react"
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FiUserPlus, FiUserX, FiShoppingBag } from 'react-icons/fi'
import { TbHome2 } from 'react-icons/tb'
import { AiOutlineStock } from 'react-icons/ai'
import { userData } from '../../data/userData'
import Loading from '../loading/loading'
import React from 'react';
import Moment from 'react-moment';


//component
import Summary from './salesContainer/summary'
import SalesProduct from './salesContainer/product'
import Category from './salesContainer/category'

export default function SalesReport() {
    let { user } = useContext(userData)
    console.log(user)
    let [sekarang, setSekarang] = useState('')
    // let yir = date.getFullYear()
    let [year, setYear] = useState([
        // yir, yir - 1, yir - 2, yir - 3
        2023, 2022, 2021, 2020
    ])
    let [pickM, setPickM] = useState(''), [pickY, setPickY] = useState(year[0]), [pickWH, setPickWH] = useState(0), [pickT, setPickT] = useState(1)


    let [month, setMonth] = useState([
        { 'month_id': 1, 'month': 'January' },
        { 'month_id': 2, 'month': 'February' },
        { 'month_id': 3, 'month': 'March' },
        { 'month_id': 4, 'month': 'April' },
        { 'month_id': 5, 'month': 'May' },
        { 'month_id': 6, 'month': 'June' },
        { 'month_id': 7, 'month': 'July' },
        { 'month_id': 8, 'month': 'August' },
        { 'month_id': 9, 'month': 'September' },
        { 'month_id': 10, 'month': 'October' },
        { 'month_id': 11, 'month': 'November' },
        { 'month_id': 12, 'month': 'December' }
    ])

    let [visible, setVisible] = useState({
        'month': false,
        'users': 0,
        'usersUV': 0,
        'WH': 0,
        'list_wh': [],
        'trans_s': 0,
        'trans_c': 0,
        'balances': 13823924682,
        'total': 0,
        'ongkir': 0,
        'discount': 0,
        'transaction': 0,
        'qty': 0,
        'category': [],
        'total_qty': 0
    })

    let depault = async () => {
        console.log(user.warehouse_id)
        setPickWH(user.warehouse_id?user.warehouse.id:0)
        try {
            toast('Welcome to sales report Sir!', {
                style: {
                    background: 'black',
                    color: 'white'
                }
            })
            let response = await axios.get(`http://localhost:8000/transaction/getSales?start=${pickY}-01-01&end=${parseInt(pickY) + 1}-01-01&type=${pickT}&WH=${user.warehouse_id?user.warehouse_id:0}`)
            let total_price = 0, total_tr = 0, total_ongkir = 0, total_discount = 0
            console.log(response)
            response.data.data.forEach((item, index) => {
                total_ongkir += item.ongkir
                item.transaction_details.forEach((item) => {
                    total_price += (item.price * item.qty)
                    total_tr += item.qty
                })
            })
            // console.log(total_price)
            let date = new Date()

            setSekarang(date.toJSON())

            setVisible({
                ...visible, list_wh: response.data.list_wh, total: total_price, ongkir: total_ongkir, WH: response.data.wh,
                users: response.data.users, usersUV: response.data.userUV, trans_s: response.data.tr_success,
                trans_c: response.data.tr_cancel, transaction: response.data.data.length, qty: total_tr
            })
            // console.log(total_ongkir)
            // console.log(tank)
        } catch (error) {
            console.log(error)
        }
    }

    let getSales = async (Y, M, T, WH) => {
        setPickWH(WH)
        setPickT(T)
        try {
            // console.log(M)
            if (!M) {
                var response = await axios.get(`http://localhost:8000/transaction/getSales?start=${Y}-01-01&end=${parseInt(Y) + 1}-01-01&type=${T}&WH=${WH}`)


            } else if (M) {
                if (M.split(',')[0] == 12) {
                    var response = await axios.get(`http://localhost:8000/transaction/getSales?start=${Y}-${M.split(',')[0]}-01&end=${parseInt(Y) + 1}-01-01&type=${T}&WH=${WH}`)
                } else {
                    var response = await axios.get(`http://localhost:8000/transaction/getSales?start=${Y}-${M.split(',')[0]}-01&end=${Y}-${parseInt(M) + 1}-01&type=${T}&WH=${WH}`)
                }

            }
            setPickY(Y)
            setPickM(M)

            if (T == 1) {
                let total_price = 0, total_ongkir = 0, total_discount = 0, total_product = 0, total_transaction = response.data.data.length
                response.data.data.forEach((item, index) => {
                    total_ongkir += item.ongkir
                    item.transaction_details.forEach((item) => {
                        total_price += (item.price * item.qty)
                        total_product += item.qty
                    })
                })
                // console.log(response)
                setVisible({ ...visible, total: total_price, ongkir: total_ongkir, transaction: total_transaction, qty: total_product })
                // console.log(total_ongkir)
            } else if (T == 2) {
                // console.log('masuk')
                let price = 0
                let loader = [], items = 0, total_items = 0, price_product = 0
                response.data.data.forEach((item, index) => {
                    item.transaction_details.forEach((item) => {
                        price += item.price * item.qty
                        items += item.qty
                    })
                    total_items += items
                    loader.push({ 'category': item.name, 'totalC': price, 'qty': items })
                    price = 0
                    items = 0
                })

                setVisible({ ...visible, category: loader, total_qty: total_items })
                total_items = 0
            } else if (T == 3) {
                setVisible({ ...visible, category: response.data.data })
            }
            console.log(response)
            toast.success(`Get Sales data Success!`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        depault()
    }, [])


    return (
        visible.list_wh ?
            <div className="min-h-screen px-10 pt-5 pb-10">

                <div className="flex flex-col mt-2 mb-10 ">
                    <div className='text-2xl font-semibold'>
                        Summary Records
                    </div>
                    <Moment className='text-gray-500 text-sm mb-8'
                    format='dddd DD MMMM YYYY'
                    >
                        {sekarang}
                    </Moment>
                    <div className='flex justify-between mb-5 text-white '>
                        <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex rounded-md border-b-4 border-yellow-300 group'>
                            <div className='flex items-center justify-center px-3.5 text-center rounded-full bg-white group-hover:rotate-12 group-hover:duration-200'>
                                <FiUserPlus color='black' size={'24px'} />
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xl font-semibold'>{visible.users}</p> <p>Users</p>
                                </div>

                                <div className='flex items-center text-sm gap-1 text-slate-400 '>
                                    {visible.usersUV?visible.usersUV:'0'}  <FiUserX />
                                </div>
                            </div>
                        </div>
                        <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex border-b-4 border-lime-300 rounded-md group'>
                            <div className='flex items-center justify-center px-3.5 text-center rounded-full bg-white group-hover:rotate-12 group-hover:duration-200'>
                                <FiShoppingBag color='black' size={'24px'} />
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xl font-semibold'>{visible.trans_s?visible.trans_s:0}</p> <p>Orders</p>
                                </div>

                                <div className='flex text-slate-400 items-center text-sm gap-1'>
                                    {visible.trans_c} canceled
                                </div>
                            </div>
                        </div>
                        <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex border-b-4 border-violet-500 rounded-md group'>
                            <div className='flex items-center justify-center px-3.5 text-center rounded-full bg-white group-hover:rotate-12 group-hover:duration-200'>
                                <TbHome2 color='black' size={'24px'} />
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xl font-semibold'>{visible.WH}</p> <p>Warehouses</p>
                                </div>

                                <div className='flex text-slate-400 items-center text-sm gap-1'>
                                    and Admins
                                </div>
                            </div>
                        </div>
                        <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex border-b-4 border-slate-400 rounded-md group'>
                            <div className='flex items-center justify-center px-3.5 text-center rounded-full bg-white group-hover:rotate-12 group-hover:duration-200'>
                                <AiOutlineStock color='black' size={'24px'} />
                            </div>
                            <div className='flex flex-col items-end'>
                                <p className='text-xl font-semibold'>Rp. {(visible.balances).toLocaleString()}</p>
                                <div className='flex text-white items-center text-sm gap-1'>
                                    Balances
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex gap-5'>
                            <div className='sm:min-w-fit'>
                                <div className="mb-2 block ">
                                    <Label
                                        value="Period"
                                    />
                                </div >
                                <select className='w-full text-gray-600 p-1 rounded-sm border border-[#DBDBDB] focus:ring-transparent focus:border-black'
                                    onChange={(e) => e.target.value == '2' ? setVisible({ ...visible, month: true }) : setVisible({ ...visible, month: false })}
                                    id="periode"
                                    required={true}
                                >
                                    <option value="1">Yearly</option>
                                    <option value="2">Monthly</option>


                                </select>
                            </div>
                            <div className={`sm:min-w-fit ${visible.month ? 'block' : 'hidden'}`}>
                                <div className="mb-2 block sm:min-w-fit">
                                    <Label
                                        value="Month"
                                    />
                                </div >
                                <select className='w-full text-gray-600 p-1 rounded-sm border border-[#DBDBDB] focus:ring-transparent focus:border-black'
                                    onChange={(e) => getSales(pickY, e.target.value, pickT, pickWH)}
                                    id="bulan"
                                    required={true}
                                >
                                    <option value={''}>All Month</option>
                                    {
                                        month.map((item, index) => {
                                            return (
                                                <option value={`${item.month_id},${item.month}`}>{item.month}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='sm:min-w-fit'>
                                <div className="mb-2">
                                    <Label
                                        value="Year"
                                    />
                                </div >
                                <select className='w-full text-gray-600 p-1 rounded-sm border border-black focus:ring-transparent focus:border-black'
                                    onChange={(e) => {
                                        getSales(e.target.value, pickM, pickT, pickWH)
                                    }}
                                    id="tahun"
                                    required={true}
                                >
                                    {
                                        year.map((item, index) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>

                        {
                            user.warehouse_id>0? 
                            <p className='text-xl flex items-end'>Sales Reports : Warehouse {user.warehouse}</p> : <div className='sm:min-w-fit'>
                                <div className="mb-2">
                                    <Label
                                        value="Warehouse List :"
                                    />
                                </div >
                                <select className='w-full text-gray-600 px-3 py-1 border rounded-md border-[#DBDBDB] focus:ring-transparent focus:border-black'
                                    onChange={(e) => {
                                        getSales(pickY, pickM, pickT, e.target.value)
                                    }}
                                    id="warehouse"
                                    required={true}
                                >
                                    <option value="0">All Warehouse</option>
                                    {
                                        visible.list_wh.map((item, index) => {
                                            return (
                                                <option value={item.id}>{item.city}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        }

                    </div>
                </div>

                <div className='border-y-4 border-yellow-300 rounded-md px-12 py-7 bg-stone-800 text-slate-200'>

                    <div className='flex gap-4'>
                        <button onClick={() => getSales(pickY, pickM, 1, pickWH)} disabled={pickT == 1 ? true : false} className={`font-semibold ${pickT == 1 ? `scale-110 underline-offset-4 underline` : `hover:underline hover:underline-offset-4 transition duration-150 ease-in-out hover:scale-110 hover:bg-stone-700`}  px-2 `}>
                            Summary
                        </button>
                        <button onClick={() => {
                            setVisible({ ...visible, category: [] })
                            getSales(pickY, pickM, 2, pickWH)
                        }} disabled={pickT == 2 ? true : false} className={`font-semibold ${pickT == 2 ? `scale-110 underline-offset-4 underline` : `hover:underline hover:underline-offset-4 transition duration-150 ease-in-out hover:scale-110 hover:bg-stone-700`}  px-2 `}>
                            Product Category
                        </button>
                        <button onClick={() => {
                            setVisible({ ...visible, category: [] })
                            getSales(pickY, pickM, 3, pickWH)
                        }} disabled={pickT == 3 ? true : false} className={`font-semibold ${pickT == 3 ? `scale-110 underline-offset-4 underline` : `hover:underline hover:underline-offset-4 transition duration-150 ease-in-out hover:scale-110 hover:bg-stone-700`}  px-2 `}>
                            Products
                        </button>
                    </div>

                    <div className='h-full mt-6'>
                        <Outlet />
                        {
                            pickT == 1 ?
                                <Summary data={visible} />
                                :
                                pickT == 2 ?
                                    <Category data={visible} />
                                    : pickT == 3 ?
                                        <SalesProduct data={visible} />
                                        : null
                        }
                    </div>
                </div>

                <Toaster />
            </div>
            :
            <Loading />
    )
}