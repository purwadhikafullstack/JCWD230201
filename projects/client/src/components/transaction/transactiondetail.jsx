import { AiOutlineClose } from 'react-icons/ai'
import { useContext, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'

import { TransactionData } from '../../data/transactionAdmin'

export default function TransactionDetail() {
    const { transaction, setTransaction } = useContext(TransactionData)
    const [maxpayment, setMaxpayment] = useState(false)
    console.log(transaction.transaction_details)

    let total_price = 0
    let total_weight = 0
    transaction?.transaction_details.forEach((item, index) => {
        total_price += item.price * item.qty
        total_weight += item.weight * item.qty
    })

    let [load, setLoad] = useState({
        price: total_price,
        weight: total_weight,
        total: total_price + transaction?.ongkir
    })

    let updateOrder = async(id,code,load,wh_id)=>{
        try {
            console.log(id)
            console.log(code)
            console.log(load)
            let response = await axios.patch(`http://localhost:8000/transaction/update?transaction_id=${id}&code=${code}&load=${JSON.stringify(load)}&warehouse_id=${wh_id}`)
            toast(response.data.message)
        } catch (error) {
            
        }
    }

    return (
        <div className="fixed z-30 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 ">
            {
                transaction.upload_payment ?
                    maxpayment ?
                        <div className='fixed z-50 p-10 w-screen h-screen flex flex-col items-center'>
                            <div className='p-5 bg-white lg:w-1/3 w-1/2 h-1/2 xl:h-full'>
                                <button onClick={() => setMaxpayment(false)}><AiOutlineClose size={'20px'} /></button>
                                <img src={require(`../../Assets/${transaction.upload_payment}.jpeg`)} className='w-full h-full object-contain overflow-y-auto bg-gray-200 bg-opacity-20' alt="" />
                            </div>
                        </div> : null : null
            }
            <div className="w-3/5 h-3/4 border shadow-lg bg-white flex flex-col relative">

                <div className="flex justify-between items-center w-full px-7 py-4">
                    <div className="text-2xl font-bold">
                        Transaction Detail
                    </div>

                    <button onClick={() => setTransaction(null)} className='hover:bg-gray-300'>
                        <AiOutlineClose size={'25px'} />
                    </button>
                </div>

                <hr className='border-t' />

                <div className='flex overflow-scroll'>
                    <div className='w-full border-r px-7'>
                        <div className='flex justify-between py-3'>
                            <div className='font-semibold'>
                                {transaction.order_status.status}
                            </div>

                            <button className='flex font-semibold text-sm gap-3'>
                                Open Detail
                            </button>
                        </div>

                        <hr className='border-t border-dashed mx-7' />

                        <div className='flex justify-between py-2'>
                            <div className='text-sm text-gray-500'>
                                No. Invoice
                            </div>
                            <div className='font-bold text-emerald-600 text-xs'>
                                INV/20220408/MPL/22097371{transaction.id}
                            </div>
                        </div>

                        <div className='flex justify-between py-2'>
                            <div className='text-sm text-gray-500'>
                                Date Order
                            </div>
                            <div className='font-semibold text-xs'>
                                08 April 2022, 14:50 WIB
                            </div>
                        </div>

                        <hr className='h-2 bg-gray-100 my-4' />


                        <div className='flex '>
                            <div className={`${transaction.upload_payment ? 'w-3/4' : 'w-full'} flex flex-col`}>
                                <div className='font-semibold'>
                                    Detailed Products
                                </div>

                                <div className='flex'>
                                    <div className='w-full'>
                                        {
                                            transaction.transaction_details.map((item, index) => {
                                                return (
                                                    <div className='flex justify-between'>
                                                        <div className='flex'>
                                                            <img className='w-20 h-20 object-contain' src={require(`../../Assets/${item.product_img}`)} alt="" />
                                                            <div className='flex flex-col justify-start py-2'>
                                                                <div className='text-lg font-semibold'>
                                                                    {item.product_name}
                                                                </div>
                                                                <div className='text-gray-500 text-xs'>
                                                                    {item.color ? item.color : null}
                                                                </div>
                                                                <div className='text-gray-500 text-xs'>
                                                                    {item.connectivity ? item.connectivity : null}
                                                                </div>
                                                                <div className='text-gray-500 text-xs'>
                                                                    {item.processor ? item.processor : null}
                                                                </div>
                                                                <div className='text-gray-500 text-xs'>
                                                                    {item.screensize ? item.screensize : null}
                                                                </div>
                                                                <div className='text-gray-500 text-xs'>
                                                                    {item.memory_storage ? `${item.memory_storage} GB` : null}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='ml-10 p-3'>

                                                            <div className='flex flex-col justify-end items-end border-l pl-5 gap-2  border-gray-300'>
                                                                <div className='text-gray-500'>
                                                                    total harga
                                                                </div>
                                                                <div className='text-lg font-semibold'>
                                                                    Rp. {(item.price).toLocaleString()}
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>


                                </div>
                            </div>
                            {
                                transaction.upload_payment ?
                                    <div className='w-1/4 flex flex-col pl-5 gap-2'>
                                        <div className='font-semibold'>
                                            Payment Proof :
                                        </div>
                                                <button className='m-4' onClick={() => setMaxpayment(true)}>

                                                    {/* <img src={`http://localhost:8000/Public/images/${transaction.upload_payment}`} className='w-12 h-20' alt="" /> */}
                                                    <img src={require(`../../Assets/${transaction.upload_payment}.jpeg`)} className='w-14 h-20' alt="" />
                                                </button>

                                        {
                                            transaction.order_status_id == 2 ?
                                                <div className='flex gap-4 mt-4'>
                                                    <button onClick={()=>{
                                                        updateOrder(transaction.id,3,transaction.transaction_details,transaction.location_warehouse_id)}
                                                    } className='bg-emerald-500'>
                                                        Submit
                                                    </button>
                                                    <button onClick={()=>{
                                                        updateOrder(transaction.id,1)}
                                                    } className='bg-red-500'>
                                                        Cancel
                                                    </button>
                                                </div>
                                                : null
                                        }

                                    </div> : null
                            }
                        </div>

                        <hr className='h-2 my-4 bg-gray-200' />

                        <div className='flex flex-col gap-4 text-sm text-gray-500'>
                            <div className='font-bold text-md text-black'> Shipping Info</div>
                            <div className='flex'>
                                <div className='w-1/4 '>
                                    Courier
                                </div>

                                <div className='w-3/4 text-black flex gap-3'>
                                    :
                                    <div className='text-black'>
                                        {transaction.courier}
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/4'>
                                    No. Shipping
                                </div>

                                <div className='w-3/4 flex gap-3'>
                                    :
                                    <div className=' text-black'>
                                        Aukdah apaan
                                    </div>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/4 '>
                                    Address
                                </div>

                                <div className='w-3/4 flex gap-3'>
                                    <div>:</div>
                                    <div className='flex flex-col text-black'>
                                        <div className='font-bold'>
                                            {transaction.user_name}
                                        </div>
                                        <div>
                                            {transaction.phone_number}
                                        </div>
                                        <div>
                                            {transaction.address}
                                        </div>
                                        <div>
                                            {transaction.subdistrict}, {transaction.city}
                                        </div>

                                        <div>
                                            {transaction.province}
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <hr className='h-2 my-4 bg-gray-200' />

                        <div className='flex flex-col pb-5 gap-4 text-sm text-gray-500'>
                            <div className='font-bold text-lg text-black'> Payment Details</div>
                            <div className='flex flex-col gap-5'>
                                <div className='flex justify-between items-end'>
                                    <div>
                                        Payment Method
                                    </div>
                                    <img src={require('../../Assets/mandiri_VA.png')} className=' w-28' alt="" />
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div >
                                        Total Price
                                    </div>
                                    <div>
                                        Rp. {(load.price).toLocaleString()}
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div>
                                        Total Shipping Cost {(load.weight * 1000).toLocaleString()} gram
                                    </div>
                                    <div>
                                        Rp. {(transaction.ongkir).toLocaleString()}
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>

                                    <div>
                                        Total Discount Items
                                    </div>
                                    <div>
                                        -Rp. 0
                                    </div>
                                </div>

                                <div className='flex justify-between items-center border-t border-gray-300'>
                                    <div className='font-bold text-lg text-black mt-3'>
                                        Total Cost Shopping
                                    </div>
                                    <div className='font-bold text-lg text-black mt-3'>
                                        Rp. {(load.total).toLocaleString()}
                                    </div>

                                </div>
                            </div>

                        </div>



                        {/* box */}

                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}