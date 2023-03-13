
import { useContext, useEffect, useState} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { BsGearFill } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import toast, { Toaster } from 'react-hot-toast'

//import context
import { userData } from '../../data/userData'
import { TransactionData } from '../../data/transactionAdmin'

//import component
import SidebarAdmin from '../../components/sidebarAdmin/sidebaradmin'
import Loading from '../../components/loading/loading'
import TransactionDetail from '../../components/adminContainer/transactionContainer/transactiondetail'

export default function Admin() {
    const location = useLocation()
    const { user, setUser } = useContext(userData)
    console.log(user)
    const { transaction, setTransaction } = useContext(TransactionData)
    let navigate = useNavigate()

    let [openProfile, setOpenProfile] = useState(false)

    let logout = () => {
        toast('Logout..', {
            style: {
                backgroundColor: 'black',
                color: 'white'
            }
        })
        setTimeout(() => {
            setUser(null)
            localStorage.removeItem('token')
            navigate('/login-admin')
        }, 2000)
    }
    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/page-not-found')
    }, [])

    return (
        user ?
            user.role ?
                <div onClick={()=>setOpenProfile(false)}>
                    {
                        transaction == null ?
                            null : <TransactionDetail />
                    }

                    <SidebarAdmin />
                    <div className='text-black pl-60 flex flex-col'>
                        {user.username ?
                            <div className='flex justify-between p-4'>
                                <div className='flex'>
                                    <button className='italic hover:underline'>
                                        Admin
                                    </button>
                                    {/* {
                                        location.pathname.split('/')[2]==undefined || location.pathname.split('/')[2]==''?null:
                                        location.pathname.split('/')
                                    } */}
                                </div>
                                <div className='flex gap-4'>
                            
                                <button className='flex items-center gap-3 '>
                                <img src={require('../../Assets/maxi_2.png')} className="w-10 h-10 object-cover rounded-full" />
                                    <div>
                                        {user.username}
                                    </div>
                                </button>
                                <button className='border-b border-stone-300 py-2 px-3' onClick={() => logout()}>
                                    Logout
                                </button>
                                </div>
                                
                              
                             
                                {/* top bar */}
                            </div>
                            :
                            null
                        }
                        <Outlet />
                    </div>
                    <Toaster />
                </div>
                :
                navigate('/page-not-found')
            :
            <Loading />
    )
}