import { useEffect, useState } from 'react'
import { Label } from "flowbite-react"
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


//component
import Summary from './salesContainer/summary'
import Category from './salesContainer/category'

export default function SalesReport() {
    // let date = new Date
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
        'total': 0,
        'ongkir': 0,
        'discount': 0,
        'transaction': 0,
        'qty': 0,
        'category': []
    })

    let depault = async () => {
        try {
            toast('Welcome to sales report Sir!', {
                style: {
                    background: 'black',
                    color: 'white'
                }
            })
            let response = await axios.get(`http://localhost:8000/transaction/getSales?start=${pickY}-01-01&end=${pickY + 1}-01-01&type=${pickT}&WH=${pickWH}`)
            let total_price = 0, total_ongkir = 0, total_discount = 0

            response.data.data.forEach((item, index) => {
                total_ongkir += item.ongkir
                item.transaction_details.forEach((item) => total_price += item.price)
            })
            // console.log(total_price)
            setVisible({ ...visible, total: total_price, ongkir: total_ongkir })
            // console.log(total_ongkir)
            // console.log(tank)
        } catch (error) {
            console.log(error)
        }
    }

    let getSales = async (Y, M, T, WH) => {
        setPickT(T)
        try {
            // console.log(M)
            if (!M && !WH) {
                var response = await axios.get(`http://localhost:8000/transaction/getSales?start=${Y}-01-01&end=${parseInt(Y) + 1}-01-01&type=${T}&WH=${pickWH}`)


            } else if (M && !WH) {
                if (M.split(',')[0] == 12) {
                    var response = await axios.get(`http://localhost:8000/transaction/getSales?start=${Y}-${M.split(',')[0]}-01&end=${parseInt(Y) + 1}-01-01&type=${T}&WH=${pickWH}`)
                } else {
                    var response = await axios.get(`http://localhost:8000/transaction/getSales?start=${Y}-${M.split(',')[0]}-01&end=${Y}-${parseInt(M) + 1}-01&type=${T}&WH=${pickWH}`)
                }

            }
            setPickY(Y)
            setPickM(M)


            if (T==1) {
                let total_price = 0, total_ongkir = 0, total_discount = 0, total_product = 0, total_transaction = response.data.data.length
                response.data.data.forEach((item, index) => {
                    total_ongkir += item.ongkir
                    item.transaction_details.forEach((item) => {
                        total_price += item.price
                        total_product += item.qty
                    })
                })
                // console.log(total_price)
                setVisible({ ...visible, total: total_price, ongkir: total_ongkir, transaction: total_transaction, qty: total_product })
                // console.log(total_ongkir)
            } else if (T == 2) {
                // console.log('masuk')
                let price = 0
                let loader = [], loader2=[]
                response.data.data.forEach((item,index)=>{
                        item.transaction_details.forEach((item)=> price+=item.price)
                        loader2 = item.products
                        loader.push({'category':item.name, 'totalC':price, 'product':loader2})
                        price=0
                        loader2=[]
                       
                })
                setVisible({ ...visible, category: loader })
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
        <div className="min-h-screen px-10 pt-5 pb-96">

            <div className="flex flex-col mt-2 mb-10 ">
                <div className='flex flex-col w-full justify-center mb-5 '>
                    <div className='text-3xl font-semibold text-center '>
                        Sales Report
                    </div>
                    <div className='text-gray-500 font-semibold my-2 text-center'>
                        in {pickM ? pickM.split(',')[1] : null} {pickY}
                    </div>
                </div>

                <div className='flex gap-5'>
                    <div className='sm:min-w-fit'>
                        <div className="mb-2 block ">
                            <Label
                                value="Period"
                            />
                        </div >
                        <select className='w-full font-semibold text-gray-600 p-1 rounded-sm border border-black focus:ring-transparent focus:border-black'
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
                        <select className='w-full font-semibold text-gray-600 p-1 rounded-sm border border-black focus:ring-transparent focus:border-black'
                            onChange={(e) => getSales(pickY, e.target.value, 1, null)}
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
                        <select className='w-full font-semibold text-gray-600 p-1 rounded-sm border border-black focus:ring-transparent focus:border-black'
                            onChange={(e) => {
                                getSales(e.target.value, null, 1, null)
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
            </div>

            <div className='flex gap-4 mt-10'>
                <button onClick={() => getSales(pickY, pickM, 1, pickWH)} disabled={pickT == 1 ? true : false} className={`font-semibold ${pickT == 1 ? `scale-110 underline-offset-4 underline` : `hover:underline hover:underline-offset-4 transition duration-150 ease-in-out hover:scale-110 hover:bg-slate-200`}  px-2 `}>
                    Summary
                </button>
                <button onClick={() => getSales(pickY, pickM, 2, pickWH)} disabled={pickT == 2 ? true : false} className={`font-semibold ${pickT == 2 ? `scale-110 underline-offset-4 underline` : `hover:underline hover:underline-offset-4 transition duration-150 ease-in-out hover:scale-110 hover:bg-slate-200`}  px-2 `}>
                    Product Category
                </button>
                <button onClick={() => setPickT(3)} disabled={pickT == 3 ? true : false} className={`font-semibold ${pickT == 3 ? `scale-110 underline-offset-4 underline` : `hover:underline hover:underline-offset-4 transition duration-150 ease-in-out hover:scale-110 hover:bg-slate-200`}  px-2 `}>
                    Products
                </button>
            </div>

            <div className='flex flex-col items-center h-full mt-4 border-t border-slate-200 shadow-md py-6 px-5'>
                <Outlet />
                {
                    pickT == 1 ?
                        <Summary data={visible} />
                        :
                        pickT == 2 ?
                            <Category data={visible} />
                            : null
                }
            </div>
            <Toaster />
        </div>
    )
}