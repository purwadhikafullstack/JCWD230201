import { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../data/userData'
import MenuAdminSetting from '../menuDropdown/menuadminsetting'
import Loading from '../loading/loading'
import { AiOutlinePlus, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Modal, Label } from 'flowbite-react'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'



export default function AdminSetting() {
    let { user, setUser } = useContext(userData)

    let [dataEmptyWH, setDataEmptyWH] = useState([])

    const [visiblePassword, setVisiblePassword] = useState(false)
    const [typePassword, setTypePassword] = useState('password')
    let password = useRef(), nama = useRef(), imail = useRef(), nomor = useRef()
    let navigate = useNavigate()

    let [list, setList] = useState({
        dataAdmin: [],
        loading: true,
        page: 1,
        total_pages: 0,
        total_count: 0,
        disable: false,
        pop: false
    })
    let [add, setAdd] = useState(false)

    let [profile, setProfile] = useState({
        name: '',
        email: '',
        gender: '',
        phone_number: '',
        location_warehouse_id: '',
        password: ''
    })
    let getDataWHA = async (page) => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/getAdmin?page=${page}`)
        setList({ ...list, dataAdmin: response.data.data.loader, total_count: response.data.data.total_count, total_pages: response.data.data.total_pages, loading: false, page })
    }
    let getEmptyWH = async () => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/AvailableWH`)
        setDataEmptyWH(response.data.data)
    }

    let reg = async () => {
        if (!profile.name || !profile.email || !profile.gender || !profile.phone_number || !profile.location_warehouse_id || !profile.password) {
            toast.error('Please input all data first')
            setList({ ...list, pop: false })
        } else {
            try {
                let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/register`, { name: profile.name, email: profile.email, gender: profile.gender, phone_number: profile.phone_number, password: profile.password, location_warehouse_id: profile.location_warehouse_id })
                toast.success(response.data.message)
                setList({ ...list, pop: false })
                setAdd(!add)
                setTimeout(() => {
                    toast('Loading..')
                    window.location.reload(false)
                }, 2000)
            } catch (error) {
                setList({ ...list, pop: false })
                toast.error(error.response.data.message)
            }
        }
    }

    let changeVisiblePassword = () => {
      
        if (typePassword === 'password') {
            setVisiblePassword(true)
            setTypePassword('text')
        } else if (typePassword === 'text') {
            setVisiblePassword(false)
            setTypePassword('password')
        }
    }

    useEffect(() => {
        getDataWHA(1)
    }, [])

    return (
        user ?
            user.role == 1 ?
                <div className="p-5 flex flex-col gap-2">
                    <div className='flex flex-col gap-1 mb-8'>

                        <div className="text-2xl font-semibold">
                            Active Admin Registered
                        </div>
                        <div className='text-gray-500 text-sm opacity-60'>
                            {list.total_count} Admin Found
                        </div>
                    </div>

                    <div className='relative overflow-x-auto shadow-md border p-4 border-y-4 border-blue-500 rounded-md px-12 py-7 bg-stone-800 text-slate-200'>
                        <div className='flex justify-between mb-5'>
                            <div>
                                Welcome to Admin Settings! here all the active admin!
                            </div>
                            <button onClick={() => {
                                getEmptyWH()
                                setAdd(!add)
                            }} className='p-1 overflow-hidden gap-4 flex items-center duration-300 hover:w-48 w-8 h-8 rounded-xl hover:text-white justify-center hover:bg-emerald-600 font-semibold text-white'>
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
                                            Add New Admin
                                        </h3>
                                    </div>
                                    <div className='mb-5'>
                                        <div className="mb-2 block">
                                            <Label
                                                value="Name Admin"
                                            />
                                        </div>
                                        <input className='w-full py-2 px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
                                            ref={nama}
                                            onChange={() => setProfile({ ...profile, name: nama.current.value })}
                                            id="name"
                                            placeholder="Input Name"
                                            required={true}
                                        />
                                    </div>

                                    <div className='my-5'>
                                        <div className="mb-2 block">
                                            <Label
                                                value="Email"
                                            />
                                        </div>
                                        <input onChange={() => setProfile({ ...profile, email: imail.current.value })} className='w-full py-2 px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
                                            ref={imail}
                                            id="name"
                                            placeholder="Input Email"
                                            required={true}
                                        />
                                    </div>


                                    <div className='my-5'>
                                        <div className="mb-2 block">
                                            <Label
                                                value="phone_number"
                                            />
                                        </div>
                                        <input onChange={() => setProfile({ ...profile, phone_number: nomor.current.value })} className='w-full py-2 px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
                                            ref={nomor}

                                            placeholder="Input phone_number"
                                            required={true}
                                        />
                                    </div>

                                    <div className='my-5'>
                                        <div className="mb-2 block">
                                            <Label
                                                value="Password"
                                            />
                                        </div>
                                        <div className="flex items-center relative">
                                            <input onChange={() => setProfile({ ...profile, password: password.current.value })} ref={password} disabled={list.disable} type={typePassword} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-96" />
                                            <button className="absolute right-3 text-xl" onClick={changeVisiblePassword}>{visiblePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                                        </div>
                                    </div>

                                    <div className='flex gap-5'>
                                        <div className='w-1/3'>
                                            <div className="mb-2 block">
                                                <Label
                                                    value="Gender"
                                                />
                                            </div >
                                            <select className='w-full text-sm py-2 px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
                                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                                id="Gender"
                                                placeholder='have a gender?'
                                                required={true}
                                            >
                                                <option value=''>-gender-</option>  <option value="M">M</option> <option value="F">F</option>
                                            </select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    value="Warehouse"
                                                />
                                            </div>
                                            <select className='w-full py-2 text-sm px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
                                                onChange={(e) => setProfile({ ...profile, location_warehouse_id: e.target.value })}
                                                id="warehouse"
                                                required={true}
                                            >
                                                <option value={null}>Please Choose Warehouse</option>
                                                {
                                                    dataEmptyWH.map((item, index) => <option value={item.id}>{item.city}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        setList({ ...list, pop: true })
                                    }} className='border border-stone-800 hover:bg-stone-800 hover:text-white hover:duration-300 mt-4 p-3 w-full text-blacktext-lg font-semibold'>Submit</button>

                                </Modal.Body>
                            </Modal>

                            <Modal

                                show={list.pop}
                                size="md"
                                popup={true}
                                onClose={() => setList({ ...list, pop: false })}
                            >
                                <Modal.Header />


                                <Modal.Body>
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="flex flex-col items-center justify-center">

                                            <lottie-player
                                                autoplay
                                                loop
                                                mode="normal"
                                                src="https://assets3.lottiefiles.com/packages/lf20_q4wbz787.json"
                                                style={{ width: "200px" }}    ></lottie-player>



                                            <h3 className="mb-5 mt-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                Are you sure to register this admin?
                                            </h3>
                                            <div className='flex gap-3'>
                                                <button
                                                    disabled={list.disable}
                                                    onClick={() => {
                                                        setList({ ...list, disable: true })
                                                        reg()
                                                    }} data-modal-hide="popup-modal" type="button" className={`text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}>
                                                    Yes, add
                                                </button>
                                                <button disabled={list.disable} onClick={() => setList({ ...list, pop: false })} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                            </div>

                                        </div>
                                    </div>
                                </Modal.Body>

                            </Modal>


                        </div>

                        <div className="relative overflow-visible shadow-md z-0  sm:rounded-lg">
                        <table className="w-full text-sm text-center border border-blue-500 text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">
                                            Name
                                        </th>
                                        <th className="px-6 py-4">
                                            Gender
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
                                        list.loading ?
                                            <tr>
                                                <td className="px-6 py-4 text-center">
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
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <AiOutlineLoading3Quarters className='animate-spin' size={'20px'} />
                                                </td>
                                            </tr>
                                            :
                                            list.dataAdmin.map((value, index) => {
                                                return (
                                                    value.role == 1 ?
                                                        null :
                                                        <tr className='border-blue-500 bg-stone-800 border-b dark:bg-gray-900 dark:border-gray-700 text-slate-200'>
                                                            <td className='px-6 py-4 gap-3'>
                                                                {value.name ? value.name : '-empty-'}
                                                            </td>
                                                            <td className='px-6 py-4 gap-3'>
                                                                {value.gender == "M" ? "Male" : "Female"}
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
                            <div className='flex justify-center p-5 gap-2'>
                                <button
                                    disabled={(list.page - 1) == 0}
                                    onClick={() => {
                                        setList({ ...list, loading: true })
                                        getDataWHA(list.page - 1)
                                    }} className='font-semibold rounded-l-lg px-4 hover:bg-white hover:text-black'>
                                    Previous
                                </button>
                                <div>
                                    Page {list.page} of {list?.total_pages}
                                </div>
                                <button
                                    disabled={(list.page + 1) > list.total_pages}
                                    onClick={() => {
                                        setList({ ...list, loading: true })
                                        getDataWHA(list.page + 1)
                                    }} className='font-semibold rounded-r-lg px-7 hover:bg-white hover:text-black'>
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>

                    <Toaster />
                </div>
                :
                navigate('*')
            :
            <Loading />
    )
}