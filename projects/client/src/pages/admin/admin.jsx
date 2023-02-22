
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

//import component
import SidebarAdmin from '../../components/sidebarAdmin/sidebaradmin'


export default function Admin(props) {

    console.log(props.data.username)

    return (
        <div className='flex'>
            <SidebarAdmin/>
            <div className='text-black border w-4/5 flex flex-col'>

                <div>
                This is Top Bar Admin
                    {/* top bar */}
                </div>
                
                     
                        
                <Outlet/>
                
                <div>
                    this is content
                </div>
                {/* after sidebar */}
            </div>

        </div>

    )
}