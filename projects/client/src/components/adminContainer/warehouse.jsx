import { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../data/userData'
import Loading from '../loading/loading'
import { AiOutlinePlus } from 'react-icons/ai'
import { Modal, Button, Label, TextInput } from 'flowbite-react'
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


export default function Warehouse() {
    let { user, setUser } = useContext(userData)
    let navigate = useNavigate()
    let [disable, setDisable] = useState(false)

    let [show, setShow] = useState(false), [show2,setShow2] = useState(false), [popDelete, setPopDelete] = useState(false)
    let onProvince = useRef(), changeProvince = useRef()
    let onCity = useRef(), changeCity = useRef()
    let onSubdistrict = useRef()
    let WH_address = useRef()

    let [dataWH, setDataWH] = useState([]), [chosenWH, setChosenWH] = useState({})
    const [arrProvince, setArrProvince] = useState([]), [changeP, setChangeP] = useState([])
    const [arrCity, setArrCity] = useState([]), [changeC, setChangeC] = useState([])

    let getDataWH = async () => {
        let response = await axios.get('http://localhost:8000/warehouse/getwh')
        setDataWH(response.data.data)
        console.log(response.data.data)
    }
    let postAddress = async () => {
        try {
            if (onProvince.current.value == 'Please Select Province' || onCity.current.value === 'Please Select City') throw { message: 'Incomplete Input' }
            let inputProvince = onProvince.current.value.split(", ")[1]
            let inputWH_Address = WH_address.current.value
            let inputCity = onCity.current.value.split(",")[1]
            let inputSubdistrict = onSubdistrict.current.value
            if (inputProvince.length === 0 || inputCity.length === 0 || inputSubdistrict.length === 0 || inputWH_Address === 0) throw { message: 'Incomplete Input' }
            let response = await axios.post(`http://localhost:8000/warehouse/addWH`, { province: inputProvince, city: inputCity, subdistrict: inputSubdistrict, address: inputWH_Address, city_id: onCity.current.value.split(",")[0], province_id: onProvince.current.value.split(", ")[0] })
            toast.success(response.data.message)
            setShow(!show)
            setTimeout(() => {
                toast('wait..')
            }, 2000)
            setTimeout(() => {
                window.location.reload(false)
            }, 2000)

        } catch (error) {
            setDisable(false)
            toast.error(error.message)
        } finally {
            setDisable(false)
            onProvince.current.value = 'Please Select Province'
            onCity.current.value = 'Please Select City'
            onSubdistrict.current.value = ''
            WH_address.current.value = ''
        }
    }

    let updateWH = async () => {
        try {
            let inputProvince = changeProvince=='Please Select Province'?chosenWH.province: changeProvince.current.value.split(", ")[1]

            let inputWH_Address = WH_address.current.value?WH_address.current.value:chosenWH.address

            let inputCity =changeCity.current.value=='Please Select City'?chosenWH.city:changeCity.current.value.split(",")[1]

            let inputSubdistrict = onSubdistrict.current.value?onSubdistrict.current.value:chosenWH.subdistrict

            let inputCity_id = changeCity.current.value=='Please Select City'?chosenWH.city_id:changeCity.current.value.split(",")[0]

            let inputProvince_id = changeProvince.current.value=='Please Select Province'?chosenWH.province_id:changeProvince.current.value.split(", ")[0]

        
            let response = await axios.post(`http://localhost:8000/warehouse/updateWH`, { id:chosenWH.id, province: inputProvince, city: inputCity, subdistrict: inputSubdistrict, address: inputWH_Address, city_id: inputCity_id, province_id:inputProvince_id })

            toast.success(response.data.message)
            setShow2(!show2)
            setTimeout(() => {
                toast('wait..')
            }, 2000)
            setTimeout(() => {
                window.location.reload(false)
            }, 2000)

        } catch (error) {
            setDisable(false)
            toast.error(error.message)
        } finally {
            setDisable(false)
            changeProvince.current.value = 'Please Select Province'
            changeCity.current.value = 'Please Select City'
            onSubdistrict.current.value = ''
            WH_address.current.value = ''
        }
    }

    let getDataProvince = async () => {
        try {
            let response = await axios.get("http://localhost:8000/rajaongkir/province", {
                headers: {
                    key: "767e2faef8f409adc96f179e3a949442",
                }
            });
            setChangeP(response.data.data)
            setArrProvince(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    let getDataCityforChange = async () => {
        console.log(changeProvince.current.value)
        try {
            let data = await axios.get(`http://localhost:8000/rajaongkir/city?province_id=${changeProvince.current.value.split(",")[0]}`, {
                headers: {
                    key: "767e2faef8f409adc96f179e3a949442",
                },
            });
            setChangeC(data.data.data.results)
        } catch (error) {
            console.log(error);
        }
    };


    let getDataCity = async () => {
        try {
            let data = await axios.get(`http://localhost:8000/rajaongkir/city?province_id=${onProvince.current.value.split(",")[0]}`, {
                headers: {
                    key: "767e2faef8f409adc96f179e3a949442",
                },
            });
            setChangeC(data.data.data.results)
        } catch (error) {
            console.log(error);
        }
    };

    let deleteWH = async() =>{
        let response = await axios.post('http://localhost:8000/warehouse/deleteWH', {id:chosenWH.id})

        toast.success(response.data.message)
            setShow2(!show2)
            setTimeout(() => {
                toast('Wait..')
            }, 2000)
            setTimeout(() => {
                window.location.reload(false)
            }, 2000)
    }


    useEffect(() => {
        getDataWH()
        getDataProvince()
        console.log(onProvince.current.value)
    }, [])

    return (
        user ?
            user.role == 1 ?
                <div className="p-5 flex flex-col gap-8 min-h-screen">
                    <div className="text-2xl font-semibold">
                        Warehouse List
                    </div>
                    <div className='border border-slate-200 bg-slate-100 p-10 h-full rounded-md shadow-indigo-300 shadow-lg'>
                        <div className='flex justify-between mb-5'>
                            <div>
                                Search
                            </div>
                            <Button onClick={() => setShow(!show)} className='p-1 overflow-hidden flex items-center duration-300 hover:w-56 w-8 h-8 rounded-xl hover:bg-emerald-600 hover:text-white font-semibold text-black'>
                                <div><AiOutlinePlus size={'22px'} /></div>
                                <div className='overflow-hidden flex gap-3 ml-5 h-full'>
                                    <div>Add</div> <div> New</div> <div> Warehouse</div>
                                </div>
                            </Button>
                            <Modal
                                show={show}
                                size="md"
                                popup={true}
                                onClose={() => setShow(!show)}
                            >
                                <Modal.Header />
                                <Modal.Body>
                                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                                            Add New Warehouse
                                        </h3>

                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    value="Province"
                                                />
                                            </div>
                                            <select
                                                onChange={() => getDataCity()}
                                                ref={onProvince}
                                                id="province"
                                                className="w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                            >   <option value={null}>Please Select Province</option>
                                                {arrProvince.map((value, index) => {
                                                    return <option value={`${value.province_id}, ${value.province}`}>{value.province}</option>;
                                                })}
                                            </select>
                                        </div>
                                        {
                                            arrCity.length > 0 ?
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label
                                                            value="City"
                                                        />
                                                    </div>
                                                    <select
                                                        ref={onCity}

                                                        id="city"
                                                        className="w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                                    >   <option value={null}>Please Select City</option>
                                                        {arrCity.map((value, index) => {
                                                            return (
                                                                <option value={`${value.city_id},${value.city_name}`}>{value.city_name}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                : null
                                        }
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    value="Subdisctrict"
                                                />
                                            </div>
                                            <input className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={onSubdistrict}
                                                id="Subdisctrict"
                                                placeholder="Subdistrict"
                                                required={true}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    value="Address"
                                                />
                                            </div>
                                            <input className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={WH_address}
                                                id="Address"
                                                placeholder="Jalan xxx xxx"
                                                required={true}
                                            />
                                        </div>

                                        <div className=" flex justify-center">
                                            <Button disabled={disable} onClick={() => {
                                                setDisable(!disable)
                                                postAddress()
                                            }} className='hover:border-black text-white border rounded-sm hover:text-black border-black bg-neutral-900 hover:bg-white w-[640px]'>
                                                {disable ? <span className='flex gap-3 items-center'><AiOutlineLoading3Quarters className='animate-spin' />Loading</span> : 'Submit'}
                                            </Button>
                                        </div>
                                        
                                    </div>
                                </Modal.Body>
                            </Modal>



                        </div>
                        <Modal className='overflow-scroll pt-72'
                            show={show2}
                            size="md"
                            popup={true}
                            onClose={() => setShow2(!show2)}
                        >
                            <Modal.Header />
                            <Modal.Body>
                                <div className="space-y-2 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                                        Change WH Address
                                    </h3>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="Province WH before"
                                            />
                                        </div>
                                        <input disabled={true} type="text" className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' placeholder={chosenWH.province} />
                                    </div>

                                    <div>
                                        <div className="mb-4 block">
                                            <Label
                                                value="Province"
                                            />
                                        </div>
                                        <select
                                            onChange={() =>  getDataCityforChange()}
                                            ref={changeProvince}
                                            id="province"
                                            className="w-full py-2 mb-10 px-2 border border-black focus:ring-transparent focus:border-black"
                                        >   <option>Please Select Province</option>
                                            {changeP.map((value, index) => {
                                                return <option value={`${value.province_id}, ${value.province}`}>{value.province}</option>;
                                            })}
                                        </select>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="City WH before"
                                            />
                                        </div>
                                        <input disabled={true} type="text" className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' placeholder={chosenWH.city} />
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="City"
                                            />
                                        </div>
                                        <select
                                            
                                            ref={changeCity}
                                            id="city"
                                            className="w-full mb-10 py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                        >               <option>Please Select City</option>
                                            {changeC.map((value, index) => {
                                                return (
                                                    value.city_id == chosenWH.city_id ? null : <option value={`${value.city_id}, ${value.city_name}`}>{value.city_name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="Subdistrict WH before"
                                            />
                                        </div>
                                        <input disabled={true} type="text" className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' placeholder={chosenWH.subdistrict} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="Subdisctrict"
                                            />
                                        </div>
                                        <input className='w-full py-2 mb-10 px-2 border border-black focus:ring-transparent focus:border-black' ref={onSubdistrict}
                                            id="Subdisctrict"
                                            placeholder="Subdistrict"
                                            required={true}
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="WH Address before"
                                            />
                                        </div>
                                        <input disabled={true} type="text" className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' placeholder={chosenWH.address} />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                value="WH Address"
                                            />
                                        </div>
                                        <input className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={WH_address}
                                            id="Address"
                                            placeholder="Jalan xxx xxx"
                                            required={true}
                                        />
                                    </div>

                                    <div className=" flex justify-center pt-10">
                                        <Button disabled={disable} onClick={() => {
                                            setDisable(!disable)
                                            updateWH()
                                        }} className='hover:border-black text-white border rounded-sm hover:text-black border-black bg-neutral-900 hover:bg-white w-[640px]'>
                                        {disable ? <span className='flex gap-3 items-center'><AiOutlineLoading3Quarters className='animate-spin' />Loading...</span> : 'Submit'}
                                        </Button>
                                    </div>
                                    <div className=" flex justify-center pt-5">
                                            <Button disabled={disable} onClick={() => deleteWH()} className='hover:border-white text-white border rounded-sm bg-red-700 hover:bg-red-500 w-[640px]'>
                                                {disable ? <span className='flex gap-3 items-center'><AiOutlineLoading3Quarters className='animate-spin' />Loading...</span> : 'Delete Warehouse'}
                                            </Button>
                                        </div>
                                </div>
                            </Modal.Body>
                        </Modal>

                        <div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
                            <table className="w-full text-sm text-left border text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3">

                                            Province

                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            City
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Subdistrict
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Latitude
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Longitude
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataWH.map((item, index) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {index + 1}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {item.province}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.city}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.subdistrict}
                                                    </td> <td className="px-6 py-4">
                                                        {item.address}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.latitude}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.longitude}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => {
                                                            setChosenWH(item)
                                                            setShow2(!show2)
                                                        }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* box */}


                </div>
                :
                navigate('*')
            :
            <Loading />
    )
}