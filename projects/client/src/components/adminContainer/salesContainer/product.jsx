import LoadingIcon from "../../core/loading"




export default function SalesProduct(data) {
    console.log(data.data)
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left bg-stone-800 text-white dark:text-white">
                <thead class="text-xs text-gray-400  uppercase dark:bg-white  dark:text-white">
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
                            <td class="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-white  whitespace-nowrap dark:text-white">
                            <LoadingIcon/>
                            </th>
                            <td class="px-6 py-4 text-center">
                            <LoadingIcon/>
                            </td>
                            <td class="px-6 py-4">
                            <LoadingIcon/>
                            </td>
                            <td class="px-6 py-4 text-center">
                            <LoadingIcon/>
                            </td>
                            <td class="px-6 py-4">
                            <LoadingIcon/>
                            </td>

                        </tr> :
                        data.data.category.map((item, index) => {
                            return (
                                <tr class="bg-stone-500 border-b dark:bg-white  dark:border-white ">
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                       {item.transaction.id}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.product_name}
                                    </td>
                                    <th scope="row" class="px-6 py-4 font-medium text-white  whitespace-nowrap dark:text-white">
                                        {(item.price).toLocaleString()}
                                    </th>
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