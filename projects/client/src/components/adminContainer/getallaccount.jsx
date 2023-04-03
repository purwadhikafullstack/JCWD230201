import { useEffect, useState, useContext } from "react"
import axios from 'axios'
import { userData } from '../../data/userData'
import { useNavigate } from "react-router-dom"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function GetAllAccount() {
    let navigate = useNavigate()

    let { user, setUser } = useContext(userData)

    let [dataAdmin, setDataAdmin] = useState({
        user: [],
        total_count: 0,
        total_pages: 0,
        page: 1,
        code: 1,
        loading: true
    }), [shotgun, setShotgun] = useState(['Users', 'Admins'])

    let getData = async (page, code) => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/getAllUser?page=${page}&code=${code}`)

        setDataAdmin({
            ...dataAdmin, user: response.data.data.response, total_count: response.data.data.total_count,
            total_pages: response.data.data.total_pages, page, code, loading: false
        })

    }

    useEffect(() => {
        getData(1, 1)
    }, [])

    return (
        user.role ?
            user.role == 1 ?
                <div className="p-5 flex flex-col gap-2">
                    <div className="flex flex-col gap-1 mb-10" >
                        <div className="text-2xl font-semibold">
                            All Account
                        </div>
                        <div className="text-gray-500 text-sm opacity-60">
                        {dataAdmin.total_count} account found
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {
                            shotgun.map((item, index) => {
                                return (
                                    <button
                                        disabled={dataAdmin.code == index+1 ? true : false}
                                        onClick={() => {
                                            setDataAdmin({ ...dataAdmin, loading:true })
                                            getData(1,index+1)
                                        }} className={`font-semibold relative hover:text-black ${dataAdmin.code == index+1 ? 'underline-offset-4 underline text-black' : 'text-gray-300'}  `}>
                                        {item}
                                    </button>
                                )
                            })
                        }
                    </div>

                    <div className="relative overflow-visible shadow-md  sm:rounded-lg">
                        <table className='w-full text-sm text-left border text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
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
                                    dataAdmin.loading ?
                                        <tr>
                                            <td className="px-6 py-4 text-center">
                                                <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                            </td> <td className="px-6 py-4 text-center">
                                                <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                            </td>
                                        </tr>
                                        :
                                        dataAdmin.user.map((value, index) => {
                                            return (
                                                value.role == 1 ?
                                                    null :
                                                    <tr>
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

                        <div className='flex justify-center p-5 gap-2'>
                            <button
                                disabled={(dataAdmin.page - 1) == 0}
                                onClick={() => {
                                    setDataAdmin({...dataAdmin, loading:true})
                                    getData(dataAdmin.page-1,dataAdmin.code)
                                }} className='font-semibold rounded-l-lg px-4 hover:bg-black hover:text-white'>
                                Previous
                            </button>
                            <div>
                                Page {dataAdmin.page} of {dataAdmin?.total_pages}
                            </div>
                            <button
                                disabled={(dataAdmin.page + 1) > dataAdmin.total_pages}
                                onClick={() => {
                                    setDataAdmin({...dataAdmin, loading:true})
                                    getData(dataAdmin.page+1,dataAdmin.code)
                                }} className='font-semibold rounded-r-lg px-7 hover:bg-black hover:text-white'>
                                Next
                            </button>
                        </div>


                        {/* box */}

                    </div>
                </div>
                :
                navigate('/*')
            :
            navigate('/page-not-found')
    )
}