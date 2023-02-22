//import dependencies
import { Route, Routes, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'

//import pages
import Login from './pages/login/login';
// import Home from './pages/home/home.jsx';
import Register from './pages/register/register';

//import component
import NavbarUser from './components/navbarUser/navbarUser';
import Footer from './components/homeUser/footer/footer';


function App() {
  let [username,setUsername] = useState()
  let navigate = useNavigate()
  
  let loginAccount = async(inputEmail,inputPassword)=>{
    try {
        let response = await axios.post('http://localhost:8000/admin/login', {email:inputEmail,password:inputPassword})
        console.log(response)
        setUsername(response.data.data.name)
        localStorage.setItem('token', response.data.data.id)
        toast.success('Login Success!')

        setTimeout(()=>{
          toast('redirecting...')
      }, 2000)

        setTimeout(()=>{
            navigate('/admin')
        }, 3000)
    } catch (error) {
        console.log(error.response.data.message)
    }
}

 return(
  <>
     <NavbarUser />
     <Routes>
       {/* <Route path='/' element={<Home />} /> */}
       <Route path='/login' element={<Login funcLogin={{loginAccount}} />} />
       {/* <Route path='/register' element={<Register />} /> */}
     </Routes>
     <Toaster/>
     <Footer />
  </>
  );
}

export default App;
