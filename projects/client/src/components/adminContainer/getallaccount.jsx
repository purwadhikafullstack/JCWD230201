import { useEffect, useState, useContext } from "react"
import axios from 'axios'
import { userData } from '../../data/userData'
import { useNavigate } from "react-router-dom"
import Loading from '../loading/loading'

export default function GetAllAccount() {
    let navigate = useNavigate()

    let { user, setUser } = useContext(userData)

    let [dataAdmin, setDataAdmin] = useState([])

    let getData = async () => {
        let response = await axios.get('http://localhost:8000/admin/getAllUser')
        console.log(response.data.data)
        let loader = [...response.data.data.admin]

        for (let i = 0; i < response.data.data.user.length; i++) {
            loader.unshift(response.data.data.user[i])
        }
        setDataAdmin(loader)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        user.role ?
            user.role == 1 ?
                dataAdmin ?
                    <div className="p-5 flex flex-col gap-2">
                        <div className="flex flex-col gap-1 mb-10" >
                              <div className="text-2xl font-semibold">
                                All Account
                              </div>
                              <div className="text-gray-500 text-sm opacity-60">
                                {dataAdmin.length} account found
                              </div>
                        </div>
                        <div>
                            Here all the active account right now
                        </div>

                        <div className="relative overflow-visible shadow-md  sm:rounded-lg">
                            <table className='w-full text-sm text-left border text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th className="px-6 py-4">
                                            No.
                                        </th>
                                        <th className="px-6 py-4">
                                            Email
                                        </th>
                                        <th className="px-6 py-4">
                                            Name
                                        </th>
                                        <th className="px-6 py-4">
                                            role
                                        </th>
                                        <th className="px-6 py-4">
                                            Phone number
                                        </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        dataAdmin.length == 0 ?
                                            null :
                                            dataAdmin.map((value, index) => {
                                                return (
                                                    value.role == 1 ?
                                                        null :
                                                        <tr>
                                                            <td className="px-6 py-4">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {value.email}
                                                            </td>
                                                            <td className="px-6 py-4"> 
                                                                {value.name}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {
                                                                    value.role ? 'WareHouse Admin' : 'User'
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {value.phone_number ? value.phone_number : '-'}
                                                            </td>

                                                        </tr>
                                                )
                                            })
                                    }

                                </tbody>
                            </table>


                            {/* box */}

                        </div>
                    </div>
                    :
                    <Loading />
                :
                navigate('/*')
            :
            navigate('/page-not-found')
    )
}