import { TbBuildingWarehouse } from 'react-icons/tb'
import { MdOutlineSpaceDashboard, MdAssignment } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userData } from "../../data/userData";

//import components
import ManageAccount from '../manageAccount/manageaccount'

export default function SidebarAdmin(){
    let {user,setUser} = useContext(userData)
    console.log(user)
   
    let navigate = useNavigate()
    return(
        <div className="flex flex-col px-5 py-5 w-1/5 h-screen bg-black text-white">
        <div className='mb-10 text-center text-3xl font-semibold'>
            iFrit
        </div>

        <div className='flex flex-col gap-4'>
            <div>
                <button onClick={()=>navigate('/admin')} className='flex items-center gap-3 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
                    <MdOutlineSpaceDashboard size={'20px'} />
                    Dashboard
                </button>
            </div>
            
            {
            user.role==1?
            <ManageAccount />:null
            }
           
            

            <button className='flex items-center opacity-50 ease-in focus:text-white duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100 gap-3 '>
                <TbBuildingWarehouse     size={'20px'} />
                Warehouse
            </button>

            <button className='flex items-center opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100 gap-3 '>
                <MdAssignment size={'20px'} />
                Sales Reports
            </button>


        </div>

       
        {/* sidebar */}
    </div>
    )
}