
import {FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { BiCoinStack } from 'react-icons/bi'

import { useEffect, useState } from "react"
import { useNavigate,useLocation } from 'react-router-dom'
export default function Transaction() {
    let navigate = useNavigate()
    let [toogleMA, setToogleMA] = useState(false)
    let [shotgun, setShotgun] = useState([
        'All Transaction','Waiting For Confirmation', 'Waiting For Payment', 'Processing', 'Shipped', 'Order Confirmed', 'Canceled'
    ])

    let location = useLocation()

    
        useEffect(()=>{
            if(location.pathname.split('/')[2]=='All-Transaction'){setToogleMA(true)}
        },[])

    return (
        <div className='flex flex-col'>
            <button onClick={() => setToogleMA(!toogleMA)} className={`flex gap-3 items-center ${location.pathname.split('/')[2]=='All-Transaction'?'':'hover:opacity-100 duration-300'} ${toogleMA ? 'opacity-100' : 'opacity-50'}`}>
                <BiCoinStack size={'20px'} />
                Transaction
                {
                    toogleMA ? <FaChevronUp className='animate-bounce' /> : <FaChevronDown className='animate-bounce' />
                }
            </button>

            {
                toogleMA ?
                    <div className='flex flex-col gap-3 mt-3 '>
                        {shotgun.map((item, index) => {
                            return (
                                <button onClick={()=>navigate(item.replace(/\s+/g, '-'))} className={`ml-8 flex items-center text-sm gap-2 ${location.pathname.split('/')[2]==item.replace(/\s+/g, '-')?'':'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'} `}>
                                    {item}
                                </button>
                                )})}
                    </div>
                    :
                    null
            }
        </div>
    )
}