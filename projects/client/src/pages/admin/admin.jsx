
import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { userData } from '../../data/userData'
import { BsGearFill } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import toast, {Toaster} from 'react-hot-toast'

//import component
import SidebarAdmin from '../../components/sidebarAdmin/sidebaradmin'
import Loading from '../../components/loading/loading'

export default function Admin() {
    const { user, setUser } = useContext(userData)
    console.log(user)
    let navigate = useNavigate()

    let logout = () =>{
        toast('Logout..',{
            style:{
                backgroundColor:'black',
                color:'white'
            }
        })
        setTimeout(() => {
            setUser(null)
            localStorage.removeItem('token')
            navigate('/login-admin')
        }, 2000)
    }
    useEffect(()=>{
        if(!localStorage.getItem('token')) navigate('/page-not-found')
        
    },[])

    return (
        user?
        user.role?
        <div className='flex'>
            <SidebarAdmin />
            <div className='text-black border w-4/5 flex flex-col'>
                {user.username ?
                    <div className='flex justify-end gap-4 p-4 border shadow-lg border-b-gray-300'>
                      

                        <button onClick={()=>logout()}>
                            <BsGearFill className='animate-spin'/>
                        </button>

                        <button className='flex items-center gap-3 '>
                                <BiUser size={'20px'} />
                            <div>
                            {user.username}
                            </div>
                        </button>
                  {/* top bar */}
                    </div>
                    :
                    null
            }
                <Outlet />
            </div>
            <Toaster/>
        </div>
        :
        navigate('/page-not-found')
        :
        <Loading/>
    )
}