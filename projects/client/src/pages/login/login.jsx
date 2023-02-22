import { Link } from "react-router-dom";
import {useRef} from 'react'

export default function Login(props) {
    let email= useRef()
    let password = useRef()

    return (
        <>
            {/* Main */}
            <div className="flex justify-center items-center h-screen">

                {/* Card */}
                <div className="border-2 border-gray-200 w-max px-5 py-5 rounded-lg shadow-lg">

                    <div>
                        <h1 className="font-bold text-xl">Login</h1>
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Email</p>
                        <input required type='text' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Password</p>
                        <input required type='password' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="flex items-center mr-4">
                        <input id="red-checkbox" type="checkbox" value="" className="w-4 h-4 text-neutral-900 bg-gray-100 border-gray-300 rounded focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="red-checkbox" className="ml-2 text-sm font-medium dark:text-gray-300">Ingat Saya</label>
                    </div>

                    <button onClick={()=> props.funcLogin.loginAaccount(email.current.value, password.current.value)} className="bg-neutral-900 px-5 py-2 mt-5 text-white rounded w-full">
                        Login
                    </button>

                    <div className="mt-3">
                        Don't have an account?
                        <Link to='/register' className="font-bold ml-2 hover:text-gray-700">
                            Register here
                            </Link> 
                    </div>

                </div>

            </div>
        </>
    )
}