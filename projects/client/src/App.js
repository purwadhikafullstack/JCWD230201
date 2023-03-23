//import dependencies
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { CheckLogin } from './utils/checklogin';
import axios from 'axios';

//import pages
import Login from './pages/login/login';
import Home from './pages/home/home.jsx';
import Register from './pages/register/register';
import Activation from './pages/activation/activation';
import Admin from './pages/admin/admin';
import AdminLogin from './pages/admin/adminlogin';
import ConfirmEmail from './pages/confirmEmail/confirmEmail';
import ResetPassword from './pages/resetPassword/resetPassword';
import MyAccount from './pages/my-account/myaccount';
import DashboardAccount from './pages/dashboardAccount/dashboardAccount';
import MyAccountInfo from './pages/my-account-info/myAccountInfo';
import MyAccountAddress from './pages/my-account-address/myAccountAddress';
import Cart from './pages/cart/cart';
import ShippingSuccess from './pages/shippingSuccess/shippingSuccess';

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
import Shipping from './components/shipping/shipping';
import Warehouse from './components/adminContainer/warehouse';
import SalesReport from './components/adminContainer/salesreport';
import TransactionXYZ from './components/transaction/transactionXYZ';
import TransactionHistory from './components/transactionHistoryUser/transactionHistoryUser';
import DetailTransaction from './components/detailTransactionUser/detailTransactionUser';
import AdminCategoryProducts from './components/adminContainer/adminCategoryProducts';
import AdminProducts from './components/adminContainer/adminProducts';


//import context for global
import { userData } from './data/userData'
import { TransactionData } from './data/transactionAdmin'

function App() {
  let [user, setUser] = useState(null)
  let [transaction, setTransaction] = useState(null)
  let navigate = useNavigate()
  let location = useLocation()

  const [show, setShow] = useState([])
  const [showDetail, setShowDetail] = useState([])
  const [detail, setDetail] = useState([])
  const [detailProduct, setDetailProduct] = useState([])
  const [verifyStatus, setVerifyStatus] = useState('')
  const [itemCart, setItemCart] = useState([])
  const [arrColor, setArrColor] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  const [loadingIndex, setLoadingIndex] = useState(0)

  let userValue = useMemo(() => ({ user, setUser }), [user, setUser])
  let transactionDetail = useMemo(() => ({ transaction, setTransaction }), [transaction, setTransaction])

  let keepLogin = async () => {
    let response = await CheckLogin()
    // console.log(response.id)
    if (!response) {
      localStorage.removeItem('token')
      setUser(null)
    }
    setUser(response)
  }

  let getProductDetail = async (id) => {
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

  let getProduct = async (id) => {
    try {
      let { data } = await axios.get(`http://localhost:8000/product/${id}`)
      setShow(data.data)
      console.log(data);
      var arrColor = []
      var arrColor2 = []
      data.data.forEach((item, index) => {
        item.product_details.forEach((item, index) => {
          if (!arrColor.includes(item.colorhex)) arrColor.push(item.colorhex)
        })
        arrColor2.push(arrColor)
        arrColor = []
      });
      setArrColor(arrColor2);

    } catch (error) {
      console.log(error)
    }
  }
  // let loginKeep = async () => {
  //   try {
  //     let response = await axios.post('http://localhost:8000/users/keep-login', {
  //       headers: {
  //         "token": localStorage.getItem('token')
  //       }
  //     })
  //     setVerifyStatus(response.data.data.status);
  //   } catch (error) {

  //   }
  // }
  let notRegister = () => {
    // console.log(localStorage);
    if ((localStorage.getItem("token") == null) || (verifyStatus === "Unverified")) {
      setTimeout(() => {
        toast('Login or Regist First', {
          duration: 3000
        })
      }, 1000)

      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }

  let getCart = async () => {
    try {
      let response = await axios.get('http://localhost:8000/cart/data-cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      // console.log(response.data.data)
      setItemCart(response.data.data)

      let sum = 0
      response.data.data.forEach(e =>
        sum += e.qty * e.product_detail.price)
      setTotalPrice(sum)
      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    keepLogin()
    // loginKeep()
  }, [])

  return (
    <userData.Provider value={userValue}>
      {
        location.pathname.split('/')[1] == "admin" ?
          <>
            <TransactionData.Provider value={transactionDetail}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={<Admin />} >
                  <Route path='' element={<Dashboard />} />
                  <Route path='all-user' element={<GetAllAccount />} />
                  <Route path='setting' element={<AdminSetting />} />
                  <Route path='profile/:id' element={<AdminSettingProfile />} />
                  <Route path='Transaction' element={<TransactionXYZ />} />
                  <Route path='warehouse' element={<Warehouse />} />
                  <Route path='products' element={<AdminCategoryProducts />} >
                    <Route path=':id' element={<AdminProducts />} />
                  </Route>
                  <Route path='sales-report' element={<SalesReport />} />
                  <Route path='*' element={<ErrorAdmin />} />

                </Route>
              </Routes>
            </TransactionData.Provider>
          </>
          :
          <>
            <NavbarUser func={{ getProductDetail, getProduct, notRegister, getCart }} data={{ show, itemCart }} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/activation/:id' element={<Activation />} />
              <Route path='/confirm-email' element={<ConfirmEmail />} />
              <Route path='/reset-password/:id' element={<ResetPassword />} />
              <Route path='/my-account' element={<MyAccount />}>
                <Route path='' element={<DashboardAccount />} />
                <Route path='information' element={<MyAccountInfo />} />
                <Route path='address' element={<MyAccountAddress />} />
                <Route path='history' element={<TransactionHistory />} />
                <Route path='history/:id' element={<DetailTransaction />} />
              </Route>
              <Route path='/cart' element={<Cart func={{ getCart }} data={{ itemCart, totalPrice,loading,setLoading,setLoadingIndex,loadingIndex }} />} />
              <Route path='/login-admin' element={<AdminLogin />} />
              <Route path='*' element={<Error />} />
              <Route path='/product/:id' element={<Product data={{ arrColor, show, detail, detailProduct }} func={{ getProduct }} />} />
              <Route path='/product/productdetail/:id' element={<ProductDetail func={{ setShowDetail, getProductDetail, getCart }} data={{ showDetail, show, detail, detailProduct, itemCart }} />} />
              <Route path='/shipping' element={<Shipping func={{ setShowDetail, getProductDetail, notRegister, setItemCart }} />} />
              <Route path='/shipping/success/:id' element={<ShippingSuccess />} />
            </Routes>
            <Toaster />
            <Footer />
          </>
      }
    </userData.Provider>
  );
}

export default App;
// 