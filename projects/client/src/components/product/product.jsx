import { Card } from 'flowbite-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import iphonedisc from './../../Assets/iphonedisc.jpg'

export default function Product(props){
    const {id} = useParams()

    useEffect(()=>{
        props.func.getProduct(id)
    },[])
    return(
        <div className="pt-28">
            <div className="flex justify-start pl-16 text-3xl font-bold">
                All Products
            </div>
            <div className="flex justify-center p-10">
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 p-5">
                    {props.data.show? props.data.show.map((value, index)=>{
                        return(
                            <Link to={`/product/productdetail/${value.id}`}>
                                <button className=" ">
                                    <div className="">
                                    {/* imgSrc={require(`../../Assets/${value.product_images[0].img}`)} */}
                                        <div className=''>
                                            <div className='min-h-[5px]' >
                                                <img src={require(`../../Assets/${value.product_images[0].img}`)} className='flex items-start min-w-[10px]' alt="hai" />
                                            </div>
                                            <div className=''>
                                                <div className="flex justify-center font-bold text-lg">
                                                    {value.name}
                                                </div>
                                                <div className="gap-1 flex-col justify-center text-sm">
                                                    <div className='text-md'>
                                                        <s>
                                                        Rp {value.product_details[0].price.toLocaleString()}
                                                        </s>
                                                    </div>
                                                    <div className="text-red-600 font-bold text-lg">
                                                        Rp {value.product_details[0].price.toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className='flex p-5 justify-center gap-3'>
                                                    {props.data.arrColor[index].map((val, idx)=>{
                                                        return(
                                                            <div style={{backgroundColor: `${val}`}} className={`w-4 h-4 border rounded-full`}></div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        )
                    })
                    : null}
                </div>
            </div>
        </div>
    )
}