import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { userData } from "../../data/userData";
import { LoginAccount } from "../../utils/login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {

    const [disable, setDisable] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [typePassword, setTypePassword] = useState('password')

    let navigate = useNavigate()

    const { user, setUser } = useContext(userData)

    let email = useRef()
    let password = useRef()

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
                navigate('/')
            }, 3000)
        }

    }

    let changeVisiblePassword = () => {
        // console.log('masuk')
        if (typePassword === 'password') {
            setVisiblePassword(true)
            setTypePassword('text')
        } else if (typePassword === 'text') {
            setVisiblePassword(false)
            setTypePassword('password')
        }
    }


    return (
        <>
            {/* Main */}
            <div className="flex justify-center items-center h-screen">
                {/* Card */}
                <div className="border-2 border-gray-200 w-max px-5 py-3 rounded-sm">

                    <div className="border-b-2 pb-3">
                        <h1 className="font-bold text-lg md:text-2xl">Login</h1>
                    </div>

                    <div>
                        <div className="py-3 font-semibold">
                            Email
                        </div>
                        <input disabled={disable} ref={email} type='text' placeholder="Input your email" className="focus:border-black focus:ring-transparent w-full md:w-96 rounded-sm" />
                    </div>

                    <div>
                        <div className="py-3 font-semibold">
                            Password
                        </div>
                        <div className="flex items-center relative">
                            <input disabled={disable} ref={password} type={typePassword} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-full md:96 rounded-sm" />
                            <button className="absolute right-3 text-xl" onClick={changeVisiblePassword}>{visiblePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                        </div>
                    </div>

                    <button disabled={disable} onClick={async () => {
                        setDisable(!disable)
                        let data = await LoginAccount(email.current.value, password.current.value, false)
                        confirmation(data)
                    }} className="bg-neutral-900 px-5 py-2 mt-5 text-white w-full">
                        Login
                    </button>

                    <div className="mt-3 flex justify-center">
                        Don't have an account?
                        <Link to='/register' className="font-bold ml-2 hover:text-gray-700">
                            Register here
                        </Link>
                    </div>

                    <div className="mt-3 flex justify-center">
                        <Link to='/confirm-email' className="font-bold ml-2 hover:text-gray-700">
                            Forgot Password
                        </Link>
                    </div>

                </div>
            </div>
            <Toaster />
        </>
    )
}