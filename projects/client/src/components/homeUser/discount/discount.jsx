import { Card } from "flowbite-react"
import iphonedisc from './../../../Assets/iphonedisc.jpg'

export default function Discount() {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 md:px-10 lg:px-36 mt-10">
                <button className="">
                    <Card imgSrc={iphonedisc}>
                        <div className="flex justify-start text-2xl">
                            iPhone 14 Pro
                        </div>
                        <div className="gap-1 flex justify-start text-lg">
                            <div>
                                <s>
                                    Rp. 17.999.000
                                </s>
                            </div>
                            <div className="text-red-600 font-bold">
                                Rp. 200.000
                            </div>
                        </div>
                        <button className="bg-theme rounded-lg py-1 text-white">
                            Details
                        </button>
                    </Card>
                </button>
                <button className="">
                    <Card imgSrc={iphonedisc}>
                        <div className="flex justify-start font-bold">
                            iPhone 14 Pro
                        </div>
                        <div className="gap-1 flex justify-start text-sm">
                            <div>
                                <s>
                                    Rp. 500.000
                                </s>
                            </div>
                            <div className="text-red-600 font-bold">
                                Rp. 200.000
                            </div>
                        </div>
                        <button className="bg-theme rounded-lg py-1 text-white">
                            Details
                        </button>
                    </Card>
                </button>
                <button className="">
                    <Card imgSrc={iphonedisc}>
                        <div className="flex justify-start font-bold">
                            iPhone 14 Pro
                        </div>
                        <div className="gap-1 flex justify-start text-sm">
                            <div>
                                <s>
                                    Rp. 500.000
                                </s>
                            </div>
                            <div className="text-red-600 font-bold">
                                Rp. 200.000
                            </div>
                        </div>
                        <button className="bg-theme rounded-lg py-1 text-white">
                            Details
                        </button>
                    </Card>
                </button>
                <button className="">
                    <Card imgSrc={iphonedisc}>
                        <div className="flex justify-start font-bold">
                            iPhone 14 Pro
                        </div>
                        <div className="gap-1 flex justify-start text-sm">
                            <div>
                                <s>
                                    Rp. 500.000
                                </s>
                            </div>
                            <div className="text-red-600 font-bold">
                                Rp. 200.000
                            </div>
                        </div>
                        <button className="bg-theme rounded-lg py-1 text-white">
                            Details
                        </button>
                    </Card>
                </button>
                <button className="">
                    <Card imgSrc={iphonedisc}>
                        <div className="flex justify-start font-bold">
                            iPhone 14 Pro
                        </div>
                        <div className="gap-1 flex justify-start text-sm">
                            <div>
                                <s>
                                    Rp. 500.000
                                </s>
                            </div>
                            <div className="text-red-600 font-bold">
                                Rp. 200.000
                            </div>
                        </div>
                        <button className="bg-theme rounded-lg py-1 text-white">
                            Details
                        </button>
                    </Card>
                </button>
            </div>
        </div>
    )
}