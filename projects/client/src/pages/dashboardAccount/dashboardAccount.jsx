import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userData } from "../../data/userData"

export default function DashboardAccount() {

    const { user, setUser } = useContext(userData)

    const [userProfile, setUserProfile] = useState('')

    let getProfile = async () => {
        try {
            let data = await axios.get(`http://localhost:8000/users/keep-login`, {
                headers: {
                    "token": localStorage.getItem('token')
                }
            })
            console.log(data.data.data)
            setUserProfile(data.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <div className="w-full h-screen">
                <div className="border border-gray-300 flex px-5 py-2">
                    <div className="text-xl font-semibold mr-2">Welcome,</div>
                    <div className="text-xl font-bold ">{userProfile.name}</div>
                </div>
            </div>
        </>
    )
}