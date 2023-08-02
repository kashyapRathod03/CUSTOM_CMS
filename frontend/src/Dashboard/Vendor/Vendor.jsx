import React, { useState,useEffect } from 'react';
import axios from "axios";
import './Vendor.css';
import Dashboard from '../Dashboard';
import { useNavigate } from "react-router-dom";
import Single_poduct from './Single_poduct/Single_poduct';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Vendor() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImage] = useState(null);
  const [sku,setSku] = useState('');
  const [catagory, setCatagory] = useState('');
  const [check, setCheck] = useState(false);
  const [pprice, setPprice] = useState(0);
  const [sprice, setSprice] = useState(0);
  const [qnt, setQnt] = useState(0);
  const [form, setForm] = useState(false);//for dispaly form

  const [data, setData] = useState([]);//store backend data

  // .............................................get req for backenddata ...........................................
  const showdata = async () => {
    const res = await axios.get("http://localhost:5000/addproduct");
    console.log(res.data);
    setData(res.data);
  }
  useEffect(() => {
    showdata();
  }, []);

  // ..................................................form submit && post req function..............................................

  const handleProduct = (e) => {
    e.preventDefault();
    console.log(check);
    const data_store = async () => {
      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('desc', desc);
      formdata.append('image', img);
      formdata.append('sku', sku);
      formdata.append('catagory', catagory);
      formdata.append('pprice', pprice);
      formdata.append('sprice', sprice);
      formdata.append('qnt', qnt);
      formdata.append('check', check);
      const res = await axios?.post("http://localhost:5000/addproduct"
        , formdata,
        {
          headers: { 'Authorization': localStorage.getItem('token') }
        }

      )
      if (res.data) {
        alert('product successfully added...');
        setCatagory('');
        setCheck(false);
        setDesc('');
        setImage(null);
        setName('');
        setPprice(0);
        setSku('');
        setQnt(0);
        setSprice(0);
        showdata();
      }
      else {
        alert('this catagory is not exists or try to add new product !!!');
        showdata();
      }
    }
    data_store();
  };

   // .............................................update req for backenddata ...........................................

   const updatedata =async(i,c)=>{
    console.log(i,c);
    const res = await axios?.put(`http://localhost:5000/updatepro/${i}`
        ,{check:c}
      )
    console.log(res.data);
    showdata();
  };

   // .............................................delete req for backenddata ...........................................

   const deletreq = async (e) => {
    console.log(e);
    const res = axios.delete(`http://localhost:5000/deletepro/${e}`);
    if (res) {
      console.log(res.data)
      alert("item deleted successfully...");
    }
    showdata();
  }



  return (
    <>
     
    <div className='lmain-div'>
      <div className='lside-section'>
        <Dashboard />
      </div>
      {/*................................................form............................................... */}

      {form &&
        <div className="login-container">
          <div className='close'>
            <button className="close-btn" onClick={() => setForm(false)}>X close</button>
          </div>

          <form onSubmit={handleProduct} className="login-form">
            <h2>Add Product</h2><br />
            <div className="form-data">
            <label htmlFor="name">Name:</label>
              <input type="text" placeholder="Name" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
              <label htmlFor="desc">Description:</label>
              <input type="text" placeholder='Description' name='desc' value={desc} onChange={(event) => setDesc(event.target.value)} />
              <label htmlFor="img">Image:</label><br />
              <input accept='image/*' type='file' onChange={(e) => setImage(e.target.files[0])} /><br /><br />
              <label htmlFor="desc">Product SKU:</label><br />
              <input type="text" placeholder='Product SKU' name='sku' value={sku} onChange={(e) => setSku(e.target.value)} /><br /><br />
              <label htmlFor="cat">Catagory:</label><br />
              <input type="text" placeholder="Catagory" name='catagory' value={catagory} onChange={(e) => setCatagory(e.target.value)} required /><br /><br />
              <label htmlFor="cat">Product price:</label><br />
              <input type="number" placeholder="Product price" name='pprice' value={pprice} onChange={(e) => setPprice(e.target.value)} required /><br /><br />
              <label htmlFor="cat">Sale price:</label><br />
              <input type="number" placeholder="Catagory" name='sprice' value={sprice} onChange={(e) => setSprice(e.target.value)} required /><br /><br />
              <label htmlFor="cat">Qunatity:</label><br />
              <input type="number" placeholder="Catagory" name='qnt' value={qnt} onChange={(e) => setQnt(e.target.value)} required /><br /><br />
              <label class="switch">Publish or Not</label><br /><br />
              {/* <input type="checkbox" className='check' value={"publish"} onChange={handlecheck} /> */}
              <input type="radio" id="html" name="publish" value="publish" onChange={(e)=>setCheck(e.target.value)}/>
              <label for="html">Publish</label>
              <input type="radio" id="css" name="publish" value="unpublish"  onChange={(e)=>setCheck(e.target.value)}/>
              <label for="css">Unpublish</label><br /><br />
              <button type="submit">Add</button><br /><br />
            </div>
          </form>
        </div>}

      <div className='main-section'>
        <div className="buttons">
          <button className='form-btn' onClick={() => setForm(true)}>+ Add Product</button>
        </div>
        <div className='main-head'>Products</div>

        
        {/* ....................................................backenddata........................................ */}
        <div className="backend-data">
          <table>
            <tr>
              <th className='p1'>PRODUCT</th>
              <th className='p2'>NAME</th>
              <th className='p3'>Catagory</th>
              <th className='p4'>Price</th>
              <th className='p5'>Sale price</th>
              <th className='p6'>Stock</th>
              {/* <th className='p7'>Status</th> */}
              <th className='p8'>view</th>
              <th className='p9'>Published</th>
              <th className='p10'>Delete</th>
            </tr>

            {data?.map((item, i) =>
              <tr>
                <td><span className="data-image"><img src={`http://localhost:5000/${item.img}`} alt="" /></span></td>
                <td><span className="main-span">{item.name.length >= 10 ? `${item.name.slice(0, 15)}...` : item.name}</span></td>
                <td><span className="main-span">{item.cat.length >= 50 ? `${item.cat.slice(0, 70)}...` : item.cat  }</span><br /></td>
                <td><span className="main-span">{item.pprice}</span></td>
                <td><span className="main-span">{item.sprice}</span></td>
                <td><span className="main-span">{item.qnt}</span></td>
                <td><span className="main-span-btn" onClick={()=>navigate('/admin/dashboard/vendor/'+item._id)}>{'>'}</span></td>
                
                <td>
                   {/* {item.check === "publish"  */}
                   {item.check === "publish" ?
                  <div><span style={{color:"green"}} className="main-span2">Published</span><span style={{color:"red"}} className="main-span2" onClick={()=>updatedata(item._id,'unpublish')}>Unpublished</span></div>:
                  <div><span style={{color:"red"}} onClick={()=>updatedata(item._id,'publish')} className="main-span2">Published</span><span style={{color:"green"}} className="main-span2">Unpublished</span></div>
                  }</td> 
                <td><span className="main-span"><button className="delet-btn" onClick={() => deletreq(item._id)}>Delete</button></span></td>
              </tr>
            )}
          </table>
        </div>



      </div>

    </div>
    </>
  )
}
