import axios from "axios"
import { Modal, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { IoReceiptOutline } from 'react-icons/io5'
import Loading from "../loading/loading"

export default function TransactionHistory() {

    const [transaction, setTransaction] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
 
    const [transactionID, setTransactionID] = useState(0)


    let navigate = useNavigate()
    var sum = 0

    let getData = async () => {
        try {
            let response = await axios.get('http://localhost:8000/transaction/allTransactionUser', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            // console.log(response.data.data)
            setTransaction(response.data.data)

            var sum = 0
            var totprice = []
            response.data.data.forEach(value => {
                sum += value.ongkir
                value.transaction_details.forEach(e => {
                    sum += e.qty * e.price
                })
                totprice.push(sum)
                sum = 0
            })
            // console.log(totprice)
            setTotalPrice(totprice)

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (!transaction) {
        return (
            <Loading />
        )
    }

    return (
        transaction ?
            <>
                <div className="border rounded-sm">
                    <div className="px-5 py-3 border-b">
                        <h2 className="font-semibold text-2xl">
                            Transaction History
                        </h2>
                    </div>
                    <div className="px-5 py-3 text-sm md:text-base">
                        {
                            transaction.map((value, index) => {
                                return (
                                    <div className="grid grid-cols-2 md:grid-cols-4 border px-5 py-5 gap-2">
                                        <div className="col-start-1 col-end-3 md:col-start-1 md:col-end-6">
                                            <p>
                                                Order Number:
                                            </p>
                                            <p className="font-bold">
                                                {value.id}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Order Date:
                                            </p>
                                            <p className="font-bold">
                                                {`${value.createdAt.split('T')[0]} ${value.createdAt.split('T')[1].split('.')[0]}`}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Total Price:
                                            </p>
                                            <p className="font-bold">
                                                Rp. {totalPrice[index].toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Status:
                                            </p>
                                            <p className={value.order_status_id === 6 ? "text-center bg-red-200 font-semibold text-red-600" : value.order_status_id === 4 || value.order_status_id === 5 ? "text-center bg-green-200 font-semibold text-green-600" : "text-center bg-blue-200 font-semibold text-sky-600 px-1"}>
                                                {value.order_status.status}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <button onClick={() => {
                                                navigate(`/my-account/history-detail?id=${value.id}`)
                                                // console.log(`/my-account/history/${value.id}`)
                                                }} className="bg-black text-white rounded-sm border border-black hover:bg-white hover:text-black w-full py-2">
                                                Order Detail
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Toaster />
            </>
            :
            <div className="w-full flex flex-col items-center justify-center h-full ">
                <IoReceiptOutline className="text-6xl text-neutral-400" />
                <p className="font-semibold text-xl text-neutral-700">You dont have any transaction history</p>
            </div>
    )
}