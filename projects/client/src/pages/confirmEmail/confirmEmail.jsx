import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Spinner } from "flowbite-react"

export default function ConfirmEmail() {

    let email = useRef()

    const [disabledButton, setDisabledButton] = useState(false)

    let onConfirmEmail = async () => {
        try {
            let inputEmail = email.current.value

            if (!inputEmail) throw { message: 'Incomplete Input' }

            if (!inputEmail.includes('@') && !inputEmail.includes('.com')) throw { message: 'Please input a valid email' }

            setDisabledButton(true)

            await axios.post(`http://localhost:8000/users/confirm-email`, { email: inputEmail })

            toast.success(`Please check your email`)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally{
            setDisabledButton(false)
        }
    }

    // if (statusUser === 'Verified') {
    //     return <Navigate to='/login' />
    // }

    return (
        <>
            <div className="pt-28 flex justify-center items-center h-screen">
                <div className="flex flex-col h-max w-max px-5 py-3 border border-gray-500 shadow-xl rounded">
                    <div className="flex justify-start font-bold text-3xl py-2 border-b-2 border-gray-300">
                        Reset Password
                    </div>

                    <div className="py-3">
                        Input your email to get link to reset your password.
                    </div>

                    <div className="pb-3 font-semibold">
                        Email
                    </div>
                    <div className="flex items-center">
                        <input ref={email} type='text' placeholder="Input your email" className="focus:border-black focus:ring-transparent w-96" />
                    </div>
                    <button disabled={disabledButton} onClick={() => onConfirmEmail()} className="bg-neutral-900 px-5 py-3 mt-5 text-white w-full">
                        {disabledButton ? <Spinner
                            aria-label="Medium sized spinner example"
                            size="md"
                        /> :'Submit'}
                    </button>

                </div>
                <Toaster />
            </div>
        </>
    )
}