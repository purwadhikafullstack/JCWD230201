
import {FaChevronDown, FaChevronUp, FaBox, FaBoxes } from 'react-icons/fa'
import { BsFillInboxesFill } from 'react-icons/bs'

import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function ManageProduct(){
    let navigate = useNavigate()
    let [toogleMA, setToogleMA] = useState(false)
    return(
        <div className='flex flex-col'>
        <button onClick={() => setToogleMA(!toogleMA)} className={`flex ease-out hover:opacity-100 duration-300 items-center gap-3 ` + (toogleMA?'opacity-100':'opacity-50')}>
                        <FaBox size={'18px'} />
                        Manage Product
                        {
                            toogleMA ? <FaChevronUp className='animate-bounce' /> : <FaChevronDown className='animate-bounce' />
                        }
                    </button>
        {
            toogleMA ?
                <div className='flex flex-col gap-3 mt-3' >
                    <button onClick={() => navigate('products')} className='ml-5 flex text-sm focus:opacity-100 items-center gap-2 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
                        <BsFillInboxesFill size={'18px'} />
                        Products List
                    </button>
                    <button onClick={() => navigate('products-location')} className='ml-5 flex text-sm focus:opacity-100 items-center gap-2 opacity-50 ease-in duration-200 hover:opacity-100 hover:translate-x-6 hover:delay-100'>
                        <FaBoxes size={'20px'} />
                        Products Warehouse
                    </button>
                </div>

                :
                null
        }
    </div>
    )
}