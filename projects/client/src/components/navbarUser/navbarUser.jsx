import { Link, useNavigate } from "react-router-dom";
import { MdSearch, MdFavorite, MdShoppingBag, MdPerson, MdLogout, MdOutlineLogout } from 'react-icons/md'
import { useState, useEffect, useContext } from "react";
import { Tooltip } from "flowbite-react";
import axios from "axios";
import { userData } from "../../data/userData";
import { toast, Toaster } from "react-hot-toast";

export default function NavbarUser(props) {

    const [category, setCategory] = useState([])

    const { user, setUser } = useContext(userData)

    let navigate = useNavigate()

    let getCategory = async () => {
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
        props.func.getCart()
        props.data.itemCart
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
                    {category.map((value, index) => {
                        return (
                            <button className="px-3 hover:bg-neutral-500" onClick={() => props.func.getProduct(value.id)}>
                                <Link to={`/product/${value.id}`}>
                                    <div className="group relative dropdown px-4 py-7 text-white  hover:text-neutral-900 cursor-pointer tracking-wide">
                                        <div>{value.name}</div>
                                        <div className="group-hover:block dropdown-menu absolute hidden h-auto">
                                            <ul className="mt-7 w-48 -ml-7 bg-white shadow py-5 px-3 bg-opacity-80 rounded-b">
                                                {value.products ? value.products.map((val) => {
                                                    return (
                                                        <Link to={`/product/productdetail/${val.id}`}>
                                                            <li onClick={() => props.func.getProductDetail(val.id)} className="py-3">
                                                                <div className="block text-neutral-800 text-base text-left hover:text-neutral-500 cursor-pointer">
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
                            </button>
                        )
                    })}
                </div>
                <div className="flex items-center gap-5 text-2xl">
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
                    <button onClick={() => props.func.notRegister()}>
                        <Link to='/cart'>
                            <Tooltip
                                content="Cart"
                                placement="bottom"
                                className=" mt-6"
                            >
                                <div className="relative px-3 py-3">
                                    <MdShoppingBag />
                                    {
                                        props.data.itemCart.length === 0 ?
                                            null
                                            :
                                            <div className="bg-orange-500 w-5 h-5 rounded-full absolute top-1 right-0 text-xs justify-center flex items-center">{props.data.itemCart.length}</div>
                                    }
                                </div>
                            </Tooltip>
                        </Link>
                    </button>
                    {!localStorage.getItem('token') ?
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
                        :
                        <>
                            <Link to='/my-account'>
                                <Tooltip
                                    content="My Account"
                                    placement="bottom"
                                    className=" mt-6"
                                >
                                    <button>
                                        <div className="flex items-center">
                                            <MdPerson />
                                            {/* <div className="text-lg ml-2">{user.username}</div> */}
                                        </div>
                                    </button>
                                </Tooltip>
                            </Link>
                        </>
                    }
                </div>
                <Toaster />
            </div>
        </>
    )
}