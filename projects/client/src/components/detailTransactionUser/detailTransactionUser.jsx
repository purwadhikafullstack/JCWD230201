import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Badge, Modal, Button } from "flowbite-react"
import { toast, Toaster } from 'react-hot-toast'

import { MdPayment, MdOutlineCancel, MdArrowForwardIos } from 'react-icons/md'
import { FaShippingFast } from 'react-icons/fa'
import { BsArrowRepeat } from 'react-icons/bs'
import { ImLocation2 } from 'react-icons/im'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import Loading from "../loading/loading"

export default function DetailTransaction() {
    const { id } = useParams()

    const [transactionDetail, setTransactionDetail] = useState({})
    const [product, setProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [modalCancel, setModalCancel] = useState(false)
    const [cancelID, setCancelID] = useState(0)

    let getData = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/transaction/detailTransaction/${id}`)

            // console.log(response.data.data)
            setTransactionDetail({
                ...transactionDetail,
                name: response.data.data.receiver,
                address: response.data.data.address,
                city: response.data.data.city,
                province: response.data.data.province,
                subdistrict: response.data.data.subdistrict,
                phone_number: response.data.data.phone_number,
                warehouse: response.data.data.warehouse_city,
                courier: `${response.data.data.courier.split(',')[0].toUpperCase()}, ${response.data.data.courier.split(',')[1]}`,
                status: response.data.data.order_status.status,
                statusID: response.data.data.order_status.id,
                ongkir: response.data.data.ongkir
            })
            setProduct(response.data.data.transaction_details)
            setCancelID(response.data.data.id)

            let sum = 0
            response.data.data.transaction_details.forEach(e =>
                sum += e.qty * e.price)
            setTotalPrice(sum)
        } catch (error) {
            // console.log(error)
        }
    }

    let cancelOrder = async (input) => {
        try {
            // console.log(input)
            await axios.post('http://localhost:8000/transaction/cancel-transaction', {
                id: input
            })

            toast.success('Cancel Transaction Success!', {
                style: {
                    background: "black",
                    color: 'white'
                }
            })
            getData()

            setModalCancel(false)

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                transactionDetail ?
                    <div>
                        {id}
                        <h1 className="text-2xl font-semibold pb-5">
                            Transaction Detail
                        </h1>
                        <div className="border rounded-sm px-3 py-5">

                            <div className="border rounded-sm mt-3 px-4">
                                <div className="border-b flex items-center">
                                    <h2 className="text-lg font-semibold py-4 mr-4">
                                        Order Status
                                    </h2>
                                    <Badge
                                        color="info"
                                        size="sm"
                                        className={transactionDetail.statusID === 6 ? "text-center bg-red-200 font-semibold text-red-600 w-max px-3 rounded-sm" : transactionDetail.statusID === 4 || transactionDetail.statusID === 5 ? "text-center bg-green-200 font-semibold text-green-600 w-max px-3 rounded-sm" : "text-center bg-blue-200 font-semibold text-sky-600 w-max px-3 rounded-sm"}
                                    >
                                        {transactionDetail.status}
                                    </Badge>
                                </div>
                                <div className="px-4 py-5 grid md:grid-cols-7 justify-items-center">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-black text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center">
                                            {transactionDetail.statusID === 6 ? <MdOutlineCancel /> : <MdPayment />}
                                        </div>
                                        <p className="mt-5 font-semibold text-center">
                                            {transactionDetail.statusID === 6 ? "Order Canceled" : transactionDetail.statusID === 1 ? "Waiting for Payment" : transactionDetail.statusID >= 2 ? "Waiting for Confirmation Payment" : "Payment Success"}
                                            { }
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <MdArrowForwardIos />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className={transactionDetail.statusID === 6 ? "bg-gray-300 text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center" : transactionDetail.statusID >= 3 ? "bg-black text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center" : "bg-gray-300 text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center"}>
                                            <BsArrowRepeat />
                                        </div>
                                        <p className="mt-5 font-semibold">
                                            {transactionDetail.statusID === 6 ? null : transactionDetail.statusID >= 3 ? "Process" : null}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <MdArrowForwardIos />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className={transactionDetail.statusID === 6 ? "bg-gray-300 text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center" : transactionDetail.statusID >= 4 ? "bg-black text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center" : "bg-gray-300 text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center"}>
                                            <FaShippingFast />
                                        </div>
                                        <p className="mt-5 font-semibold">
                                            {transactionDetail.statusID === 6 ? null : transactionDetail.statusID >= 4 ? "Shipped" : null}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <MdArrowForwardIos />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className={transactionDetail.statusID === 6 ? "bg-gray-300 text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center" : transactionDetail.statusID >= 5 ? "bg-black text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center" : "bg-gray-300 text-white text-3xl rounded-full w-20 h-20 flex justify-center items-center"}>
                                            <ImLocation2 />
                                        </div>
                                        <p className="mt-5 font-semibold">
                                            {transactionDetail.statusID === 6 ? null : transactionDetail.statusID >= 5 ? "Order Success" : null}
                                        </p>
                                        <button className="bg-black text-white hover:bg-white hover:text-black border border-black rounded-sm mt-2 px-2 py-1">
                                            Confirm Order
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-sm mt-3 px-4">
                                <div>
                                    <h2 className="text-lg font-semibold py-4">
                                        Shipping Address
                                    </h2>
                                </div>
                                <div className="pb-5 text-sm">
                                    <p>{transactionDetail.name}</p>
                                    <p>{transactionDetail.address}</p>
                                    <p>{transactionDetail.subdistrict}, {transactionDetail.city}, {transactionDetail.province}</p>
                                    <p>{`0${transactionDetail.phone_number}`}</p>
                                </div>
                            </div>

                            <div className="border rounded-sm mt-3 px-4">
                                <div className="border-b flex items-center">
                                    <h2 className="text-lg font-semibold py-4">
                                        Detail Shipping
                                    </h2>
                                </div>
                                <div className="text-sm">
                                    <div className="grid grid-cols-3">
                                        <div className="col-span-2">
                                            <p className="border-b py-3 px-3">
                                                Mercant
                                            </p>
                                            <p className="py-3 px-3">
                                                Gudang iFrit {transactionDetail.warehouse}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="border-b py-3">
                                                Kurir
                                            </p>
                                            <p className="py-3">
                                                {transactionDetail.courier}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 px-4">
                                <div className="border-b">
                                    <h2 className="text-lg font-semibold py-4">
                                        Total Order
                                    </h2>
                                </div>
                                <div className=" pb-5 text-sm">

                                    <div className="grid grid-cols-5 text-left py-3 border-b">
                                        <th className="col-span-2">
                                            Product Name
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Qty
                                        </th>
                                        <th className="text-right">
                                            Subtotal
                                        </th>
                                    </div>

                                    {
                                        product.map((value, index) => {
                                            return (
                                                <div className="grid grid-cols-5 border-b py-4 items-center">
                                                    <div className="col-span-2 flex items-center">
                                                        <img src={require(`../../../../server/src/Public/images/${value.product_img}`)} className='flex items-start w-20' />
                                                        <p>{value.product_name}</p>
                                                    </div>
                                                    <td>
                                                        Rp. {value.price.toLocaleString()}
                                                    </td>
                                                    <td>
                                                        {value.qty}
                                                    </td>
                                                    <td className="text-right">
                                                        Rp. {(value.price * value.qty).toLocaleString()}
                                                    </td>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="grid grid-cols-5 border-b py-4">
                                        <div className="col-start-4 col-end-5 font-semibold">
                                            <p>
                                                Subtotal:
                                            </p>
                                            <p>
                                                Pengirim:
                                            </p>
                                            <p>
                                                Grand Total:
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p>
                                                Rp. {totalPrice.toLocaleString()}
                                            </p>
                                            <p>
                                                Rp. {parseInt(transactionDetail.ongkir).toLocaleString()}
                                            </p>
                                            <p>
                                                Rp. {(totalPrice + transactionDetail.ongkir).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {
                                transactionDetail.statusID === 1 ?
                                    <div className="flex justify-end">
                                        <button onClick={() => {
                                            setModalCancel(!modalCancel)
                                            // setCancelID(value.id)
                                        }} className="border border-red-600 text-red-600 font-semibold py-2 rounded-sm hover:bg-red-600 hover:text-white mt-2 px-5">
                                            Cancel
                                        </button>
                                        <Modal
                                            show={modalCancel}
                                            size="md"
                                            popup={true}
                                            onClose={() => setModalCancel(!modalCancel)}
                                        >
                                            <Modal.Header />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Are you sure you want to cancel this transaction?
                                                    </h3>
                                                    <div className="flex justify-center gap-4">
                                                        <Button
                                                            color="failure"
                                                            onClick={() => cancelOrder(cancelID)}
                                                        >
                                                            Yes, I'm sure
                                                        </Button>
                                                        <Button
                                                            color="gray"
                                                            onClick={() => setModalCancel(false)}
                                                        >
                                                            No, cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                    : null
                            }

                        </div>
                        <Toaster />
                    </div>
                    :
                    <Loading />
            }
        </>
    )
}