import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import initialPP from '../../Assets/Blank_PP.jpg'

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { Modal, Button } from 'flowbite-react'

export default function MyAccountInfo() {

    let navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [profile, setProfile] = useState({
        name: '',
        phone_number: '',
        email: '',
        oldpassword: '',
        newpassword: '',
        newConfirmPassword: '',
        photo_profile: []
    })
    const [visible, setVisible] = useState({
        password: false,
        oldPassword: false,
        newPassword: false,
        newConfirmPassword: false,
        check: false
    })
    const [modal, setModal] = useState(false)
    const [inputPassword, setInputPassword] = useState()

    let getProfile = async () => {
        try {
            let { data } = await axios.get(`http://localhost:8000/users/keep-login`, {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            setProfile({ ...profile, name: data.data.name, phone_number: data.data.phone_number, email: data.data.email, photo_profile: data.data.photo_profile })

        } catch (error) {
            console.log(error)
        }
    }

    let onImageValidation = (e) => {
        try {
            let files = [...e.target.files]
            // console.log(files[0])
            setProfile({ ...profile, photo_profile: files })

            if (files.length !== 0) {
                files.forEach((value) => {
                    if (value.size > 1000000) throw { message: `${value.name} more than 1000 Kb` }
                })
            }


        } catch (error) {
            console.log(error)
            setMessage("File Error")
        }
    }

    let updateProfilePicture = async () => {
        try {
            let fd = new FormData()
            fd.append('images', profile.photo_profile[0])

            let data = await axios.post('http://localhost:8000/users/update-photo_profile', fd,{
                headers:{
                    "token":localStorage.getItem('token')
                }
            })
            console.log(data)

            toast.success('Update Profile Picture Success!', {
                style: {
                    background: "black",
                    color: 'white'
                }
            })

            setTimeout(() => {
                setModal(false)
                toast('loading...', {
                    duration: 2500
                })
            }, 2000)

            setTimeout(() => {
                navigate('/my-account/information')
            }, 3000)

        } catch (error) {
            console.log(error)
            toast.error('Error')
        }
    }

    let updateDataProfile = async () => {
        try {
            if (profile.phone_number.length > 13) throw { message: 'Please input valid phone number' }

            await axios.patch('http://localhost:8000/users/update-data_profile', { name: profile.name, phone_number: profile.phone_number }, {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })

            toast.success("Update Profile Success")

            setTimeout(() => {
                navigate('/my-account/information')
            }, 3000)
        } catch (error) {

        }
    }

    // let updatePassword = async () => {
    //     try {
    //         await axios.patch('api masuk', { isinya })
    //     } catch (error) {

    //     }
    // }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <div className="w-full h-screen">
                <div className="border text-xl font-bold px-5 py-2">
                    Change Account Information
                </div>
                <div className="border p-5 grid grid-cols-2">
                    <div className="my-5 flex flex-col items-center">
                        <img src={profile.photo_profile.length !== 0 ? `http://localhost:8000/${profile.photo_profile[0]}` : initialPP} className="w-52 h-52 object-cover rounded-full mr-5" />
                        <div>
                            <Button onClick={() => setModal(!modal)} className="rounded-sm bg-neutral-900 hover:bg-neutral-700 active:ring-0 active:ring-transparent">
                                Change Profile Picture
                            </Button>
                            <Modal
                                show={modal}
                                size="md"
                                popup={true}
                                onClose={() => setModal(!modal)}
                            >
                                <Modal.Header />
                                <Modal.Body>
                                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 text-center">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                            Choose Profile Picture
                                        </h3>
                                        <input type="file" accept="image/*" onChange={(e) => onImageValidation(e)} className="w-full pr-3 border rounded-sm" />
                                        <div>
                                            {message}
                                        </div>
                                        <div className="w-full justify-center flex">
                                            <Button onClick={() => updateProfilePicture()} className="active:ring-0 active:ring-transparent bg-neutral-900 hover:bg-neutral-700 rounded-sm">
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                        
                    </div>

                    <div>
                        <div className="my-5">
                            <p className="font-semibold">Name</p>
                            <input onChange={(e) => setProfile({ ...profile, name: e.target.value })} type='text' defaultValue={profile.name} placeholder='Input your name' className="py-1 px-2 w-full rounded-sm mt-2 focus:ring-transparent focus:border-black" />
                        </div>

                        <div className="my-5">
                            <p className="font-semibold">Phone Number</p>
                            <input onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })} type='text' defaultValue={profile.phone_number} placeholder='Input your phone number' className="py-1 px-2 w-full rounded-sm mt-2 focus:ring-transparent focus:border-black" />
                        </div>

                        <div className="my-5">
                            <p className="font-semibold">Email</p>
                            <input disabled type='text' defaultValue={profile.email} className="py-1 px-2 w-full rounded-sm mt-2 focus:ring-transparent focus:border-black disabled:bg-gray-300 disabled:text-gray-500" />
                        </div>

                        <div className="my-5 flex items-center">
                            <input onChange={() => setVisible({ ...visible, check: visible.check ? false : true })} id="black-checkbox" type="checkbox" value="" className="w-4 h-4 mr-2 text-black bg-gray-100 border-gray-300 rounded-sm focus:ring-transparent" />
                            <p className="font-semibold">Change Password</p>
                        </div>

                        {visible.check ?
                            <>

                                <div className="my-5 items-center">
                                    <p className=" text-lg font-semibold">Change Password</p>
                                    <div className="my-5">
                                        <p className="font-semibold">Your Password</p>
                                        <div className="flex items-center relative">
                                            <input onChange={(e) => setProfile({ ...profile, oldPassword: e.target.value })} type={visible.password ? 'text' : 'password'} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-full" />
                                            <button onClick={() => setVisible({ ...visible, password: visible.password ? false : true })} className="absolute right-3 text-xl" >{visible.password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                                        </div>
                                    </div>
                                    <div className="my-5">
                                        <p className="font-semibold">Your New Password</p>
                                        <div className="flex items-center relative">
                                            <input type={visible.password ? 'text' : 'password'} onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-full" />
                                            <button onClick={() => setVisible({ ...visible, oldPassword: visible.password ? false : true })} className="absolute right-3 text-xl" >{visible.oldPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                                        </div>
                                    </div>
                                    <div className="my-5">
                                        <p className="font-semibold">Confirm New Password</p>
                                        <div className="flex items-center relative">
                                            <input onChange={(e) => setProfile({ ...profile, newConfirmPassword: e.target.value })} type={visible.newConfirmPassword ? 'text' : 'password'} placeholder="Input your password" className="focus:border-black focus:ring-transparent w-full" />
                                            <button className="absolute right-3 text-xl" >{visible.confirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null}


                    </div>
                </div>
                <div className="border py-5 px-5">
                    <button onClick={() => updateProfile()} className="bg-black text-white font-semibold px-10 py-2 rounded-sm">
                        SAVE
                    </button>
                </div>
                <Toaster />
            </div>
        </>
    )
}