

//assets
import error from '../../Assets/data_not_found.jpg'

export default function ErrorAdmin(){
    return(
        
        <div className='flex flex-col items-center justify-center h-full mb-10'>
               
                   <img src={error} className="h-2/3 w-1/2" alt="Page not found 404" />
            
                <div className='text-3xl font-bold'>
                   OOOOPPPPSSSSSIIEEE!!!
                </div>
                <div className='text-3xl font-bold mt-5'>
                    PAGE NOT FOUND
                </div>
        </div>
    )
}