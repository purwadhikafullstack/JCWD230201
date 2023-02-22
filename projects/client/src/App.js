//import dependencies
import { Route, Routes } from 'react-router-dom';

//import pages
import Login from './pages/login/login';
import Home from './pages/home/home.jsx';
import Register from './pages/register/register';

//import component
import NavbarUser from './components/navbarUser/navbarUser';
import Footer from './components/homeUser/footer/footer';


function App() {
 return(
  <>
     <NavbarUser />
     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
     </Routes>
     <Footer />
  </>
  );
}

export default App;
