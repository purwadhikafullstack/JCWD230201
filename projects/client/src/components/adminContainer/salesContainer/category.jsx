import { useEffect, useState } from "react"
import axios from 'axios'


export default function Category(data) {
    console.log(data.data)
    let [tugel, setTugel] = useState([false,false,false,false])

    let click = (index)=>{
        setTugel(value=>value.map((item, idx) => idx === index ? !item : item))
    }

    return (
        <div className="flex flex-col  w-full h-full gap-6">
            {
                data.data.category.map((item, index) => {
                    return (
                        <div className="w-full flex flex-col mb-5 group shadow pb-2">
                            <div className="flex justify-between items-center">
                                <button onClick={() => click(index)} className="w-1/5 font-semibold flex flex-col gap-1 text-start text-xl ">
                                    {item.category}
                                    <hr className="w-0 group-hover:w-full group-hover:duration-300 h-0.5 bg-slate-300" />
                                </button>
                                <div>
                                    Rp.{(item.totalC).toLocaleString()}
                                </div>
                            </div>
                            <div className={`${tugel[index]?'flex flex-col':'hidden'}`}>
                                {
                                    item.product.map((item,index)=>{
                                        return(
                                            <div>
                                                {item.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}