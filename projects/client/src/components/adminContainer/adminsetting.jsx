import { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../data/userData'
import MenuAdminSetting from '../menuDropdown/menuadminsetting'
import Loading from '../loading/loading'
import { AiOutlinePlus, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Modal, Label } from 'flowbite-react'
import toast,{Toaster} from 'react-hot-toast'



export default function AdminSetting() {
    let { user, setUser } = useContext(userData)

    let [update, setUpdate] = useState(false), [dataEmptyWH, setDataEmptyWH] = useState([])

    const [disable, setDisable] = useState(false), [disable2,setDisable2]= useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [typePassword, setTypePassword] = useState('password')
    let password = useRef(),nama=useRef(),imail=useRef(),nomor=useRef()
    let navigate = useNavigate()

    let [dataAdmin, setDataAdmin] = useState([])
    let [add, setAdd] = useState(false)

    let [profile, setProfile] = useState({
        name:'',
        email: '',
        gender: '',
        phone_number:'',
        location_warehouse_id:'',
        password:''
    })
    let getDataWHA = async () => {
        let response = await axios.get('http://localhost:8000/admin/getAdmin')
        console.log(response.data.data)
        setDataAdmin(response.data.data.loader)
    }
    let getEmptyWH = async () => {
        let response = await axios.get('http://localhost:8000/warehouse/AvailableWH')
        setDataEmptyWH(response.data.data)
        console.log(response.data.data)
    }

    let reg = async() =>{
       try {
        let response = await axios.post(`http://localhost:8000/admin/register`,{name:profile.name, email:profile.email, gender:profile.gender, phone_number:profile.phone_number, password:profile.password, location_warehouse_id:profile.location_warehouse_id})
         toast.success(response.data.message)
         setAdd(!add)
         setDisable2(false)
         setTimeout(()=>{
            toast('Loading..')
            window.location.reload(false)
         }, 2000)
       } catch (error) {
        setDisable2(false)
        toast.error(error.response.data.message)
       }
        
    }

    let changeVisiblePassword = () => {
        // console.log('masuk')
        if (typePassword === 'password') {
            setVisiblePassword(true)
            setTypePassword('text')
        } else if (typePassword === 'text') {
            setVisiblePassword(false)
            setTypePassword('password')
        }
    }

    useEffect(() => {
        getDataWHA()
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
                                {dataAdmin.length} Admin Found
                        </div>
                    </div>


                    <div className='flex justify-between mb-5'>
                        <div>
                            Welcome to Admin Settings! here all the active admin!
                        </div>
                        <button onClick={() => {
                            getEmptyWH()
                            setAdd(!add)
                        }} className='p-1 overflow-hidden gap-4 flex items-center duration-300 hover:w-48 w-8 h-8 rounded-xl hover:text-white justify-center hover:bg-emerald-600 font-semibold text-black'>
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
                                        onChange={()=>setProfile({...profile,name:nama.current.value})}
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
                                    <input  onChange={()=>setProfile({...profile,email:imail.current.value})} className='w-full py-2 px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
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
                                    <input  onChange={()=>setProfile({...profile,phone_number:nomor.current.value})} className='w-full py-2 px-2 border border-stone-500 rounded-md focus:ring-transparent focus:border-black'
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
                                        <input onChange={()=>setProfile({...profile,password:password.current.value})} ref={password} disabled={disable} type={typePassword} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-96" />
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
                                            <option  value={null}>Please Choose Warehouse</option>
                                            {
                                                dataEmptyWH.map((item, index) => <option value={item.id}>{item.city}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                    <button disabled={disable2} onClick={() =>{ 
                                        setDisable2(true)
                                        reg()
                                        }} className='border border-stone-800 hover:bg-stone-800 hover:text-white hover:duration-300 mt-4 p-3 w-full text-blacktext-lg font-semibold'>Submit</button>
                    
                            </Modal.Body>
                        </Modal>


                    </div>

                    <div className="relative overflow-visible shadow-md  sm:rounded-lg">
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

                    </div>
                    <Toaster/>
                </div>
                :
                navigate('*')
            :
            <Loading />
    )
}