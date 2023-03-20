import axios from "axios"
import { Badge } from "flowbite-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TransactionHistory() {

    const [transaction, setTransaction] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    let navigate = useNavigate()

    let getData = async () => {
        try {
            let response = await axios.get('http://localhost:8000/transaction/allTransactionUser', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            console.log(response.data.data)
            setTransaction(response.data.data)

            var sum = 0
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="border rounded-sm">
                <div className="px-5 py-3 border-b">
                    <h2 className="font-semibold text-2xl">
                        Transaction History
                    </h2>
                </div>
                <div className="px-5 py-3 text-sm">
                    {
                        transaction.map((value, index) => {
                            return (
                                <div className="grid grid-cols-6 border px-5 py-5 ">
                                    <div>
                                        <p>
                                            Order Number:
                                        </p>
                                        <p className="font-bold">
                                            {value.id}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Customer Name:
                                        </p>
                                        <p className="font-bold">
                                            {value.receiver}
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
                                            Rp. {value.ongkir.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Status:
                                        </p>
                                        <Badge
                                            color="info"
                                            size="sm"
                                            className="w-max px-3 rounded-sm"
                                        >
                                            {value.order_status.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button onClick={()=>navigate(`/my-account/history/${value.id}`)} className="bg-black text-white rounded-sm border border-black hover:bg-white hover:text-black px-5 py-2">
                                            Order Detail
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}