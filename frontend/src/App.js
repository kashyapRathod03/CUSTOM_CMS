import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin_Login from './Admin/Admin_Login/Admin_Login';
import Vendor from './Dashboard/Vendor/Vendor';
import Home from './Home/home'
import Catagory from './Dashboard/Catagory/Catagory';
import Single_Poduct from './Dashboard/Vendor/Single_poduct/Single_poduct';
function App() {

  return (
    <>
       <BrowserRouter>
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/admin" element={<Admin_Login/>} />
       <Route path="/admin/dashboard/vendor" element={<Vendor/>} />
       <Route path="/admin/dashboard/catagory" element={<Catagory/>} />
       <Route path="/admin/dashboard/vendor/:id" element={<Single_Poduct/>} />
       </Routes>

       </BrowserRouter>
        
    </>
  );
}

export default App;
