import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef } from 'react'
import { LoginAccount } from "../../utils/login";
import { userData } from "../../data/userData";
import toast, { Toaster } from "react-hot-toast";



export default function Login(props) {

    let navigate = useNavigate()
    const { user, setUser } = useContext(userData)

    let confirmation = (data) => {
        if (data == null) return toast.error('Email or Password Error!')
        setUser(data)
        localStorage.setItem('token', data.id)
        toast.success('Login Success!', {
            style: {
                background: "black",
                color: 'white'
            }
        })

        setTimeout(() => {
            toast('redirecting...', {
                duration: 2500
            })
        }, 2000)

        setTimeout(() => {
            navigate('/admin')
        }, 3000)
    }

    let email = useRef()
    let password = useRef()

    return (
        <>
            {/* Main */}
            <div className="flex relative justify-center items-center h-screen">

                {/* Card */}
                <div className="border-2 border-gray-200 w-max px-5 py-5 rounded-lg shadow-lg">

                    <div>
                        <h1 className="font-bold text-xl">Login</h1>
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Email</p>
                        <input ref={email} required type='text' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Password</p>
                        <input ref={password} required type='password' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="flex items-center mr-4">
                        <input id="red-checkbox" type="checkbox" value="" className="w-4 h-4 text-neutral-900 bg-gray-100 border-gray-300 rounded focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="red-checkbox" className="ml-2 text-sm font-medium dark:text-gray-300">Ingat Saya</label>
                    </div>

                    <button onClick={async () => {
                        let data = await LoginAccount(email.current.value, password.current.value, true)
                        confirmation(data)

                    }} className="bg-neutral-900 px-5 py-2 mt-5 text-white rounded w-full">
                        Login
                    </button>

                    <div className="mt-3">
                        Don't have an account?
                        <Link to='/register' className="font-bold ml-2 hover:text-gray-700">
                            Register here
                        </Link>
                    </div>

                    
                </div>

                <Toaster />
            </div>
        </>
    )
}