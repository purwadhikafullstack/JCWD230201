import { Carousel } from "flowbite-react"
import iphone from './../../Assets/iphone14pro.jpg'
import titleiphone from './../../Assets/14pro.jpg'
import iwatch from './../../Assets/iwatch.jpg'
import titleiwatch from './../../Assets/titleiwatch.png'
import macbook from './../../Assets/macbook.jpg'
import airpodsmax from './../../Assets/airpodsmax.png'

import Discount from "../../components/homeUser/discount/discount"

export default function Home() {
    return (
        <>
            <div className="flex justify-center content-center pt-20">
                <div className="h-[900px] w-full bg-black">
                    <Carousel leftControl=" "
                        rightControl=" ">
                        <div className="flex  flex-col items-center bg-black">
                            <img src={titleiphone} alt="..." className="w-1/5 mt-20 mb-5" />
                            <img src={iphone} alt="..." className="w-1/2" />
                        </div>
                        <div className="flex flex-col items-center bg-black">
                            <img src={titleiwatch} alt="..." className="my-5" />
                            <img src={iwatch} alt="..." className="w-1/2" />
                        </div>
                        <div className="flex flex-col items-center bg-black">
                            <img src={macbook} alt="..." className="" />
                        </div>
                        <div className="flex flex-col items-center bg-black">
                            <img src={airpodsmax} alt="..." className="w-1/3" />
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="text-3xl font-bold">
                    DISCOUNT!
                </div>
            </div>
            <div>
                <Discount />
            </div>
        </>
    )
}