import { Breadcrumb } from "flowbite-react";
import { Link, Outlet } from "react-router-dom";

export default function MyAccount() {

    return (
        <>
            <div className="pt-20 grid grid-cols-10 gap-2 px-36">

                <div className="col-start-2 col-end-9 py-3">
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

                <div className="col-start-2 col-end-4 w-60">

                    <Link to='/my-account/information'>
                        <div className="border-b-2 border-gray-300 py-2">
                            Account Information
                        </div>
                    </Link>

                    <Link to='/my-account/address'>
                        <div className="border-b-2 border-gray-300 py-2">
                            Address
                        </div>
                    </Link>

                    <Link to='/my-account/history'>
                        <div className="border-b-2 border-gray-300 py-2">
                            Transaction History
                        </div>
                    </Link>

                </div>

                <div className="col-start-4 col-end-10">
                    <Outlet />
                </div>

            </div>
        </>
    )
}