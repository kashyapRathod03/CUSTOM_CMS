import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin_Login from './Admin/Admin_Login/Admin_Login';
import Vendor from './Dashboard/Vendor/Vendor';
import Catagory from './Dashboard/Catagory/Catagory';
function App() {

  return (
    <>
       <BrowserRouter>
       <Routes>
       <Route path="/admin" element={<Admin_Login/>} />
       <Route path="/admin/dashboard/vendor" element={<Vendor/>} />
       <Route path="/admin/dashboard/catagory" element={<Catagory/>} />
       </Routes>

       </BrowserRouter>
        
    </>
  );
}

export default App;
