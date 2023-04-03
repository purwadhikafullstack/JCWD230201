import { Breadcrumb,Dropdown } from "flowbite-react";
import { toast, Toaster } from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function MyAccount() {

    let navigate = useNavigate()

    let logout = () => {
        toast('Logout..', {
            style: {
                backgroundColor: 'black',
                color: 'white'
            }
        })
        setTimeout(() => {
            localStorage.removeItem('token')
            navigate('/')
        }, 2000)
    }

    return (
        <>
            <div className="pt-20 grid grid-cols-8 lg:grid-cols-10 gap-1 px-5 lg:px-32">

                <div className="col-start-1 col-end-8 hidden lg:block lg:col-start-2 lg:col-end-9 py-3">
                    <Breadcrumb aria-label="Default breadcrumb example">
                        <Breadcrumb.Item>
                            <Link to='/'>
                                Home
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/my-account'>
                                My Account
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="col-start-1 col-end-9 hidden lg:block lg:col-start-2 lg:col-end-4 w-60">

                    <Link to='/my-account/information'>
                        <div className="border-b-2 border-gray-300 py-2 px-3">
                            Account Information
                        </div>
                    </Link>

                    <Link to='/my-account/address'>
                        <div className="border-b-2 border-gray-300 py-2 px-3">
                            Address
                        </div>
                    </Link>

                    <Link to='/my-account/history'>
                        <div className="border-b-2 border-gray-300 py-2 px-3">
                            Transaction History
                        </div>
                    </Link>

                    <button onClick={() => logout()} className="px-3 text-red-600 text-left font-bold py-2 w-full border-b-2 border-gray-300 mb-5">
                        Logout
                    </button>

                </div>

                <div className=" lg:hidden">
                    <div className="my-5">
                        <Dropdown
                            label="Dashboard"
                            inline={true}
                        >
                            <Dropdown.Item onClick={() => navigate('/my-account')}>
                                My Account
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/my-account/information')}>
                                Account Information
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/my-account/address')}>
                                Address
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/my-account/history')}>
                                Transaction History
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>

                <div className="col-start-1 col-end-9 lg:col-start-4 lg:col-end-10">
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </>
    )
}