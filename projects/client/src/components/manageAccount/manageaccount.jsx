
import {FaUserFriends, FaChevronDown, FaChevronUp, FaUsers, FaUserCog } from 'react-icons/fa'
import {MdOutlineManageAccounts} from 'react-icons/md'
import {FiUsers,FiUserPlus} from 'react-icons/fi'

import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function ManageAccount(){
    let navigate = useNavigate()
    let [toogleMA, setToogleMA] = useState(false)
    return(
        <div className='flex flex-col'>
        <button onClick={() => setToogleMA(!toogleMA)} className={`flex ease-out hover:opacity-100 duration-300 items-center gap-3 ` + (toogleMA?'opacity-100':'opacity-50')}>
                        <MdOutlineManageAccounts size={'23px'} />
                        Manage Account
                        {
                            toogleMA ? <FaChevronUp className='animate-bounce' /> : <FaChevronDown className='animate-bounce' />
                        }
                    </button>
        {
            toogleMA ?
                <div className='flex flex-col gap-3 mt-3' >
                    <button onClick={()=> navigate('all-user') }  className='ml-5 flex text-sm focus:opacity-100 items-center gap-2 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
                        <FiUsers size={'18px'} />
                        All Account
                    </button>

                    <button onClick={()=> navigate('setting') } className='ml-5 flex text-sm focus:opacity-100 items-center gap-2 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
                        <FiUserPlus size={'18px'} />
                        Admin Settings
                    </button>
                </div>

                :
                null
        }
    </div>
    )
}