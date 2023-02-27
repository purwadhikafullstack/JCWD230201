
import {FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { BiCoinStack } from 'react-icons/bi'

import { useState } from "react"
import { useNavigate } from 'react-router-dom'
export default function Transaction() {
    let navigate = useNavigate()
    let [toogleMA, setToogleMA] = useState(false)
    let [shotgun, setShotgun] = useState([
        'All Transaction', 'Waiting For Payment', 'Processing', 'Shipped', 'Order Confirmed', 'Canceled'
    ])
    return (
        <div className='flex flex-col'>
            <button onClick={() => setToogleMA(!toogleMA)} className={`flex ease-out hover:opacity-100 duration-300 items-center gap-3 ` + (toogleMA ? 'opacity-100' : 'opacity-50')}>
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
                                <button onClick={()=>navigate(item.replace(/\s+/g, '-'))} className='ml-5 flex text-sm focus:opacity-100 items-center gap-2 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
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