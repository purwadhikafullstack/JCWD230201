import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from 'react'
import { LoginAccount } from "../../utils/login";
import { userData } from "../../data/userData";
import toast, { Toaster } from "react-hot-toast";



export default function AdminLogin() {
    let [disable, setDisable] = useState(false)
    let navigate = useNavigate()
    const { user, setUser } = useContext(userData)

    let confirmation = (data) => {
        if (data.id == undefined) {
            toast.error(data.response)
            setDisable(false)
        } else {
            setUser(data)
            localStorage.setItem('token', data.id)
            setDisable(false)
            toast.success(data.response, {
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
                        <h1 className="font-bold text-xl">Login into Admin</h1>
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Email</p>
                        <input ref={email} required type='text' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Password</p>
                        <input ref={password} required type='password' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <button disabled={disable} onClick={async () => {
                        setDisable(!disable)
                        let data = await LoginAccount(email.current.value, password.current.value, true)
                        confirmation(data)
                    }} className="bg-blue-500 px-5 py-2 text-white mt-5 rounded w-full">
                        {
                            disable?'Processing...':'login'
                        }
                    </button>
                </div>

                <Toaster />
            </div>
        </>
    )
}