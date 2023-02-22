
import {FaUserFriends, FaChevronDown, FaChevronUp, FaUsers, FaUserCog } from 'react-icons/fa'

import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function ManageAccount(){
    let navigate = useNavigate()
    let [toogleMA, setToogleMA] = useState(false)
    return(
        <div className='flex flex-col'>
        {
            toogleMA ?
                <button onClick={() => setToogleMA(!toogleMA)} className='flex ease-out duration-300 items-center gap-3'>
                    <FaUsers size={'20px'} />
                    Manage Account

                    <FaChevronUp className='animate-bounce' />
                </button>
                :
                <button onClick={() => setToogleMA(!toogleMA)} className='flex ease-out duration-300 items-center gap-3 opacity-50 hover:opacity-100'>
                    <FaUsers size={'20px'} />
                    Manage Account

                    <FaChevronDown className='animate-bounce' />
                </button>


        }
        {
            toogleMA ?
                <div className='flex flex-col gap-3 mt-3' >
                    <button className='ml-5 flex text-sm items-center gap-2'>
                        <FaUserFriends size={'20px'} />
                        All Account
                    </button>

                    <button onClick={()=> navigate('setting') } className='ml-5 flex text-sm items-center gap-2'>
                        <FaUserCog size={'18px'} />
                        Admin Settings
                    </button>
                </div>

                :
                null
        }
    </div>
    )
}