import { AiOutlineClose } from 'react-icons/ai'
import { useContext } from 'react'

import { TransactionData } from '../../../data/transactionAdmin'

export default function TransactionDetail() {
    const { transaction, setTransaction } = useContext(TransactionData)
    return (
        <div className="fixed z-50 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 ">
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
                    <div className='w-2/3 border-r px-7'>
                        <div className='flex justify-between py-3'>
                            <div className='font-semibold'>
                                Done
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
                                INV/20220408/MPL/2209737188
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

                        <div className='font-semibold'>
                            Detailed Products
                        </div>

                        <div className='border border-gray-400'>
                            {
                                transaction.transaction_details.map((item, index) => {
                                    return (
                                        <div className='flex'>
                                            <div className='w-2/3 flex'>
                                                <img className='w-20 h-20 object-contain' src={require(`../../../Assets/${item.product_img}`)} alt="" />
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
                                                        {item.memory_storage ? item.memory_storage : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='w-1/3 p-3'>

                                                <div className='flex flex-col justify-end items-end border-l border-gray-300'>
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
                                            kelurahan, kota
                                        </div>

                                        <div>
                                            provinsi
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <hr className='h-2 my-4 bg-gray-200' />

                        <div className='flex flex-col pb-10 gap-4 text-sm text-gray-500'>
                            <div className='font-bold text-lg text-black'> Payment Details</div>
                            <div className='flex justify-between'>
                                <div className='w-1/2 flex items-start flex-col gap-2'>
                                    <div className='mb-3'>
                                        Payment Method
                                    </div>
                                    <div>
                                        Total Price (1 item)
                                    </div>
                                    <div>
                                        Total Shipping Cost (200 gram)
                                    </div>
                                    <div>
                                        Total Discount Items
                                    </div>
                                    <div className='font-bold text-lg text-black mt-3'>
                                        Total belanja
                                    </div>
                                </div>
                                <div className='w-1/2 flex flex-col items-end text-black gap-2'>
                                    <div className='mb-3'>
                                        Mandiri Virtual Account
                                    </div>
                                    <div>
                                        Rp. 1
                                    </div>
                                    <div>
                                        Rp. 1
                                    </div>
                                    <div>
                                        -Rp. 1
                                    </div>
                                    <div className='font-bold text-lg text-black mt-3'>
                                        Rp. 123
                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* box kiri */}

                    </div>

                    <div className='w-1/3 right-0 items-center absolute flex-col flex overflow-hidden'>
                        <div>
                            BUKAAAAK CELANANYAA
                        </div>

                        <div>
                           JANGAAAN OOM
                        </div>

                        <iframe className=' ml-10 aspect-[1/2] w-full z-0' src={require('../../../Assets/giphy tokped.gif')} frameborder="0"></iframe>
                        {/* box kanan */}
                    </div>

                </div>




            </div>
        </div>
    )
}