import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Badge } from "flowbite-react"

export default function DetailTransaction() {
    const { id } = useParams()

    const [transactionDetail, setTransactionDetail] = useState({})
    const [product, setProduct] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

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
                courier: response.data.data.courier.split(',')[1],
                status: response.data.data.order_status.status,
                statusID:response.data.data.order_status.id,
                ongkir: response.data.data.ongkir
            })
            setProduct(response.data.data.transaction_details)

            let sum = 0
            response.data.data.transaction_details.forEach(e =>
                sum += e.qty * e.price)
            setTotalPrice(sum)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
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
                                className="w-max px-3 rounded-sm"
                            >
                                {transactionDetail.status}
                            </Badge>
                        </div>
                        <div className="px-4 py-5">
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
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
                                    <p className="border-b py-3">
                                        Mercant
                                    </p>
                                    <p className="py-3">
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

                            <div className="grid grid-cols-5 text-left">
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
                                        <div className="grid grid-cols-5 border-b py-4">
                                            <div className="col-span-2 flex items-center">
                                                <img src={`../../Assets/${value.product_img}`} />
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
                                        Rp. {transactionDetail.ongkir}
                                    </p>
                                    <p>
                                        Rp. {(totalPrice + transactionDetail.ongkir).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}