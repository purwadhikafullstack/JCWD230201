//import dependencies
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { CheckLogin } from './utils/checklogin';
import axios from 'axios';

//import pages
import Login from './pages/login/login';
import Home from './pages/home/home.jsx';
import Register from './pages/register/register';
import Activation from './pages/activation/activation';
import Admin from './pages/admin/admin';
import AdminLogin from './pages/admin/adminlogin';

//import component
import NavbarUser from './components/navbarUser/navbarUser';
import Footer from './components/homeUser/footer/footer';
import AdminSetting from './components/adminContainer/adminsetting';
import Dashboard from './components/adminContainer/dashboard';
import AdminSettingProfile from './components/adminContainer/adminsettingprofile';
import GetAllAccount from './components/adminContainer/getallaccount';
import Error from './components/error404/error';
import ErrorAdmin from './components/error404/erroradmin';
import Product from './components/product/product';
import ProductDetail from './components/product_detail/product_detail';
import AddAdmin from './components/adminContainer/addadmin';
import AllTransaction from './components/adminContainer/transactionContainer/alltransaction';
import ConfirmEmail from './pages/confirmEmail/confirmEmail';
import ResetPassword from './pages/resetPassword/resetPassword';
import Shipping from './components/shipping/shipping';

//import context for global
import { userData } from './data/userData'
import {TransactionData} from './data/transactionAdmin'


function App() {
  let [user, setUser] = useState(null)
  let [transaction, setTransaction] = useState(null)
  let navigate = useNavigate()
  let location = useLocation()

  const [show, setShow] = useState([])
  const [showDetail, setShowDetail] = useState([])
  const [detail, setDetail] = useState([])
  const [detailProduct, setDetailProduct] = useState([])

  let userValue = useMemo(() => ({ user, setUser }), [user, setUser])
  let transactionDetail = useMemo(()=> ({ transaction, setTransaction }), [transaction, setTransaction] )

  let keepLogin = async () => {
    let response = await CheckLogin()
    // console.log(response.id)
    if (!response) {
      localStorage.removeItem('token')
      setUser(null)
    }
    setUser(response)
  }

  let getProductDetail = async(id)=>{
    try {
        // console.log(id);
        let response = await axios.get(`http://localhost:8000/product/productdetail/${id}`)
        // console.log(response.data.data[0].product_images[0].img);
        setDetail(response.data.data[0])
        setDetailProduct(response.data.data[0].product_details)
    } catch (error) {
        console.log(error)
    }
  }

  let getProduct = async(id)=>{
    try {
        let {data} = await axios.get(`http://localhost:8000/product/${id}`)
        setShow(data.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    keepLogin()
  }, [])

  return (
    <userData.Provider value={userValue}>
      {
        location.pathname.split('/')[1] == "admin" ?
          <>
          <TransactionData.Provider value={transactionDetail}>
            <Routes>
              <Route path='/admin' element={<Admin />} >
                <Route path='' element={<Dashboard />} />
                <Route path='all-user' element={<GetAllAccount />} />
                <Route path='setting' element={<AdminSetting />} />
                <Route path='setting/addNewAdmin' element={<AddAdmin />} />
                <Route path='profile/:id' element={<AdminSettingProfile />} />
                <Route path='All-Transaction' element={<AllTransaction />} />
                <Route path='*' element={<ErrorAdmin />} />
              </Route>
            </Routes>
            </TransactionData.Provider>
          </>
          :
          <>
            <NavbarUser func={{ getProductDetail,getProduct }} data={{ show }} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/activation/:id' element={<Activation />} />
              <Route path='/confirm-email' element={<ConfirmEmail />} />
              <Route path='/reset-password/:id' element={<ResetPassword />} />
              <Route path='/login-admin' element={<AdminLogin />} />
              <Route path='*' element={<Error />} />
              <Route path='/product/:id' element={<Product data={{ show }} func={{getProduct}} />} />
              <Route path='/product/productdetail/:id' element={<ProductDetail func={{ setShowDetail, getProductDetail }} data={{ showDetail, show, detail, detailProduct }} />} />
              <Route path='/shipping/:id' element={<Shipping func={{ setShowDetail,getProductDetail }}/>} />
            </Routes>
            <Toaster />
            <Footer />
          </>
      }
    </userData.Provider>
  );
}

export default App;
