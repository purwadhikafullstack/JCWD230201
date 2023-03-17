import axios from 'axios'
import { useEffect, useState } from 'react'

import { MdOutlineDelete } from 'react-icons/md'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import { Modal, Button, Spinner } from 'flowbite-react'
import { toast, Toaster } from 'react-hot-toast'


export default function Cart(props) {

    const [productCart, setProductCart] = useState([])

    const [totalPrice, setTotalPrice] = useState(0)

    const [modalDelete, setModalDelete] = useState(false)

    const [cartToDelete, setCartToDelete] = useState({})

    const [loading, setLoading] = useState(false)

    const [loadingIndex, setLoadingIndex] = useState(0)

    let getData = async () => {
        try {
            let response = await axios.get('http://localhost:8000/cart/data-cart', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            // console.log(response.data.data)
            setProductCart(response.data.data)

            let sum = 0
            response.data.data.forEach(e =>
                sum += e.qty * e.product_detail.price)
            setTotalPrice(sum)

            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    let deleteCart = async () => {
        try {
            await axios.post('http://localhost:8000/cart/delete-cart', { id: cartToDelete.id })

            toast.success('Delete Product from Cart Success')

            getData()

            props.func.getCart()
        } catch (error) {

        }
    }

    let getQty = () => {

    }

    let updateQty = async (input) => {
        try {

            let response = await axios.post('http://localhost:8000/cart/update-cart', { id: input.split(',')[1], type: input.split(',')[2], qtyx: input.split(',')[0] })

            getData()


        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }



    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="pt-24 h-max">

                {/* grid */}
                <div className="grid grid-cols-12">
                    {/* Card Start */}
                    <div className="col-start-3 col-end-9 mr-3">
                        {
                            productCart.map((value, index) => {
                                return (
                                    <div className=' border my-3 rounded-sm'>
                                        <div className="border-b-2">
                                            {/* Content Start */}
                                            <div className="flex justify-between p-3 h-[100px]">
                                                <div className="flex items-center w-full">
                                                    <div className="flex justify-center w-[60px]">
                                                        <img src={require(`../../Assets/${value.product.product_images[0].img}`)} alt="...." />
                                                    </div>
                                                    <div className='text-sm'>
                                                        <div className='font-semibold text-neutral-600'>
                                                            {value.product.name}, {value.product_detail.memory_storage} GB, {value.product_detail.color}
                                                        </div>
                                                        <div className="font-bold">
                                                            Price : Rp. {value.product_detail.price.toLocaleString()}
                                                        </div>
                                                        <div className="pt-3">
                                                            Subtotal : Rp {(value.product_detail.price * value.qty).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    {loading && loadingIndex == index ?
                                                        <>
                                                            <Spinner aria-label="Default status example" />
                                                        </>
                                                        :
                                                        <>
                                                            <div className='text-xl'>
                                                                <button
                                                                    onClick={(e) => {
                                                                        setLoading(true)
                                                                        setLoadingIndex(index)
                                                                        updateQty(e.target.value)
                                                                    }}
                                                                    value={`${value.qty},${value.id},-,${index}`}
                                                                    className='w-4'>
                                                                    -
                                                                </button>
                                                            </div>
                                                            <div className="col-span-2 border w-8 h-8 text-xs flex justify-center items-center bg-slate-200 border-neutral-300 rounded-sm">
                                                                {value.qty}
                                                            </div>
                                                            <div className='text-xl'>
                                                                <button
                                                                    onClick={(e) => {
                                                                        setLoading(true)
                                                                        setLoadingIndex(index)
                                                                        updateQty(e.target.value)
                                                                    }}
                                                                    value={`${value.qty},${value.id},+,${index}`}
                                                                    className='w-4'>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                setModalDelete(!modalDelete)
                                                setCartToDelete(value)
                                            }}
                                                value={value.id}
                                                className='pl-5 py-3 text-sm text-gray-400 hover:text-gray-800'>
                                                Delete
                                            </button>
                                            <Modal
                                                show={modalDelete}
                                                size="md"
                                                popup={true}
                                                onClose={() => setModalDelete(!modalDelete)}
                                            >
                                                <Modal.Header />
                                                <Modal.Body>
                                                    <div className="text-center">
                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                            Are you sure you want to delete this product from cart?
                                                        </h3>
                                                        <div className="flex justify-center gap-4">
                                                            <Button
                                                                color="failure"
                                                                onClick={() => {
                                                                    deleteCart()
                                                                    setModalDelete(false)
                                                                }}
                                                                className="focus:ring-0 focus:ring-transparent"
                                                            >
                                                                Yes, I'm sure
                                                            </Button>
                                                            <Button
                                                                color="gray"
                                                                onClick={() => setModalDelete(false)}
                                                            >
                                                                No, cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Card End */}

                    <div className="col-start-9 col-end-11 relative">
                        <div className="px-5 sticky">
                            <div className="font-bold text-xl py-4 border-b-2">
                                Summary
                            </div>
                            <div className="py-4 flex justify-between">
                                Total<span className="font-bold">Rp. {totalPrice.toLocaleString()}</span>
                            </div>
                            <button className="bg-neutral-900 text-white w-full py-1 rounded-sm">
                                BUY
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            <Toaster />
        </>
    )
}