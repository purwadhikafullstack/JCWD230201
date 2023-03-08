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

    let [filtah, setFiltah] = useState('summary'), [by, setBy] = useState('all')

    let [year, setYear] = useState([
        // yir, yir - 1, yir - 2, yir - 3
        2023, 2022, 2021, 2020
    ])
    let [pickM, setPickM] = useState(''), [pickY, setPickY] = useState(year[0]), [data, setData] = useState([])


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
        'discount': 0
    })

    let tahunan = async () => {
        try {
            toast('Welcome to sales report Sir!', {
                style: {
                    background: 'black',
                    color: 'white'
                }
            })
            let response = await axios.post('http://localhost:8000/transaction/getAllTransaction', { start: `${pickY}-01-01`, end: `${pickY}-12-31` })
            setData(response.data.data)
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

    let tahunan2 = async (input) => {
        try {

            setPickY(input)
            let response = await axios.post('http://localhost:8000/transaction/getAllTransaction', { start: `${input}-01-01`, end: `${input}-12-31` })
            setData(response.data.data)
            let total_price = 0, total_ongkir = 0, total_discount = 0

            response.data.data.forEach((item, index) => {
                total_ongkir += item.ongkir
                item.transaction_details.forEach((item) => total_price += item.price)
            })
            console.log(total_price)
            setVisible({ ...visible, total: total_price, ongkir: total_ongkir })
            console.log(total_ongkir)
            toast.success(`Get Sales data Success!`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        tahunan()
    }, [])


    return (
        <div className="min-h-screen px-10 pt-8 pb-96">
           <div className='text-3xl font-semibold text-center '>
                    Sales Report
                </div>
                <div className='text-gray-500 font-semibold my-5 text-center'>
                    in {pickM ? pickM : null} {pickY}
                </div>
            <div className="flex mt-8 mb-5 justify-between">
                <div className='flex w-1/2 gap-5'>
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
                            onChange={(e) => setPickM(e.target.value)}
                            id="bulan"
                            required={true}
                        >
                            <option value={''}>Please Select Month</option>
                            {
                                month.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.month}</option>
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
                                tahunan2(e.target.value)
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

                <div className='w-1/2 flex justify-end'>
                    <div className='sm:min-w-fit'>
                        <div className="mb-2 block">
                            <Label
                                value="Filter"
                            />
                        </div >
                        <select className='w-full font-semibold text-gray-600 p-1 rounded-sm border border-black focus:ring-transparent focus:border-black'
                            onChange={(e) => { setFiltah(e.target.value) }}

                            id="tahun"
                            required={true}
                        >
                            <option value="summary">Summary</option>
                            <option value="category">Product Category</option>

                        </select>
                    </div>
                </div>


            </div>

            <div className='flex justify-end mt-3'>
                <div className='sm:min-w-fit'>
                    <div className="mb-2 block">
                        <Label
                            value="Filter"
                        />
                    </div >
                    <select className='w-full font-semibold text-gray-600 p-1 rounded-sm border border-black focus:ring-transparent focus:border-black'
                        onChange={(e) => { setFiltah(e.target.value) }}

                        id="tahun"
                        required={true}
                    >
                        <option value="summary">Summary</option>
                        <option value="category">Product Category</option>

                    </select>
                </div>
            </div>

            <div className='flex flex-col items-center mt-24 border-1 border-slate-700 shadow-lg p-10'>
                
                <Outlet />
                {
                    filtah == 'summary' ?
                        <Summary data={visible} />
                        :
                        filtah == 'category' ?
                            <Category />
                            : null
                }




            </div>
            <Toaster />
        </div>
    )
}