
import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { userData } from '../../data/userData'

//import component
import SidebarAdmin from '../../components/sidebarAdmin/sidebaradmin'


export default function Admin() {
    const {user, setUser} = useContext(userData)
    console.log(user)

    return (
        <div className='flex'>
            <SidebarAdmin />
            <div className='text-black border w-4/5 flex flex-col'>

                <div>
                    Username Admin Right Now :
                    {user.username?
                        <span>{user.username}</span>
                        :
                        <span>login dulu</span>
                    }
                    {/* top bar */}
                </div>



                <Outlet />

                <div>
                    this is content
                </div>
                {/* after sidebar */}
            </div>

        </div>

    )
}