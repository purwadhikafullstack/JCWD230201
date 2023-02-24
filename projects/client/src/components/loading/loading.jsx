import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export default function Loading(){
    return(
        <div className="flex h-screen justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters className='animate-spin' size={'50px'}/>
                <div className='text-2xl font-semibold'>
                    Loading...
                </div>
            </div>
        </div>
    )
}