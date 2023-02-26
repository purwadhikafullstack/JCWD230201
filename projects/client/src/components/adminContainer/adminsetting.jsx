import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../data/userData'
import MenuAdminSetting from '../menuDropdown/menuadminsetting'
import Loading from '../loading/loading'
import { AiOutlinePlus } from 'react-icons/ai'

import './adminsetting.css'

export default function AdminSetting() {
    let { user, setUser } = useContext(userData)
    let navigate = useNavigate()

    let [dataAdmin, setDataAdmin] = useState([])

    let getDataWHA = async () => {
        let response = await axios.get('http://localhost:8000/admin/getAdmin')
        setDataAdmin(response.data.data.allData)
    }

    let toProfile = async (input) => {
        navigate(`/admin/profile/${input}`)
    }
    useEffect(() => {
        getDataWHA()
    }, [])

    return (
        user ?
            user.role == 1 ?
                <div className="p-5 flex flex-col gap-2">
                    <div className="text-2xl font-semibold">
                        Hello Sir!
                    </div>
                    <div className='flex justify-between mb-5'>
                        <div>
                            Welcome to Admin Settings! here all the active admin!
                        </div>
                        <button onClick={() => navigate('addNewAdmin')} className='p-1 overflow-hidden gap-4 flex items-center duration-300 hover:w-48 w-8 h-8 rounded-xl hover:bg-emerald-600 font-bold text-white bg-emerald-500'>
                            <div><AiOutlinePlus size={'22px'} /></div>
                            <div className='overflow-hidden h-full flex gap-1'>
                                <div>Add</div> <div> New</div> <div> Admin</div>
                                </div>
                        </button>

                    </div>

                    <div className=" h-full">
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th className=''>
                                        No.
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Phone number
                                    </th>
                                    <th>
                                        Location warehouse
                                    </th>
                                    <th>
                                        Action
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
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td className=''>
                                                            {value.email}

                                                        </td>
                                                        <td>
                                                            {value.name}
                                                        </td>
                                                        <td>
                                                            {value.phone_number ? value.phone_number : '-'}
                                                        </td>
                                                        <td>
                                                            {
                                                                value.location_warehouse_id == null ?
                                                                    '-' :
                                                                    value.location_warehouse_id
                                                            }
                                                        </td>
                                                        <td>
                                                            <MenuAdminSetting data={value.id} />

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
                navigate('*')
            :
            <Loading />
    )
}