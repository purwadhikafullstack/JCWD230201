import { TbBuildingWarehouse, TbReportAnalytics } from 'react-icons/tb'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { BsMailbox } from 'react-icons/bs'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { userData } from "../../data/userData";

//import components
import ManageAccount from '../manageAccount/manageaccount'
import Transaction from '../transaction/transaction';
import ManageProduct from '../manageProduct/manageProduct'

export default function SidebarAdmin() {
    let [visible, setVisible] = useState({
        sidebar: false
    })

    let location = useLocation()
    // console.log(location.pathname.split('/'))
    let { user, setUser } = useContext(userData)

    let navigate = useNavigate()
    return (
        <div className="fixed px-5 py-5 w-60 h-screen text-white bg-black z-0">
            <div className='flex flex-col h-full'>
                <button onClick={() => navigate('/')} className="w-12 ml-3 mb-10 object-contain relative flex items-end">
                    <div className="absolute text-3xl">I</div>
                    <img src={require('../../Assets/logo black.jpg')} alt="" />
                    <div className="absolute ml-6 text-3xl">
                        rit
                    </div>
                </button>
                <div className='flex flex-col gap-8'>
                    <button onClick={() => navigate('/admin')} className={`flex items-center gap-3 ${location.pathname.split('/')[2] == undefined || location.pathname.split('/')[2] == '' ? '' : 'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'}`}>
                        <MdOutlineSpaceDashboard size={'20px'} />
                        Dashboard
                    </button>
                    {
                        user.role == 1 ?
                            <div className='flex flex-col gap-8'>
                                <ManageAccount />
                                <button onClick={(() => navigate('warehouse'))} className={`flex items-center gap-3 ${location.pathname.split('/')[2] == 'warehouse' ? '' : 'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'}`}>
                                    <TbBuildingWarehouse size={'20px'} />
                                    Warehouse
                                </button>

                            </div>
                            : null
                    }
                    <Transaction />

                    <button onClick={() => navigate('sales-report')} className={`flex items-center ${location.pathname.split('/')[2] == 'sales-report' ? '':'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'}  gap-3 `}>
                        <TbReportAnalytics size={'20px'} />
                        Sales Reports
                    </button>
                    <ManageProduct/>
                    {
                        user.role == 2 ?
                            <button onClick={() => navigate('mutation')} className='flex items-center opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100 gap-3 '>
                                <BsMailbox size={'20px'} />
                                Mutation
                            </button>
                            :
                            null
                    }
                </div>

                <div className='flex flex-col items-center justify-end h-full'>
                    <div>
                        Copyrights JCWD2301
                    </div>
                </div>
                {/* sidebar */}
            </div>
        </div>
    )
}