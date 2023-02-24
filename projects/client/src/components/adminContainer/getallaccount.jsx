import { useEffect,useState,useContext } from "react"
import axios from 'axios'
import { userData } from '../../data/userData'
import { useNavigate } from "react-router-dom"

export default function GetAllAccount(){
    let navigate = useNavigate()
    
    let {user, setUser} = useContext(userData)

    let [dataAdmin, setDataAdmin] = useState([])

    let getData = async () => {
        let response = await axios.get('http://localhost:8000/admin/getAllUser')
        console.log(response.data.data)
        let loader = [...response.data.data.admin]
        
        for(let i =0;i<response.data.data.user.length;i++){
                loader.unshift(response.data.data.user[i])
        }
        setDataAdmin(loader)
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        user.role?
            user.role==1?
        <div className="p-5 flex flex-col gap-2">
        <div className="text-2xl font-semibold">
            Hello Sir!
        </div>
        <div>
            Here all the active account right now
        </div>

        <div className=" h-full">
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className=''>
                            No.
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Role
                        </th>
                        <th>
                            Phone number
                        </th>
                        
                    </tr>

                </thead>
                <tbody>
                {
                            dataAdmin.length == 0 ?
                                null :
                                dataAdmin.map((value, index) => {
                                    return (
                                        value.role==1?
                                        null:
                                        <tr>
                                            <td>
                                                {index+1}
                                            </td>
                                            <td className=''>
                                                <button className='hover:text-blue-700 hover:underline-offset-4'>
                                                {value.email}
                                                </button>
                                               
                                            </td>
                                            <td>
                                                {value.name}
                                            </td>
                                            <td>
                                                {
                                                value.role?'WareHouse Admin':'User'
                                            }
                                            </td>
                                            <td>
                                                {value.phone_number?value.phone_number:'-'}
                                            </td>
                                           
                                        </tr>
                                    )
                                })
                        }
                   
                </tbody>
            </table>


            {/* box */}

        </div>
    </div>
    :
    navigate('/page-not-found')
    :
    navigate('/page-not-found')
    )
}