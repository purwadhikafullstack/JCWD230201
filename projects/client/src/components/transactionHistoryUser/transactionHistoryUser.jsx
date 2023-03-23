import axios from "axios"
import { Modal, Button } from "flowbite-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function TransactionHistory() {

    const [transaction, setTransaction] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const [modal, setModal] = useState(false)
    const [modalCancel, setModalCancel] = useState(false)
    const [payment, setPayment] = useState([])
    const [message, setMessage] = useState('')
    const [transactionID, setTransactionID] = useState(0)
    const [cancelID, setCancelID] = useState(0)

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

    let onImageValidation = (e) => {
        try {
            let files = [...e.target.files]
            // console.log(files[0])
            setPayment(files)

            if (files.length !== 0) {
                files.forEach((value) => {
                    if (value.size > 1000000) throw { message: `${value.name} more than 1000 Kb` }
                })
            }
            setMessage('')


        } catch (error) {
            // console.log(error)
            setMessage(error.message)

        }
    }

    let uploadPayment = async (input) => {
        try {
            // console.log(input)
            let fd = new FormData()
            fd.append('images', payment[0])
            fd.append('id', input)

            let data = await axios.post('http://localhost:8000/transaction/payment-proof', fd)
            // console.log(data)


            toast.success('Upload Payment Proof Success!', {
                style: {
                    background: "black",
                    color: 'white'
                }
            })

            setTimeout(() => {
                toast('loading...', {
                    duration: 2500
                })
                setModal(false)
            }, 2000)

            setTimeout(() => {
                window.location.reload(false)
            }, 3000)
        } catch (error) {
            // console.log(error)
        }
    }

    let cancelOrder = async (input) => {
        try {
            // console.log(input)
            await axios.post('http://localhost:8000/transaction/cancel-transaction',{
                id:input
            })

            toast.success('Cancel Transaction Success!', {
                style: {
                    background: "black",
                    color: 'white'
                }
            })

            setTimeout(() => {
                toast('loading...', {
                    duration: 2500
                })
                setModalCancel(false)
            }, 2000)

            setTimeout(() => {
                window.location.reload(false)
            }, 3000)
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
                                <div className="grid grid-cols-5 border px-5 py-5 gap-2">
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
                                        <button onClick={() => navigate(`/my-account/history/${value.id}`)} className="bg-black text-white rounded-sm border border-black hover:bg-white hover:text-black w-full py-2">
                                            Order Detail
                                        </button>
                                        {
                                            value.order_status.id === 1 ?
                                                <>
                                                    <button onClick={() => {
                                                        setModal(!modal)
                                                        setTransactionID(value.id)
                                                    }} className="rounded-sm border border-black mt-2 w-full py-2 hover:bg-black hover:text-white">
                                                        Upload Payment
                                                    </button>
                                                    <Modal
                                                        show={modal}
                                                        size="md"
                                                        onClose={() => {
                                                            setModal(!modal)
                                                        }}
                                                    >
                                                        <Modal.Header>
                                                            Upload Payment
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div>
                                                                <input onChange={(e) => onImageValidation(e)} type="file" />
                                                                {message}
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <button onClick={() => uploadPayment(transactionID)} className="bg-black text-white hover:bg-white hover:text-black border border-black rounded-sm px-10 py-2">
                                                                Upload
                                                            </button>
                                                            <button onClick={() => setModal(false)} className="bg-white text-black hover:bg-black hover:text-white border border-black rounded-sm px-10 py-2">
                                                                Decline
                                                            </button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    <button onClick={() => {
                                                        setModalCancel(!modalCancel)
                                                        setCancelID(value.id)
                                                    }} className="border border-red-600 text-red-600 font-semibold py-2 rounded-sm hover:bg-red-600 hover:text-white mt-2">
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
                                                                        onClick={()=>cancelOrder(cancelID)}
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
                                                </>
                                                :
                                                value.order_status.id === 2 || value.order_status.id === 3 ?
                                                    <>
                                                        <button onClick={() =>{
                                                            setModalCancel(!modalCancel)
                                                            setCancelID(value.id)
                                                            }} className="border border-red-600 text-red-600 font-semibold py-2 rounded-sm hover:bg-red-600 hover:text-white mt-2">
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
                                                                            onClick={()=>cancelOrder(cancelID)}
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
                                                    </>
                                                    :
                                                    null
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Toaster />
        </>
    )
}