import React, { useEffect, useState } from 'react';
import axios from "axios";
import './Catagory.css';
import Dashboard from '../Dashboard';

const Admin_Login = () => {

  const [catagory, setCatagory] = useState('');
  const [img, setImage] = useState(null);
  const [desc, setDesc] = useState('');
  const [check, setCheck] = useState(false);
  const [form, setForm] = useState(false);//for dispaly form

  const [data, setData] = useState([]);//store backend data
  // const [id,setId] = useState();//for delete req

  // .............................................get req for backenddata ...........................................
  const showdata = async () => {
    const res = await axios.get("http://localhost:5000/addcatagory", {
    });
    console.log(res.data);
    setData(res.data);
  }
  useEffect(() => {
    showdata();
  }, []);

  // .............................................delete req for backenddata ...........................................

  const deletreq = async(e)=>{
    console.log(e);
    const res = axios.delete(`http://localhost:5000/deletecat/${e}`);
    if(res){
      console.log(res.data)
      alert("item deleted successfully...");
    }
    showdata();
  }

  // ..................................................form submit && post req function..............................................

  const handleCatagory = (e) => {
    e.preventDefault();
    console.log(check);
    const data_store = async () => {
      const formdata = new FormData();
      formdata.append('catagory', catagory);
      formdata.append('desc', desc);
      formdata.append('image', img);
      formdata.append('check', check);
      const res = await axios?.post("http://localhost:5000/addcatagory"
        , formdata,
        {
          headers: { 'Authorization': localStorage.getItem('token') }
        }

      )
      if (res.data) {
        alert('this catagory is already exists');
        setCatagory('');
        setDesc('');
        setImage(null);
        showdata();
      }
      else {
        setCatagory('');
        setDesc('');
        setImage(null);
        showdata();
      }
    }
    data_store();

  };

  const handlecheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheck(true)
      console.log("-----");
      console.log(value)
      console.log(check);//check==false
    }
    else {
      setCheck(false);
      console.log("......");
      console.log(check);
    }
  }


  return (<>

    <div className='lmain-div'>
      <div className='lside-section'>
        <Dashboard />
      </div>
      {/* <div className="option_b1">
                    <Option />
                </div>
                <SidebarL /> */}


      {/* side section end .....................................................................*/}
      {/* main section start */}

      {/*................................................form............................................... */}

      {form &&
        <div className="login-container">
          <div className='close'>
            <button className="close-btn" onClick={() => setForm(false)}>X close</button>
          </div>

          <form onSubmit={handleCatagory} className="login-form">
            <h2>Add Catagory</h2>
            <div className="form-data">
              <label htmlFor="desc">Catagory:</label>
              <input type="text" placeholder="Catagory" name='catagory' value={catagory} onChange={(e) => setCatagory(e.target.value)} required />
              <label htmlFor="desc">Description:</label>
              <input type="text" placeholder='Description' name='desc' value={desc} onChange={(event) => setDesc(event.target.value)} />
              <label htmlFor="img">Image:</label><br />
              <input accept='image/*' type='file' onChange={(e) => setImage(e.target.files[0])} /><br /><br />
              <label class="switch">Publish or Not</label>
              <input type="checkbox" className='check' value={"publish"} onChange={handlecheck} />
              <button type="submit">Add</button>
            </div>
          </form>
        </div>}

      <div className='main-section'>
        <div className="buttons">
          <button className='form-btn' onClick={() => setForm(true)}>+ Add Catagory</button>
        </div>
        <div className='main-head'>Catagories</div>

        {/* ....................................................backenddata........................................ */}
        <div className="backend-data">
              <table>
                <tr>
                  <th className='h1'>No.</th>
                  <th className='h2'>Id</th>
                  <th className='h3'>Catagory</th>
                  <th className='h4'>Image</th>
                  <th className='h5'>Description</th>
                  <th className='h6'>Publlish</th>
                  <th className='h7'>delete</th>
                </tr>
                
          {data?.map((item, i) =>
                <tr>
                  <td><span className="main-span">{++i}</span></td>
                  <td><span className="main-span">...{item._id.slice(20,24)}</span></td>
                  <td><span className="main-span">{item.desc.length>=10?`${item.desc.slice(0,15)}...` :item.desc}</span></td>
                  <td><span className="data-image"><img src={`http://localhost:5000/${item.img}`} alt="" /></span></td>
                  <td><span className="main-span">{item.desc.length>=50?`${item.desc.slice(0,70)}...` :item.desc}</span><br /></td>
                  <td> {item.check===true ?
                  <div><span className="main-span2">Published</span> <input type="checkbox" className='check' checked/></div>
                  :<div><span className="main-span2">Unpublished</span><input type="checkbox" className='check' /></div>}</td>
                  <td><span className="main-span"><button className="delet-btn" onClick={()=>deletreq(item._id)}>Delete</button></span></td>
                </tr>
          )}
          </table>
        </div>


      </div>

    </div>

  </>
  );
};


export default Admin_Login;
