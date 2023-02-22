import axios from "axios";
import { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Register() {

    const [disabledButton, setDisabledButton] = useState(false)

    let fullName = useRef()
    let email = useRef()
    let phoneNumber = useRef()

    let onSubmit = async () => {
        try {
            let inputName = fullName.current.value
            let inputEmail = email.current.value
            let inputPhoneNumber = phoneNumber.current.value

            if (inputName.length === 0 || inputEmail.length === 0 || inputPhoneNumber.length === 0) throw { message: 'Incomplete Input' }

            if (!inputEmail.includes('@') && !inputEmail.includes('.com')) throw { message: 'Please input a valid email' }

            if (isNaN(inputPhoneNumber)) throw { message: 'Please input a number' }

            setDisabledButton(true)
            let result = await axios.post(`http://localhost:8000/users/register`, { name: inputName, email: inputEmail, phone_number: inputPhoneNumber })
            console.log(result)
            setInterval(
                toast.success(result.data.message)
                , 2000);
            fullName.current.value = ''
            email.current.value = ''
            phoneNumber.current.value = ''

        } catch (error) {
            // console.log(error)
            toast.error(error.message)
            fullName.current.value = ''
            email.current.value = ''
            phoneNumber.current.value = ''
            setDisabledButton(false)
        }
    }


    return (
        <>
            {/* Main */}
            <div className="flex justify-center items-center h-screen">

                {/* Card */}
                <div className="border-2 border-gray-200 w-max px-5 py-5 rounded-lg shadow-lg">

                    <div className="border-b-2 w-full pb-3">
                        <h1 className="font-bold text-xl">Create an Account</h1>
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Full Name</p>
                        <input ref={fullName} required type='text' placeholder="Input your full name" className="py-1 px-2 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Email</p>
                        <input ref={email} required type='email' placeholder="Input your email" className="py-1 px-2 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Phone Number</p>
                        <input ref={phoneNumber} required type='text' placeholder="Input your phone number" className="py-1 px-2 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <button disabled={disabledButton} onClick={onSubmit} className="bg-neutral-900 px-5 py-3 mt-3 text-white rounded w-full">
                        Create an Account
                    </button>

                    <div className="mt-2 flex justify-center">
                        Already have an account? <Link to='/login' className="font-bold hover:text-gray-700 ml-2">Login Here</Link>
                    </div>

                </div>
                <Toaster />
            </div>
        </>
    )
}