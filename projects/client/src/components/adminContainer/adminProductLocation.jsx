import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import AdminProductListLocation from "./adminProductListLocation";
import { userData } from "../../data/userData"

export default function AdminProductLocation(){
    let {user} = useContext(userData)
        console.log(user)

    const [locationName, setLocationName] = useState([])
    const [locationProduct, setLocationProduct] = useState([])
    const [locationCity, setLocationCity] = useState("")
    const [initialCity, setInitialCity] = useState(1)
    const [showPage, setShowPage] = useState(1)

    let getLocation = async()=>{
        try {
            let response = await axios.get('http://localhost:8000/location')
            console.log(response.data.data);
            setLocationName(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    let getLocationProduct = async(id, _page, btn)=>{
        try {
            console.log(_page)
            let response = await axios.get(`http://localhost:8000/location/location-product/${id?id:initialCity}?page=${_page?_page:showPage}`)
            console.log("ada")
            console.log(response);
            setShowPage({page: response.data.page, pages: response.data.pages, total: response.data.total})
            setLocationCity(response.data.response[0].city);
            console.log(locationCity);
            setLocationProduct(response.data.data);
            console.log(locationProduct);
            if(btn==="next"){
                _page = Number(_page) + 1
                let response = await axios.get(`http://localhost:8000/location/location-product/${id?id:initialCity}?page=${_page?_page:showPage}`)
                console.log(response);
                setShowPage({page: response.data.page, pages: response.data.pages, total: response.data.total})
                setLocationCity(response.data.response[0].city);
                console.log(locationCity);
                setLocationProduct(response.data.data);
                console.log(locationProduct);
            }else if(btn==="prev"){
                _page = Number(_page) - 1
                let response = await axios.get(`http://localhost:8000/location/location-product/${id?id:initialCity}?page=${_page?_page:showPage}`)
                console.log(response);
                setShowPage({page: response.data.page, pages: response.data.pages, total: response.data.total})
                setLocationCity(response.data.response[0].city);
                console.log(locationCity);
                setLocationProduct(response.data.data);
                console.log(locationProduct);
            }
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
      getLocation()
      user.role==1?getLocationProduct():getLocationProduct(user.warehouse_id)
      getLocationProduct(showPage)
    }, [])
    

    return(
        <div className="p-5 flex flex-col gap-8 min-h-screen">
            <div className="text-2xl font-semibold">
                Products Warehouse
            </div>
            {
                user.role==1?
                <div className="border rounded-sm flex justify-between w-full">
                    <div className="flex gap-5 py-3 px-5 overflow-y-hidden">
                    {locationName.map((value, index)=>{
                        return(
                            <Link to={`/admin/products-location/${value.id}`}>
                                <button onClick={()=>{console.log(value.id);getLocationProduct(value.id, showPage.page)}} className="border border-gray-400 px-3 py-2 rounded hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white min-w-[100px] ">
                                    {value.city}
                                </button>
                            </Link>
                        )
                    })}
                    </div>
                </div>:null
            }
            
            <div className="text-center text-3xl font-semibold">
                {locationCity}'s Warehouse
            </div>
            <div>
                <AdminProductListLocation func={{getLocation, getLocationProduct}} data={{locationName, locationProduct, locationCity, showPage}}/>
            </div>
        </div>
    )
}