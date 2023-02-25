import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { userData } from '../../data/userData'
import MenuAdminSetting from '../menu dropdown/menuadminsetting'

import './adminsetting.css'

export default function AdminSetting() {
    let {user,setUser} = useContext(userData)
    let navigate = useNavigate()

    let [dataAdmin, setDataAdmin] = useState([])

    let getDataWHA = async () => {
        let response = await axios.get('http://localhost:8000/admin/getAdmin')
        setDataAdmin(response.data.data.allData)
    }

    let toProfile = async(input) =>{
        navigate(`/admin/profile/${input}`)
    }
    useEffect(() => {
        getDataWHA()
    }, [])

    return (
        user.role==1?
        <div className="p-5 flex flex-col gap-2">
            <div className="text-2xl font-semibold">
                Hello Sir!
            </div>
            <div>
                Welcome to Admin Settings! here all the active admin!
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
                        </tr>

                    </thead>
                    <tbody>

                        {
                            dataAdmin.length == 0 ?
                                null :
                                dataAdmin.map((value, index) => {
                                    return (
                                        value.role==1?
                                        null:
                                        <tr>
                                            <td>
                                                {index+1}
                                            </td>
                                            <td className=''>
                                                <button onClick={()=> toProfile(value.id)} className='hover:text-blue-700 hover:underline-offset-4'>
                                                {value.email}
                                                </button>
                                               
                                            </td>
                                            <td>
                                                {value.name}
                                            </td>
                                            <td>
                                                {value.phone_number?value.phone_number:'-'}
                                            </td>
                                            <td>
                                                {
                                                value.location_warehouse_id==null?
                                                '-':
                                                value.location_warehouse_id
                                                }
                                            </td>
                                            <td>   
                                            <MenuAdminSetting/>
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
    )
}