import { useEffect, useState } from "react"
import axios from 'axios'

export default function ShippingSuccess() {

    const [status, setStatus] = useState('')
    const [orderNumber, setOrderNumber] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    let getData = async () => {
        try {
            let response = await axios.get('http://localhost:8000/transaction/getDataTransaction', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            console.log(response)
            setStatus(response.data.data.order_status.status)
            setOrderNumber(response.data.data.id)

            let sum = 0
            response.data.data.transaction_details.forEach(e =>
                sum += e.qty * e.price)

            setTotalPrice(sum + response.data.data.ongkir)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="pt-28 grid grid-cols-6">
                <div className="col-start-3 col-end-5">
                    <p className="border-b-2 pb-4 text-2xl text-center font-bold">
                        Payment Information
                    </p>
                    <p className="py-6 text-sm">
                        Thank you, order invoice created successfully. Please complete your transaction
                    </p>
                    <div className="flex justify-evenly text-sm">
                        <div>
                            <p>
                                Order Status
                            </p>
                            <p>
                                Order Number
                            </p>
                            <p>
                                Total Payment
                            </p>
                            <p>
                                Payment Method
                            </p>
                        </div>
                        <div className="font-bold text-right pb-6">
                            <p>
                                {status}
                            </p>
                            <p>
                                {orderNumber}
                            </p>
                            <p>
                                Rp. {totalPrice.toLocaleString()}
                            </p>
                            <p>
                                BCA Virtual Account
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-200 flex justify-between py-4 px-3">
                        <p className="text-teal-800">
                            Expired Payment
                        </p>
                        <p className="font-bold text-teal-800">
                            Countdown
                        </p>
                    </div>

                    <div className="text-center bg-sky-50 mt-6 py-3">
                        <p>
                            VA Number - BCA Virtual Account
                        </p>
                        <p className="font-bold">
                            1231203912380928
                        </p>
                    </div>

                    <div className="flex justify-center my-6">
                        <button className="bg-black text-white px-3 py-2 font-bold">
                            Order Detail
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <p>
                            You will received confirmation order email with order detail. Your order will process now.
                        </p>
                        <p>
                            You have trouble with this order? <span className="font-bold">Contact Us</span>
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}