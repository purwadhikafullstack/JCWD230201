import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
// import iphonedisc from './../../Assets/iphonedisc.jpg'

export default function Product(props){

    return(
        <div className="pt-28">
            {/* {console.log(props.data.show[0].product_images[0].img)} */}
            {/* {console.log(props.data.show[0].product_images[0].img)} */}
            {/* imgSrc={`${value.product_images[0].img}`.default} */}
            {console.log(props.data.show)}
            <div className="flex justify-start pl-16 text-3xl font-bold">
                All Products
            </div>
            <div className="flex justify-center p-10">
                <div className="grid grid-cols-4 gap-10 p-5">
                    {props.data.show? props.data.show.map((value, index)=>{
                        return(
                            <Link to={`/product/productdetail/${value.id}`}>
                                <button className=" ">
                                    <Card className="h-[450px]">
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
                                            </div>
                                        </div>
                                    </Card>
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