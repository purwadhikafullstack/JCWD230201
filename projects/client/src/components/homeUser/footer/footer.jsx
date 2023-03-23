import FooterPayment from '../../../Assets/footer-payment.webp'
import FooterShipping from '../../../Assets/footer-shipping.webp'
import FooterWarranty from '../../../Assets/footer-warranty.webp'
import FooterShipper from '../../../Assets/footer-shipper.webp'
import FooterService from '../../../Assets/footer-service.webp'
import FooterPromo from '../../../Assets/footer-promo.webp'

import { ImFacebook2, ImTwitter, ImYoutube, ImWhatsapp } from 'react-icons/im'
import { FaInstagram } from 'react-icons/fa'
import { MdOutlineCopyright } from 'react-icons/md'

export default function Footer() {
    return (
        <>
            <div className='bg-neutral-800 grid grid-cols-4 py-6 px-80 gap-7 mt-10'>
                <div className='flex items-center gap-4'>
                    <img src={FooterWarranty} />
                    <div className='text-white'>
                        <p className='font-bold'>Official Warranty</p>
                        <p>Official Warrranty Product / TAM Warranty</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={FooterService} />
                    <div className='text-white'>
                        <p className='font-bold'>Customer Service</p>
                        <p>Our Team is Ready to Help About Products</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={FooterShipper} />
                    <div className='text-white'>
                        <p className='font-bold'>Delivery Service</p>
                        <p>Trusted Shipping And Security</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={FooterPromo} />
                    <div className='text-white'>
                        <p className='font-bold'>Shopping Benefit</p>
                        <p>Latest Promos and Info on Latest Gadget Products</p>
                    </div>
                </div>
            </div>

            <div className='bg-black flex justify-between px-80 items-center py-7'>
                <p className='text-white text-sm font-semibold'>
                    Start subscribing to the newsletter and get the latest information and promos
                </p>
                <div className='relative flex items-center'>
                    <input type='text' placeholder='Input your email' className='py-2 w-[650px] border border-black focus:ring-0 focus:ring-transparent focus:border-black' />
                    <button className='absolute right-0 font-semibold border-l-2 h-5/6 px-5 text-sm'>
                        SEND
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 px-80 gap-10 pb-10 border-t h-max pt-5 bg-white inset-x-0 bottom-auto">
                <div className="">
                    <div className="text-lg font-semibold">
                        <div className="absolute text-3xl">I</div>
                        <img src={require('../../../Assets/logo black.jpg')} alt="" className='w-20' />
                        <div className="absolute ml-6 text-3xl">
                            rit
                        </div>
                    </div>
                    <div className="text-neutral-800 text-sm">
                        <p className="leading-loose">
                            iFrit is a leading Apple Premium Reseller in Indonesia specializing in Apple products and a wide range of complementary accessories, software and other products.
                        </p>

                        <p className="mt-4 leading-loose">
                            If you would like assistance or have any feedback, please contact us:<br />
                            Hour 9:30 - 17:30 (Monday - Friday)<br />
                            Hour 9:30 - 15:00 (Saturday)<br />
                            Email : ifritcompany@gmail.com<br />
                            Phone : 1500372<br />
                            WA : 0812 9077 7722
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="text-base font-semibold">
                        Information
                    </div>
                    <button className="pt-2 text-gray-400 block">
                        About Us
                    </button>
                    <button className="pt-3 text-gray-400 block">
                        FAQ
                    </button>
                    <button className="pt-3 text-gray-400 block">
                        Privacy
                    </button>
                </div>
                <div className="">
                    <div className="text-base font-semibold">
                        Services
                    </div>
                    <button className="pt-2 text-gray-400 block">
                        How to Order
                    </button>
                    <button className="pt-3 text-gray-400 block">
                        How to Payment
                    </button>
                    <button className="pt-3 text-gray-400 block">
                        Shipping Information
                    </button>
                    <button className="pt-3 text-gray-400 block">
                        Order Trackking
                    </button>
                    <button className="pt-3 text-gray-400 block">
                        Transaction Cancellation
                    </button>
                </div>
                <div className="">
                    <div className="text-base font-semibold">
                        We Accept
                    </div>
                    <div className="pt-2 ">
                        <img src={FooterPayment} />
                    </div>
                    <div className="pt-3 text-base font-semibold">
                        Shipping Services
                    </div>
                    <div className="pt-2 ">
                        <img src={FooterShipping} />
                    </div>
                    <div className="pt-3 text-base font-semibold">
                        Find Us
                    </div>
                    <div className="pt-2 text-2xl flex gap-4">
                        <ImFacebook2 />
                        <ImTwitter />
                        <ImYoutube />
                        <FaInstagram />
                        <ImWhatsapp />
                    </div>
                </div>
            </div>
            <p className='bg-black flex text-white items-center text-xs justify-center py-3'>
                COPYRIGHT <MdOutlineCopyright /> 2023 IFRIT. ALL RIGHTS RESERVED.
            </p>
        </>
    )
}