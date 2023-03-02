import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import {useParams} from 'react-router-dom';
import { Modal, Button, TextInput, Label} from 'flowbite-react'
import { toast, Toaster } from "react-hot-toast";
import iPhone14pro from './../../Assets/iphone_14_pro.jpg'

export default function Shipping() {

    const {id} = useParams()

    let onReceiver_name = useRef()
    let onUser_address = useRef()
    let onProvince = useRef()
    let onCity = useRef()
    let onSubdistrict = useRef()
    let onPhone_number = useRef()

    const [address, setAddress] = useState([])
    const [valueDefault, setValueDefault] = useState([])
    const [show, setShow] = useState(false)
    const [showAddress, setShowAddress] = useState(false)
    const [arrProvince, setArrProvince] = useState([])
    const [arrCity, setArrCity] = useState([])
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedName, setSelectedName] = useState("")
    const [selectedNumber, setSelectedNumber] = useState("")
    const [selectedUserAddress, setSelectedUserAddress] = useState("")
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedSubdistrict, setSelectedSubdistrict] = useState("")
    const [checkValue, setCheckValue] = useState("")
    const [initialCity, setInitialCity] = useState("")
    const [initialName, setInitialName] = useState("")
    const [initialUserAddress, setInitialUserAddress] = useState("")
    const [initialProvince, setInitialProvince] = useState("")
    const [initialSubdistrict, setInitialSubdistrict] = useState("")
    const [initialNumber, setInitialNumber] = useState("")

    let getAllAddress = async()=>{
        try {
            let response = await axios.get(`http://localhost:8000/address/${id}`)
            setValueDefault(response.data.data);
            setAddress(response.data.data)
            setInitialCity(response.data.data[0].city)
            setInitialName(response.data.data[0].receiver_name)
            setInitialUserAddress(response.data.data[0].user_address)
            setInitialProvince(response.data.data[0].province)
            setInitialSubdistrict(response.data.data[0].subdistrict)
            setInitialNumber(response.data.data[0].phone_umber)
        } catch (error) {
            console.log(error.message)
        }
    }

    let postAddress = async()=>{
        try {
            let inputReceiverName = onReceiver_name.current.value
            let inputUserAddress = onUser_address.current.value
            let inputProvince = onProvince.current.value.split(", ")[1]
            let inputCity = onCity.current.value.split(",")[0]
            let inputSubdistrict = onSubdistrict.current.value
            let inputPhoneNumber = onPhone_number.current.value
            if (inputReceiverName.length === 0 || inputUserAddress.length === 0 || inputProvince.length === 0 || inputCity.length === 0 || inputSubdistrict.length === 0 || inputPhoneNumber.length === 0) throw { message: 'Incomplete Input' }
            let response = await axios.post(`http://localhost:8000/address/add-address/${id}`, {receiver_name: inputReceiverName, user_address: inputUserAddress, province: inputProvince, city: inputCity, subdistrict: inputSubdistrict, phone_number: inputPhoneNumber})
            toast.success(`Add New Address Success`)
            setShow(!show)
            getAllAddress()
        } catch (error) {
            toast.error(error.message)
        }
    }

    let getDataProvince = async () => {
        try {
          let response = await axios.get("http://localhost:8000/rajaongkir/province", {
            headers: {
              key: "c597d7d890389c6ff9747205fcf6cf86",
            },
          });
          setArrProvince(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      let getDataCity = async () => {
        try {
            console.log(onProvince.current.value.split(",")[0])
          let data = await axios.get(`http://localhost:8000/rajaongkir/city?province_id=${onProvince.current.value.split(",")[0]}`,{
              headers: {
                key: "c597d7d890389c6ff9747205fcf6cf86",
              },
            });
          setArrCity(data.data.data.results)
        } catch (error) {
          console.log(error);
        }
      };

      let getSelected = (value)=>{
        try {
            setCheckValue(value)
            setSelectedCity(value.city);
            setSelectedName(value.receiver_name);
            setSelectedNumber(value.phone_number);
            setSelectedUserAddress(value.user_address);
            setSelectedProvince(value.province);
            setSelectedSubdistrict(value.subdistrict);

            setShowAddress(!showAddress)
            

        } catch (error) {
            console.log(error);
        }
      }

    useEffect(() => {
      getAllAddress()
      getDataProvince()
    }, [])
    

    return (
        <>
            <div className="pt-28 flex flex-col p-36">
                <div className='font-bold text-3xl flex justify-start py-5'>
                    Shipping
                </div>
                <div className='grid grid-cols-5 gap-9'>
                    <div className='flex justify-end col-span-3'>
                        <div className='flex-col items-end w-full'>
                            <div className='flex-col items-end border'>
                                <div className='flex justify-between border-b-2 py-3 px-3'>
                                    <div className='flex items-center font-bold'>
                                        Shipping Address
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <div className=''>
                                         <div className=''>
                                            {checkValue?
                                            <div>
                                                <div className='text-lg px-4 font-bold pt-3'>
                                                    {selectedName}
                                                </div>
                                                <div className='text-md px-4'>
                                                    {selectedNumber}
                                                </div>
                                                <div className='text-md px-4'>
                                                    {selectedUserAddress}
                                                </div>
                                                <div className='text-md px-4'>
                                                    {selectedProvince}, {selectedSubdistrict}, {selectedCity}
                                                </div>
                                                
                                            </div>
                                            : checkValue? valueDefault.map((value, index)=>{
                                                return(
                                                    <div>
                                                        <div className='text-lg px-4 font-bold pt-3'>
                                                            {value.value==1? value.receiver_name:null}
                                                        </div>
                                                        <div className='text-md px-4'>
                                                            {value.value==1? value.phone_number:null}
                                                        </div>
                                                        <div className='text-md px-4'>
                                                            {value.value==1? value.user_address:null}
                                                        </div>
                                                        <div className='text-md px-4'>
                                                            {/* {initialProvince? `${initialProvince},` : null} {initialSubdistrict? `${initialSubdistrict},`: null} {initialCity} */}
                                                        </div>
                                                    </div>

                                                )
                                            })
                                            :
                                            <div>
                                                <div className='text-lg px-4 font-bold pt-3'>
                                                    {initialName}
                                                </div>
                                                <div className='text-md px-4'>
                                                    {initialNumber}
                                                </div>
                                                <div className='text-md px-4'>
                                                    {initialUserAddress}
                                                </div>
                                                <div className='text-md px-4'>
                                                    {initialProvince? `${initialProvince},` : null} {initialSubdistrict? `${initialSubdistrict},`: null} {initialCity}
                                                </div>
                                            </div>
                                            }
                                        </div>     
                                    </div>
                                    <div className=''>
                                        <>
                                            {initialProvince?
                                            <div className='flex justify-start p-3'>
                                                <Button onClick={()=>setShowAddress(!showAddress)} className="text-white border-solid rounded-sm hover:text-black hover:border-black bg-neutral-900 hover:bg-white">
                                                    Change Another Address
                                                </Button>
                                            </div>
                                                :
                                            <div className='flex justify-center p-3'>
                                                <Button onClick={()=>setShow(!show)} className="text-white border rounded-sm hover:text-black border-black hover:border-black bg-neutral-900 hover:bg-white">
                                                    Add Address
                                                </Button>
                                            </div>}
                                            <Modal
                                                show={showAddress}
                                                size="3xl"
                                                popup={true}
                                                onClose={()=>setShowAddress(!showAddress)  }
                                            >
                                                <Modal.Header />
                                                <Modal.Body>
                                                    <div className='text-2xl font-bold flex justify-center py-5'>
                                                        Choose Your Address
                                                    </div>
                                                    <div className=''>
                                                        <>
                                                            <div className='flex justify-center p-3'>
                                                                <Button onClick={()=>setShow(!show)}  className="text-white border rounded-sm hover:border-black hover:text-black border-black bg-neutral-900 hover:bg-white w-[640px]">
                                                                    Add New Address
                                                                </Button>
                                                            </div>
                                                            <Modal
                                                                show={show}
                                                                size="md"
                                                                popup={true}
                                                                onClose={()=>setShow(!show)  }
                                                            >
                                                                <Modal.Header />
                                                                <Modal.Body>
                                                                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                                                                        Add New Address
                                                                        </h3>
                                                                        <div>
                                                                            <div className="mb-2 block">
                                                                                <Label
                                                                                value="Receiver Name"
                                                                                />
                                                                            </div>
                                                                            <input className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={onReceiver_name}
                                                                                id="Receiver Name"
                                                                                placeholder="Name"
                                                                                required={true}
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <div className="mb-2 block">
                                                                                <Label
                                                                                value="Address"
                                                                                />
                                                                            </div>
                                                                            <input className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={onUser_address}
                                                                                id="Address"
                                                                                placeholder="Jl. xxx xxx"
                                                                                required={true}
                                                                            />
                                                                        </div>
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
                                                                            >
                                                                                {arrProvince.map((value, index) => {
                                                                                return <option value={`${value.province_id}, ${value.province}`}>{value.province}</option>;
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        <div>
                                                                            <div className="mb-2 block">
                                                                                <Label
                                                                                value="City"
                                                                                />
                                                                            </div>
                                                                            <select
                                                                                ref={onCity}
                                                                                // onChange={(e) => onChangeDestination(e.target.value)}
                                                                                id="city"
                                                                                className="w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black"
                                                                            >
                                                                                {arrCity.map((value, index) => {
                                                                                return (
                                                                                    <option value={`${value.city_name},${value.city_id}`}>{value.city_name}</option>
                                                                                );
                                                                                })}
                                                                            </select>
                                                                        </div>
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
                                                                                value="Phone Number"
                                                                                />
                                                                            </div>
                                                                            <input className='w-full py-2 px-2 border border-black focus:ring-transparent focus:border-black' ref={onPhone_number}
                                                                                id="Phone Number"
                                                                                placeholder="08xxxxxxx"
                                                                                required={true}
                                                                            />
                                                                            </div>
                                                                            <div className=" flex justify-center">
                                                                            <Button onClick={()=>{postAddress()}} className='hover:border-black text-white border rounded-sm hover:text-black border-black bg-neutral-900 hover:bg-white w-[640px]'>                                                                                
                                                                                Submit
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </>
                                                    </div>
                                                    <div className='p-2'>
                                                        <div className='p-2 overflow-x-hidden h-96'>
                                                        {address.map((value, index)=>{
                                                            return(
                                                            <div className='p-2'>
                                                                {value.value==1?
                                                                <button onClick={()=>getSelected(value)} className='p-2 border w-full  hover:bg-neutral-700 hover:text-white hover:border-lg-white focus:bg-neutral-700 focus:text-white'>
                                                                    <div className='grid grid-cols-7'>
                                                                        <div className=' col-span-5'>
                                                                            <div className='text-xl px-4 font-bold pt-3 flex justify-start'>
                                                                                {value.receiver_name}
                                                                            </div>
                                                                            <div className='text-md px-4 flex justify-start'>
                                                                                {value.user.phone_number}
                                                                            </div>
                                                                            <div className='text-md px-4 flex justify-start'>
                                                                                {value.user_address}
                                                                            </div>
                                                                            <div className='text-md px-4 flex justify-start'>
                                                                                {value.province}, {value.subdistrict}, {value.city}
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-end items-center'>
                                                                            <div className='border px-3 py-1 font-bold'>
                                                                                Default
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                :
                                                                <button onClick={()=>getSelected(value)} className='p-2 border w-full  hover:bg-neutral-700 hover:text-white focus:bg-neutral-700 focus:text-white'>
                                                                    <div className=''>
                                                                        <div className='text-lg px-4 font-bold pt-3 flex justify-start'>
                                                                            {value.receiver_name}
                                                                        </div>
                                                                        <div className='text-md px-4 flex justify-start'>
                                                                            {value.user.phone_number}
                                                                        </div>
                                                                        <div className='text-md px-4 flex justify-start'>
                                                                            {value.user_address}
                                                                        </div>
                                                                        <div className='text-md px-4 flex justify-start'>
                                                                            {value.province}, {value.subdistrict}, {value.city}
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                        }
                                                            </div>
                                                            )
                                                        })}
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full border mt-5 rounded-sm'>
                                <div className='font-bold py-5 border-b-2 px-4'>
                                    Shipping from iFrit Warehouse
                                </div>
                                <div className='flex items-center justify-between px-4 pr-10'>
                                    <div className='flex items-center gap-4'>
                                        <div className='w-20'>
                                            <img src={iPhone14pro} />
                                        </div>
                                        <div>
                                            <div className='font-bold'>
                                                iPhone 14 Pro, 256 GB, Midnight
                                            </div>
                                            <div className='text-neutral-400'>
                                                Qty : 1 | Price : Rp. 21.999.000
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-bold mb-2'>
                                            Shipping Service
                                        </div>
                                        <select className='rounded-sm w-full'>
                                            <option>Choose Shipping</option>
                                            <option>JNE</option>
                                            <option>POS</option>
                                            <option>Tiki</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' col-span-2'>
                        <div className='w-full border h-max px-3 py-4'>
                            <div className='font-bold text-xl'>
                                Summary
                            </div>
                            <div className='flex justify-between pt-3 text-neutral-400'>
                                <div>
                                    Total Order 
                                </div>
                                <div>
                                    Rp. 21.999.000
                                </div>
                            </div>
                            <div className='flex justify-between pt-1 pb-5 text-neutral-400'>
                                <div>
                                    Shipping Order 
                                </div>
                                <div>
                                    Rp. 0
                                </div>
                            </div>
                            <div className='flex justify-between py-3 text-lg font-bold border-t-2'>
                                <div className=''>
                                    Total Order 
                                </div>
                                <div>
                                    Rp. 21.999.000
                                </div>
                            </div>
                            <button className='bg-neutral-900 text-white font-bold w-full py-2 rounded'>
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
                <Toaster
                    toastOptions={{
                        success: {
                            duration: 10000
                        }
                    }}
                />
            </div>
        </>
    )
}