//import dependencies
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {useEffect, useState} from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'



//import pages
import Login from './pages/login/login';
// import Home from './pages/home/home.jsx';
import Register from './pages/register/register';
import Admin from './pages/admin/admin';

//import component
import NavbarUser from './components/navbarUser/navbarUser';
import Footer from './components/homeUser/footer/footer';


function App() {
  let [username,setUsername] = useState()
  let navigate = useNavigate()
  let location = useLocation()
  
  
  let loginAccount = async(inputEmail,inputPassword)=>{
    console.log(inputEmail)
    try {
        let response = await axios.post('http://localhost:8000/admin/login', {email:inputEmail,password:inputPassword})
        console.log(response)
        setUsername(response.data.data.name)
        localStorage.setItem('token', response.data.data.id)
        toast.success('Login Success!',{
          style:{
            background:"black",
            color:'white'
          }
        })

        setTimeout(()=>{
          toast('redirecting...',{
            duration:2500
          })
      }, 200)

        setTimeout(()=>{
            navigate('/admin')
        }, 3000)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
  console.log(location.pathname.split('/')[1])
},[])

 return(
  location.pathname.split('/')[1]=="admin"?
  <>
  <Routes>
    <Route path='/admin' element={<Admin data={{username}}/>} />
  </Routes>
  </>
  :
  <>
     <NavbarUser />
     <Routes>
       {/* <Route path='/' element={<Home />} /> */}
       <Route path='/login' element={<Login funcLogin={{loginAccount}} />} />
       {/* <Route path='/register' element={<Register />} /> */}
       <Route path='/admin' element={<Admin data={{username}}/>} />
     </Routes>
     <Toaster/>
     <Footer />
  </>
  
  );
}

export default App;
