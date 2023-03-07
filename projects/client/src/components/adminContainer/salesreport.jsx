import { useEffect, useState } from 'react'
import { Label } from "flowbite-react"

export default function SalesReport() {

    let [year, setYear] = useState([])

    let dateDefault = ()=>{
        let date = new Date()
        let loader = []

    }
    let [month, setMonth] = useState([
        { 'month_id': 1, 'month': 'Januari' },
        { 'month_id': 2, 'month': 'Februari' },
        { 'month_id': 3, 'month': 'Maret' },
        { 'month_id': 4, 'month': 'April' },
        { 'month_id': 5, 'month': 'Mei' },
        { 'month_id': 6, 'month': 'Juni' },
        { 'month_id': 7, 'month': 'Juli' },
        { 'month_id': 8, 'month': 'Agustus' },
        { 'month_id': 9, 'month': 'September' },
        { 'month_id': 10, 'month': 'Oktober' },
        { 'month_id': 11, 'month': 'November' },
        { 'month_id': 12, 'month': 'Desember' }
    ])

    let [visible, setVisible] = useState({
        'month': false
    })

    useEffect(()=>{
        dateDefault()
    },)


    return (
        <div className="min-h-screen px-10 py-8">
            <div className="text-2xl text-blue-900 font-bold ">
                Sales Report
            </div>
            <div className="flex my-12 justify-between">
                <div className='flex w-1/2 gap-5'>
                    <div className='w-1/3'>
                        <div className="mb-2 block">
                            <Label
                                value="Period"
                            />
                        </div >
                        <select onChange={(e) => e.target.value == '2' ? setVisible({ ...visible, month: true }) : setVisible({ ...visible, month: false })} className='w-full font-semibold text-gray-600 py-2 px-6 rounded-md border border-black focus:ring-transparent focus:border-black'
                            id="periode"
                            required={true}
                        >
                            <option value="1">Yearly</option>
                            <option value="2">Monthly</option>


                        </select>
                    </div>
                    <div className={`w-1/3 ${visible.month ? 'block' : 'hidden'}`}>
                        <div className="mb-2 block">
                            <Label
                                value="Month"
                            />
                        </div >
                        <select className='w-full font-semibold text-gray-600 py-2 px-6 rounded-md border border-black focus:ring-transparent focus:border-black'
                            id="bulan"
                            required={true}
                        >
                            <option value={null}>Please Month Select</option>
                            {
                                month.map((item, index) => {
                                    return (
                                        <option>{item.month}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className='w-1/3'>
                        <div className="mb-2 block">
                            <Label
                                value="Year"
                            />
                        </div >
                        <select className='w-full font-semibold text-gray-600 py-2 px-6 rounded-md border border-black focus:ring-transparent focus:border-black'
                            id="tahun"
                            required={true}
                        >
                            <option value="">2023</option>

                        </select>
                    </div>
                </div>

                <div className='w-1/2 flex justify-end'>
                    <div className='min-w-fit'>
                        <div className="mb-2 block">
                            <Label
                                value="Filter"
                            />
                        </div >
                        <select className='w-full font-semibold text-gray-600 py-2 px-6 rounded-md border border-black focus:ring-transparent focus:border-black'
                            id="tahun"
                            required={true}
                        >
                            <option value="">Summary</option>

                        </select>
                    </div>
                </div>


            </div>

            <div className='flex flex-col items-center mt-24'>
                <div className='text-3xl font-semibold'>
                    Sales Report
                </div>
                <div className='text-gray-500 font-semibold my-5'>
                    in 
                </div>

                <div className='flex justify-between w-full'>
                    <div className=' flex flex-col gap-2'>
                        <div className='text-2xl font-semibold mb-3'>
                            Selling
                        </div>
                        <div>
                            1. All Items from All Warehouse
                        </div>
                        <div>
                            2. Shipping service
                        </div>
                        <div>
                            3. Discount Item
                        </div>
                        <div>
                            4. Returned Item
                        </div>

                    </div>

                    <div className='flex flex-col items-end gap-2'>
                        <div className='text-2xl font-semibold mb-5'>
                            In IDR
                        </div>
                        <div>
                            100000000000
                        </div>
                        <div>
                            100000000000
                        </div>
                        <div>
                            0
                        </div>
                        <div>
                            0
                        </div>

                    </div>
                </div>

                <hr className='border-1 my-4 border-slate-200 w-full' />
                
                <div className='flex justify-between w-full text-lg font-semibold'>
                        <div>
                            Net Sales
                        </div>
                        <div>
                            2000000000
                        </div>
                </div>
            </div>
        </div>
    )
}