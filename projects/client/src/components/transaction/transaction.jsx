
import {FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { BiCoinStack } from 'react-icons/bi'

import { useEffect, useState } from "react"
import { useNavigate,useLocation } from 'react-router-dom'
export default function Transaction() {
    let navigate = useNavigate()
    let [toogleMA, setToogleMA] = useState(false)
    let [shotgun, setShotgun] = useState([
        'Transaction', 'Waiting For Payment','Waiting For Confirmation', 'Processing', 'Shipped', 'Order Confirmed', 'Canceled'
    ])

    let location = useLocation()

    
        useEffect(()=>{
            if(location.pathname.split('/')[2]=='All-Transaction'){setToogleMA(true)}
        },[])

    return (
            <button onClick={() => navigate('Transaction')} className={`flex items-center gap-3 ${location.pathname.split('/')[2] == 'Transaction' ? '' : 'opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'}`}>
                <BiCoinStack size={'20px'} />
                Transaction
            </button>
            

    )
}