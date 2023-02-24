import { Link } from "react-router-dom";
import Footer from "../../components/homeUser/footer/footer";

export default function Login() {
    return (
        <>
            {/* Main */}
            <div className="flex justify-center items-center h-screen">
                {/* Card */}
                <div className="border-2 border-gray-200 w-max px-5 py-5 rounded-lg shadow-lg">

                    <div>
                        <h1 className="font-bold text-xl">Login</h1>
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Email</p>
                        <input required type='text' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <div className="my-5">
                        <p className="font-semibold">Password</p>
                        <input required type='password' className="py-1 px-1 w-96 rounded mt-2 focus:ring-transparent focus:border-black" />
                    </div>

                    <button className="bg-neutral-900 px-5 py-2 mt-5 text-white rounded w-full">
                        Login
                    </button>

                    <div className="mt-3">
                        Don't have an account?
                        <Link to='/register' className="font-bold ml-2 hover:text-gray-700">
                            Register here
                            </Link> 
                    </div>

                </div>
            </div>
        </>
    )
}