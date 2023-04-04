import Moment from 'react-moment';
import {GrTransaction} from 'react-icons/gr'
import {AiOutlineStock} from 'react-icons/ai'
import {BsCurrencyDollar} from 'react-icons/bs'

export default function Dashboard(){
    return(
        <div className=" h-full px-6 py-6">
                <div className="text-xl font-semibold">
                    Analyse data 
                </div>
                <div>Update until :  <Moment format="dddd, DD-MMMM-YYYY" date={new Date()} /></div>

                <div className="flex mt-4 gap-6">
                    <div className='flex gap-8 justify-between'>
                    <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex rounded-md border-b-4 border-yellow-300 text-white group'>
                            <div className='flex items-center justify-center px-4 text-center rounded-full bg-white group-hover:rotate-12 group-hover:duration-200'>
                              <GrTransaction width={'24px'}/>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xl font-semibold'>Active Transaction</p>
                                </div>

                                <div className='flex items-center text-sm gap-1 text-slate-400 '>
                                   109 active all warhouse
                                </div>
                            </div>
                        </div>
                       
                        <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex rounded-md border-b-4 border-yellow-300 text-white group'>
                            <div className='flex items-center justify-center text-black px-4 text-center rounded-full bg-white group-hover:rotate-12 group-hover:duration-200'>
                              <AiOutlineStock width={'30px'}/>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xl font-semibold'>Total Stock Item:</p>
                                </div>

                                <div className='flex items-center text-sm gap-1 text-slate-400 '>
                                  3000 Stock in all warhouse
                                </div>
                            </div>
                        </div>
                        <div className='h-20 gap-5 px-4 py-3 bg-stone-800 flex rounded-md border-b-4 border-yellow-300 group'>
                            <div className='flex items-center justify-center px-4 text-center rounded-full text-black bg-white group-hover:rotate-12 group-hover:duration-200'>
                              <BsCurrencyDollar width={'30px'}/>
                            </div>
                            <div className='flex flex-col items-end'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xl font-semibold text-white'> Transaction Success</p>
                                </div>

                                <div className='flex items-center text-sm gap-1 text-slate-400 '>
                                   50 Success Transaction
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
    )
}