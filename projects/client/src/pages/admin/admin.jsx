
import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import toast, { Toaster } from 'react-hot-toast'
import { RiArrowDropDownLine, RiNotificationBadgeLine } from 'react-icons/ri'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsClock, BsFillChatDotsFill } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'

//import context
import { userData } from '../../data/userData'
import { TransactionData } from '../../data/transactionAdmin'

//import component
import SidebarAdmin from '../../components/sidebarAdmin/sidebaradmin'
import Loading from '../../components/loading/loading'
import TransactionDetail from './../../components/transaction/transactiondetail'

export default function Admin() {
    const location = useLocation()
    const { user, setUser } = useContext(userData)
    const { transaction, setTransaction } = useContext(TransactionData)
    let navigate = useNavigate()
    let [tugel, setTugel] = useState(false)

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
                <div>
                    {
                        transaction == null ?
                            null : <TransactionDetail />
                    }

                    <SidebarAdmin />
                    <div className='text-black pl-60 flex flex-col'>
                        {user.username ?
                            <div className='absolute z-20 right-0 top-0 p-5'>
                                <div className='flex items-center gap-6'>
                                    <button className='p-2 hover:bg-stone-200 rounded-full'>
                                        <RiNotificationBadgeLine size={'18px'} />
                                    </button>
                                    <button className=' p-2 hover:bg-stone-200 rounded-full'>
                                        <AiOutlineSearch size={'20px'} />
                                    </button>
                                    <div className='relative group inline-block'>
                                        <button onClick={() => setTugel(!tugel)} className='flex items-center '>
                                            <img src={require('../../Assets/maxi_2.png')} className="w-10 h-10 object-cover rounded-full" />
                                            <RiArrowDropDownLine color='gray' size={'28px'} />
                                        </button>
                                        <div className={`absolute hidden hover:block group-hover:block right-0 pt-1 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1">
                                                <div className='px-4 py-2 font-semibold'>
                                                    {user.username}
                                                </div>
                                                <a href="#" className="text-gray-700 block px-4 py-2 hover:bg-violet-700 hover:text-white  text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
                                                <button onClick={() => logout()} className="text-gray-700 hover:bg-violet-700 hover:text-white block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>

                                            </div>
                                        </div>
                                    </div>

                                    {/* <button className='border-b border-stone-300 py-2 px-3' onClick={() => logout()}>
                                    Logout
                                </button> */}
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