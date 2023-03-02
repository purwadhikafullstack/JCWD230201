import { Link, useNavigate } from "react-router-dom";
import { MdSearch, MdFavorite, MdShoppingBag, MdPerson } from 'react-icons/md'
import { useState, useEffect } from "react";
import { Tooltip } from "flowbite-react";
import axios from "axios";

export default function NavbarUser(props) {

    const [category, setCategory] = useState([])

    let navigate = useNavigate()

    let getCategory = async()=>{
        try {
            let response = await axios.get(`http://localhost:8000/product/category`)
            // setCategory(data.data)
            // console.log(response.data.data)
            setCategory(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getCategory()
    }, [])

    return (
        <>
            <div className="flex justify-around items-center bg-neutral-900 text-white font-semibold fixed w-full z-10 h-20">
                <div className="flex items-center gap-10">
                    <Link to='/'>
                        <button className="text-3xl">
                            iFrit
                        </button>
                    </Link>
                    {category.map((value, index)=>{
                        return(
                            <Link to={`/product/${value.id}`}>
                                <div className="group relative dropdown px-4 py-7 text-white hover:bg-neutral-500 hover:text-neutral-900 cursor-pointer tracking-wide">
                                    <button onClick={()=>props.func.getProduct(value.id)}>{value.name}</button>
                                    <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                                        <ul className="mt-7 w-48 -ml-4 bg-white shadow py-5 px-3 bg-opacity-80 rounded-b">
                                        {value.products? value.products.map((val)=>{
                                            return(
                                                <Link to={`/product/productdetail/${val.id}`}>
                                                    <li onClick={()=>props.func.getProductDetail(val.id)} className="py-3">
                                                        <div className="block text-neutral-800 text-base hover:text-neutral-500 cursor-pointer">
                                                            {val.name}
                                                        </div>
                                                    </li>
                                                </Link>
                                            )
                                        })
                                        : null}
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className="flex gap-5 text-2xl">
                    <button>
                        <Tooltip
                            content="Search"
                            placement="bottom"
                            className=" mt-6"
                        >
                            <MdSearch />
                        </Tooltip>
                    </button>
                    <button>
                        <Tooltip
                            content="Wishlist"
                            placement="bottom"
                            className=" mt-6"
                        >
                            <MdFavorite />
                        </Tooltip>
                    </button>
                    <Link to='/cart'>
                        <Tooltip
                            content="Cart"
                            placement="bottom"
                            className=" mt-6"
                        >
                            <button>
                                <MdShoppingBag />
                            </button>
                        </Tooltip>
                    </Link>
                    <Link to='/login'>
                        <Tooltip
                            content="Login or Register"
                            placement="bottom"
                            className=" mt-6"
                        >
                            <button>
                                <MdPerson />
                            </button>
                        </Tooltip>
                    </Link>
                </div>
            </div>
        </>
    )
}