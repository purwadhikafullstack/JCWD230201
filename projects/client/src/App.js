//import dependencies
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { userData } from './data/userData'
import { CheckLogin } from './utils/checklogin';

//import pages
import Login from './pages/login/login';
import Home from './pages/home/home.jsx';
import Register from './pages/register/register';
import Admin from './pages/admin/admin';
import AdminLogin from './pages/admin/adminlogin';

//import component
import NavbarUser from './components/navbarUser/navbarUser';
import Footer from './components/homeUser/footer/footer';


function App() {
  let [user, setUser] = useState('a')
  let navigate = useNavigate()
  let location = useLocation()

  let userValue = useMemo(()=> ({user,setUser}), [user,setUser])

  let keepLogin = async()=>{
    let response = await CheckLogin()
    console.log(response.id)
    if(!response){
      localStorage.removeItem('token')
      setUser('')
    }
    setUser(response)
  }

  useEffect( () => {
     keepLogin()
  }, [])

  return (
    <userData.Provider value={userValue}>
      {
      location.pathname.split('/')[1] == "admin" ?
        <>
          <Routes>
            <Route path='/admin' element={<Admin/>} >
            </Route>
          </Routes>
        </>
        :
        <>
          <NavbarUser />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login-admin' element={<AdminLogin/>}/>
          </Routes>
          <Toaster />
          <Footer />
        </>
        }
    </userData.Provider>
  );
}

export default App;
