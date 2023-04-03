import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { userData } from "../../data/userData"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import DatePicker from 'react-datepicker'
import React from 'react'
import Select from 'react-select'
import Loading from './../loading/loading'

export default function LogProduct() {
    let { user } = useContext(userData)

    let [dataFilter, setDataFilter] = useState([])
    let [dataLog, setDataLog] = useState({
        log: [], category: [], product: [], addition: [], reduction: [], final: [],
        total_count: 0,
        total_pages: 0,
        warehouse: user.warehouse_id ? user.warehouse_id : 0,
        date: null,
        code: 1,
        shotgun: ['Summary', 'Detail'],
        page: 1,
        loading: true,
        pilihKategori: 1,
        pilihProduk: 1,
        pilihProdukIndex: 0,
        namaProduk: ''
    })

    let option = [
        'Filter',
        'Warehouse'
    ]

    let filter = async (input) => {
        if (input == "Filter") {
            setDataLog({ ...dataLog, loading: true })
            setDataFilter([])
            getAllLog(1, 0, dataLog.code, dataLog.date, dataLog.pilihKategori, dataLog.pilihProduk, dataLog.pilihProdukIndex)
        }
        if (input == "Warehouse") {
            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/transaction/filter`, { data: input })
            setDataFilter(response.data.data)
        }
    }

    let getAllLog = async (page, warehouse_id, code, date, pilihKategori, pilihProduk, pilihProdukIndex) => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/log/getlog?page=${page}&warehouse_id=${warehouse_id}&code=${code}&date=${date}&pilihKategori=${pilihKategori}&pilihProduk=${pilihProduk}`)
        // console.log(response.data.data)

        if (code == 1) {
            let loader = [], loader2 = []
            response.data.data.f_addition.forEach((item, index) => loader2.push(item - response.data.data.f_reduction[index]))
            response.data.data.product.forEach((item, index) => {
                loader.push({ 'value': item.id, 'label': item.name, 'index': index })
            })
            // console.log(loader)
            setDataLog({
                ...dataLog, log: response.data.data.getData,
                total_count: response.data.data.total_count,
                total_pages: response.data.data.total_pages,
                warehouse: warehouse_id, page, loading: false, category: response.data.data.category, code,
                product: loader, addition: response.data.data.addition, namaProduk: loader[pilihProdukIndex].label, pilihProdukIndex,
                reduction: response.data.data.reduction, final: loader2, pilihKategori, pilihProduk, date: date == 0 ? new Date() : new Date(date)
            })
        } else {
            let loader = []
            response.data.data.product.forEach((item, index) => {
                loader.push({ 'value': item.id, 'label': item.name, 'index': index })
            })
            setDataLog({
                ...dataLog, log: response.data.data.getData,product: loader, code, page, date, pilihKategori, pilihProduk, pilihProdukIndex, loading: false,
                total_count: response.data.data.total_count, category: response.data.data.category, namaProduk: loader[pilihProdukIndex].label,
                total_pages: response.data.data.total_pages, warehouse: warehouse_id, date: date == 0 ? new Date() : new Date(date)
            })
        }

        // console.log(dataLog)
    }

    useEffect(() => {
        getAllLog(1, user.warehouse_id ? user.warehouse_id : 0, 1, 0, 1, 0, 0)
    }, [])

    return (
        <div className="p-5">
            <div className="text-2xl font-semibold">
                Log Product
            </div>
            <div className='text-gray-400 text-sm mb-6'>
                {dataLog.total_count} log found
            </div>
            <div>
                <div className='flex justify-between gap-3 mb-8 '>
                    <div className='flex flex-col gap-2'>
                        <DatePicker
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            placeholderText="Select month"
                            className="bg-gray-100 border w-fit border-gray-100 text-gray-900 text-xs rounded-md"
                            selected={dataLog.date}
                            onChange={(date) => {
                                setDataLog({ ...dataLog, date, loading: true })
                                getAllLog(1, dataLog.warehouse, dataLog.code, date.toLocaleDateString(), dataLog.pilihKategori, dataLog.pilihProduk, dataLog.pilihProdukIndex)
                            }}
                        />
                        <div className='flex gap-5'>
                            {dataLog.shotgun.map((item, index) => {
                                return (
                                    <button
                                        disabled={dataLog.code == index + 1}
                                        onClick={() => {
                                            setDataLog({ ...dataLog, loading: true })
                                            getAllLog(1, dataLog.warehouse, index + 1, dataLog.date, dataLog.pilihKategori, dataLog.pilihProduk, dataLog.pilihProdukIndex)
                                        }}
                                        className={`font-semibold relative hover:text-black ${dataLog.code == index + 1 ? 'underline-offset-4 underline text-black' : 'text-gray-300'}  `}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className='flex gap-3'>

                        {
                            dataFilter.length > 0 ?
                                <div>
                                    <select
                                        onChange={(e) => {
                                            setDataLog({ ...dataLog, loading: true, warehouse: e.target.value })
                                            getAllLog(1, e.target.value, dataLog.code, dataLog.date, dataLog.pilihKategori,
                                                dataLog.pilihProduk, dataLog.pilihProdukIndex)
                                        }}
                                        className="border-gray-200 focus:ring-0 focus:border-border-200 focus:outline-none rounded-md" placeholder="Select Warehouse">
                                        <option value={0}>All Log</option>
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
            </div>

            {
                dataLog.code == 1 ?
                    dataLog.loading ?
                        <Loading />
                        :
                        <div className="relative overflow-x-auto shadow-md border border-slate-200 rounded-sm p-4">
                            <div className='flex gap-10 mb-4'>
                                {
                                    dataLog.category?.map((item, index) => {
                                        return (
                                            <button
                                                disabled={dataLog.pilihKategori == index + 1}
                                                onClick={() => {
                                                    setDataLog({ ...dataLog, loading: true, warehouse: index + 1 })
                                                    getAllLog(1, dataLog.warehouse, dataLog.code, dataLog.date, index + 1,
                                                        0, 0)
                                                }}
                                                className={`font-semibold relative hover:text-black ${dataLog.pilihKategori == index + 1 ? 'underline-offset-4 underline text-black' : 'text-gray-300'}  `}
                                            >
                                                {item.name}
                                            </button>
                                        )
                                    })}
                            </div>
                            <div className='w-full mb-5'>
                                <Select
                                 menuPosition="fixed"
                                    className="basic-single w-1/4"
                                    classNamePrefix="select"
                                    defaultValue={dataLog.product[dataLog.pilihProdukIndex]}
                                    // isDisabled={dataLog.loading}
                                    // isLoading={dataLog.loading}
                                    onChange={(e) => {
                                        setDataLog({ ...dataLog, loading: true })
                                        getAllLog(1, dataLog.warehouse, dataLog.code, dataLog.date, dataLog.pilihKategori, e.value, e.index)
                                    }}
                                    maxMenuHeight={220}
                                    options={dataLog.product} >

                                </Select>
                            </div>

                            <table className="w-full text-sm text-left border text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Details
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Additional
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Reductional
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Final Stock
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataLog.loading ?
                                            <tr>
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                            </tr>
                                            :
                                            dataLog.log.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td scope="col" className="px-6 py-3">
                                                            {dataLog.namaProduk}
                                                        </td>
                                                        {
                                                            item.connectivity == '' &&
                                                                item.memory_storage == 0 &&
                                                                item.processor == '' &&
                                                                item.screen_size == '' ?
                                                                <td className="px-6 py-4">
                                                                    -
                                                                </td> :
                                                                <td scope="col" className="px-6 py-3 flex flex-col gap-1.5">
                                                                    <div className="flex gap-2 items-center">
                                                                        {item.color} <p style={{ backgroundColor: `${item.colorhex}` }} className={`w-5 rounded-full border border-stone-500 border-opacity-50 h-5 `}></p>
                                                                    </div>
                                                                    <div>{item.connectivity}</div>
                                                                    <div>{item.memory_storage} GB</div>
                                                                    <div>{item.processor}</div>
                                                                    <div>{item.screen_size ? item.screen_size + ' ' + 'inch' : null} </div>
                                                                    <div>{item.weight * 1000} g</div>
                                                                </td>

                                                        }

                                                        <td scope="col" className=" px-6 py-3">
                                                            {dataLog.addition[index]}
                                                        </td>
                                                        <td scope="col" className=" px-6 py-3">
                                                            {dataLog.reduction[index]}
                                                        </td>
                                                        <td scope="col" className="px-6 py-3">
                                                            {dataLog.final[index]}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>

                            </table>

                        </div>
                    :
                    dataLog.loading?
                    <Loading/>
                    :
                    <div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
                        <div className='flex gap-10 mb-4'>
                            {
                                dataLog.category?.map((item, index) => {
                                    return (
                                        <button
                                            disabled={dataLog.pilihKategori == index + 1}
                                            onClick={() => {
                                                setDataLog({ ...dataLog, loading: true, warehouse: index + 1 })
                                                getAllLog(1, dataLog.warehouse, dataLog.code, dataLog.date, index + 1,
                                                    0, 0)
                                            }}
                                            className={`font-semibold relative hover:text-black ${dataLog.pilihKategori == index + 1 ? 'underline-offset-4 underline text-black' : 'text-gray-300'}  `}
                                        >
                                            {item.name}
                                        </button>
                                    )
                                })}
                        </div>
                        
                        <div className='w-full mb-5'>
                            <Select
                                menuPosition="fixed"
                                className="basic-single w-1/4"
                                classNamePrefix="select"
                                defaultValue={dataLog.product[dataLog.pilihProdukIndex]}
                                // isDisabled={dataLog.loading}
                                // isLoading={dataLog.loading}
                                onChange={(e) => {
                                    setDataLog({ ...dataLog, loading: true })
                                    getAllLog(1, dataLog.warehouse, dataLog.code, dataLog.date, dataLog.pilihKategori, e.value, e.index)
                                }}
                                maxMenuHeight={220}
                                options={dataLog.product} >

                            </Select>
                        </div>
                        {
                            dataLog.log.length > 0 ?
                                <table className="w-full text-sm text-left border-t border-l border-r text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Warehouse
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                                dataLog.log?.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td className="px-6 py-4" >
                                                                {item.id}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.location_warehouse?.city}
                                                            </td>
                                                            <td className={`px-6 py-4 ${item.status == 'Additional' ? 'text-green-500' : 'text-red-500'}`}>
                                                                {item.status}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.qty}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.product_detail?.product.name}
                                                            </td>
                                                            <td className="flex px-6 py-4 flex-col gap-1.5">
                                                                <div className="flex gap-2 items-center">
                                                                    {item.product_detail?.color} <p style={{ backgroundColor: `${item.product_detail?.colorhex}` }} className={`w-5 rounded-full border border-stone-500 border-opacity-50 h-5 `}></p>
                                                                </div>
                                                                <div>{item.product_detail?.connectivity}</div>
                                                               {
                                                                item.product_detail?.memory_storage == 0?
                                                                null
                                                                :
                                                                <div>{item.product_detail.memory_storage} GB</div>
                                                               }  
                                                                <div>{item.product_detail?.processor}</div>
                                                                <div>{item.product_detail?.screen_size}</div>
                                                                <div>{item.product_detail?.weight * 1000} g</div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                    </tbody>


                                </table>
                                :
                                <div className='flex flex-col h-full items-center justify-center'>
                                    <lottie-player
                                        autoplay
                                        loop
                                        mode="normal"
                                        src="https://assets9.lottiefiles.com/packages/lf20_QbzmYGklCe.json"
                                        style={{ width: "200px" }}    >
                                    </lottie-player>
                                    <div className='text-2xl'>
                                        Data not found
                                    </div>
                                </div>

                        }

                    </div>
            }

            {
                dataLog.log.length > 0 ?
                    <div className='flex justify-center p-5 gap-2'>
                        <button
                            disabled={(dataLog.page - 1) == 0}
                            onClick={() => {
                                setDataLog({ ...dataLog, loading: true, page: dataLog.page - 1 })
                                getAllLog(dataLog.page - 1, dataLog.warehouse, dataLog.code, dataLog.date, dataLog.pilihKategori, dataLog.pilihProduk, dataLog.pilihProdukIndex)
                            }} className='font-semibold rounded-l-lg px-4 hover:bg-black hover:text-white'>
                            Previous
                        </button>
                        <div>
                            Page {dataLog.page} of {dataLog?.total_pages}
                        </div>
                        <button
                            disabled={(dataLog.page + 1) > dataLog.total_pages}
                            onClick={() => {
                                setDataLog({ ...dataLog, loading: true, page: dataLog.page + 1 })
                                getAllLog(dataLog.page + 1, dataLog.warehouse, dataLog.code, dataLog.date, dataLog.pilihKategori, dataLog.pilihProduk, dataLog.pilihProdukIndex)
                            }} className='font-semibold rounded-r-lg px-7 hover:bg-black hover:text-white'>
                            Next
                        </button>
                    </div>
                    :
                    null
            }

        </div>
    )
}