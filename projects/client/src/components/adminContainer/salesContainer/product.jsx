import LoadingIcon from "../../core/loading"

export default function SalesProduct(data) {
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
           <table className="w-full text-sm text-center border border-red-500 text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Transaction Number
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sold_Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Memory
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.category == [] ?
                        <tr class="bg-stone-500 border-b dark:bg-white  dark:border-white ">
                            <td className="px-6 py-4">
                               <LoadingIcon/>
                            </td>
                            <td className="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <td className="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <th className="px-6 py-4">
                            <LoadingIcon/>
                            </th>
                            <td className="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <td className="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <td className="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <td className="px-6 py-4">
                            <LoadingIcon/>
                            </td>

                        </tr> :
                        data.data.category.map((item, index) => {
                            return (
                                <tr className='border-yellow-300 bg-stone-800 border-b dark:bg-gray-900 dark:border-gray-700 text-slate-200'>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                       {item.transaction.id}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.product_name}
                                    </td>
                                    <td class="px-6 py-4">
                                        {(item.price).toLocaleString()}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        {item.qty}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.color}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        {item.memory_storage != 1000 ? item.memory_storage + ' ' + 'GB' : (item.memory_storage / 1000) + ' ' + 'TB'}
                                    </td>
                                    <td class="px-6 py-4">
                                        {(item.qty * item.price).toLocaleString()}
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}