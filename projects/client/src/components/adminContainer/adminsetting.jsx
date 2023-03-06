import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../data/userData'
import MenuAdminSetting from '../menuDropdown/menuadminsetting'
import Loading from '../loading/loading'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import { Modal, Label } from 'flowbite-react'



export default function AdminSetting() {
    let { user, setUser } = useContext(userData)
    console.log(user)
    let navigate = useNavigate()

    let [dataAdmin, setDataAdmin] = useState([])
    let [add, setAdd] = useState(false)

    let getDataWHA = async () => {
        let response = await axios.get('http://localhost:8000/admin/getAdmin')
        console.log(response.data.data)
        setDataAdmin(response.data.data.loader)
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
                        Active Admin Registered
                    </div>
                    <div className='flex justify-between mb-5'>
                        <div>
                            Welcome to Admin Settings! here all the active admin!
                        </div>
                        <button onClick={()=> setAdd(!add)} className='p-1 overflow-hidden gap-4 flex items-center duration-300 hover:w-48 w-8 h-8 rounded-xl hover:text-white text-white bg-green-600'>
                            <div><AiOutlinePlus size={'22px'} /></div>
                            <div className='overflow-hidden h-full flex gap-1'>
                                <div>Add</div> <div> New</div> <div> Admin</div>
                            </div>
                        </button>

                        <Modal
                            show={add}
                            size="md"
                            popup={true}
                            onClose={() => setAdd(!add)}>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                                        Add New Warehouse
                                    </h3>

                                </div>
                            </Modal.Body>
                        </Modal>


                    </div>

                    <div className="relative overflow-auto shadow-md  sm:rounded-lg">
                        <table className='w-full text-sm text-left border text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th className="px-6 py-4">
                                        No.
                                    </th>
                                    <th className="px-6 py-4">
                                        Name
                                    </th>
                                    <th className="px-6 py-4">
                                        email
                                    </th>
                                    <th className="px-6 py-4">
                                        Phone number
                                    </th>
                                    <th className="px-6 py-4">
                                        Warehouse
                                    </th>
                                    <th className="px-6 py-4">
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
                                                        <td className="px-6 py-4">
                                                            {index + 1}
                                                        </td>
                                                        <td className='px-6 py-4 flex gap-3'>
                                                            {value.name} {value.gender == "F" ? <BsGenderFemale size={'15px'} /> : <BsGenderMale size={'15px'} />}

                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {value.email}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {value.phone_number ? value.phone_number : '-'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                value.location_warehouse == null ?
                                                                    '-' :
                                                                    value.location_warehouse
                                                            }
                                                        </td>
                                                        <td className='text-center '>
                                                            <MenuAdminSetting data={value} />

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