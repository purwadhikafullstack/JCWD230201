import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Spinner } from "flowbite-react"

export default function Activation(props) {

    let password = useRef()
    let confirmPassword = useRef()

    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

    const [typePassword, setTypePassword] = useState('password')
    const [typeConfirmPassword, setTypeConfirmPassword] = useState('password')

    const [statusUser, setStatusUser] = useState('')

    const [inputPassword, setInputPassword] = useState()

    let { id } = useParams()

    let character = /^.{8,30}$/
    let character1 = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/

    let onActivation = async () => {
        try {
            // let inputPassword = password.current.value
            let inputConfirmPassword = confirmPassword.current.value
            // console.log(inputPassword)
            // console.log(inputConfirmPassword)

            if (inputPassword.length === 0 || inputConfirmPassword.length === 0) throw { message: 'Input not complete' }

            if (inputPassword.length < 8) throw { message: 'Password at least has 8 characters' }

            if (!character1.test(inputPassword)) throw { message: 'Password must contains number' }

            if (inputPassword !== inputConfirmPassword) throw { message: 'Password not match' }

            let result = await axios.patch(`http://localhost:8000/users/reset-password/${id}`, { password: inputPassword })
            console.log(result)

            password.current.value = ''
            confirmPassword.current.value = ''

            toast.success('Account Verified!')

            let resultStatus = await axios.get(`http://localhost:8000/users/getStatus/${id}`)
            setStatusUser(resultStatus.data.data.status)


        } catch (error) {
            console.log(error)
            toast.error(error.message)
            password.current.value = ''
            confirmPassword.current.value = ''
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

    let changeVisibleConfirmPassword = () => {
        // console.log('masuk')
        if (typeConfirmPassword === 'password') {
            setVisibleConfirmPassword(true)
            setTypeConfirmPassword('text')
        } else if (typeConfirmPassword === 'text') {
            setVisibleConfirmPassword(false)
            setTypeConfirmPassword('password')
        }
    }

    let getStatusUser = async () => {
        try {
            let resultStatus = await axios.get(`http://localhost:8000/users/getStatus/${id}`)
            setStatusUser(resultStatus.data.data.status)
            console.log(resultStatus.data.data.status)

        } catch (error) {

        }
    }

    useEffect(() => {
        getStatusUser()
    }, [])

    if (statusUser === 'Verified') {
        return <Navigate to='/login' />
    }

    return (
        <>
            <div className="pt-28 flex justify-center items-center h-screen">
                <div className="flex flex-col h-max w-max px-5 py-3 border border-gray-500 shadow-xl rounded">
                    <div className="flex justify-center font-bold text-3xl py-2 border-b-2 border-gray-500">
                        Welcome to iFrit
                    </div>

                    <div className="py-3 font-semibold">
                        Password
                    </div>
                    <div className="flex items-center relative">
                        <input onChange={(e) => setInputPassword(e.target.value)} ref={password} type={typePassword} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-96" />
                        <button className="absolute right-3 text-xl" onClick={changeVisiblePassword}>{visiblePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                    </div>
                    <div className="py-3 font-semibold">
                        Confirm Password
                    </div>
                    <div className="flex items-center relative">
                        <input ref={confirmPassword} type={typeConfirmPassword} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-96" />
                        <button className="absolute right-3 text-xl" onClick={changeVisibleConfirmPassword}>{visibleConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                    </div>
                    <div className="text-gray-400 font-semibold py-3">
                        <ul>
                            Password
                        </ul>
                        <li className={(!inputPassword ? '' : character.test(inputPassword) ? 'text-green-600' : 'text-red-600')}>At least have 8 characters</li>
                        {/*  */}
                        <li className={(!inputPassword ? '' : character1.test(inputPassword) ? 'text-green-600' : 'text-red-600')}>Must contain Number</li>
                    </div>
                    <button onClick={() => onActivation()} className="bg-neutral-900 px-5 py-3 mt-5 text-white w-full">
                        Submit
                    </button>

                </div>
                <Toaster />
            </div>
        </>
    )
}