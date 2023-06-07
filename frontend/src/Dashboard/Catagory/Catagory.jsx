import React, { useEffect, useState } from 'react';
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import './Catagory.css';
import Dashboard from '../Dashboard';

const Admin_Login = () => {
  // let navigate = useNavigate();

  const [catagory, setCatagory] = useState('');
  const [img, setImage] = useState(null);
  const [desc, setDesc] = useState('');

  const [form, setForm] = useState(false);
  const [catagory_backend, setCatagory_Backend] = useState([]);

 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  }; 

  const showdata = async () => {
    const res = await axios.get("http://localhost:5000/addcatagory",{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    let d = res.data;
    console.log(d);
    setCatagory_Backend(d);
  }
  const handleCatagory = (e) => {
    e.preventDefault();

    const data_store = async () => {

      const res = await axios?.post("http://localhost:5000/addcatagory"
        , { catagory: catagory,desc:desc,img:img }
      )
      // console.log(res.data);
      if (res.data) {
        alert('this catagory is already exists');
        setCatagory('');
        showdata();
      }
      else {
        setCatagory('');
        showdata();
      }
    }
    data_store();

  };

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

      <div className='main-section'>
        <button onClick={() => setForm(true)}>+ Add Catagory</button>
        <div className='main-head'>Catagories</div>
        {catagory_backend?.map((item,i) => 
        <div>
            <span className="main-span_l29">{++i}. {item.catagory}</span><br />
            <span className="main-span_l29">{item.desc}</span><br />
            <span className="main-span_l29"><img src={`data:image/jpeg;charset=utf-8;base64,${item.img}`} alt="" /></span><br />
          </div>
        )}

        {form && <div className="login-container">
          <button onClick={() => setForm(false)}>X close</button>

          <form onSubmit={handleCatagory} className="login-form">
            <h2>Add Catagory</h2>
            <input
              type="text"
              placeholder="Catagory"
              name='catagory'
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
              required
            />
            <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="text1"
          name='desc'
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
        />
        <label htmlFor="img">Image:</label>
        <input
          type="file"
          id="image"
          name='img'
          accept="image/*"
          onChange={handleImageUpload}
        />
        {img && <img src={img} alt="Uploaded" />}
            <button type="submit">Add</button>
          </form>
        </div>}

      </div>

    </div>

  </>
  );
};

export default Admin_Login;





// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import './Catagory.css';
// import Dashboard from '../Dashboard';

// const Admin_Login = () => {
//   // let navigate = useNavigate();

//   const [catagory, setCatagory] = useState('');
  

//   const [form, setForm] = useState(false);
//   const [catagory_backend, setCatagory_Backend] = useState([]);

//   // useEffect(()=>{
//   //   showdata();
//   // })

//   const showdata = async () => {
//     const res = await axios.get("http://localhost:5000/addcatagory");
//     let d = res.data;
//     console.log(d);
//     setCatagory_Backend(d);
//   }
//   const handleCatagory = (e) => {
//     e.preventDefault();

//     const data_store = async () => {

//       const res = await axios?.post("http://localhost:5000/addcatagory"
//         , { catagory: catagory }
//       )
//       // console.log(res.data);
//       if (res.data) {
//         alert('this catagory is already exists');
//         setCatagory('');
//         showdata();
//       }
//       else {
//         setCatagory('');
//         showdata();
//       }
//     }
//     data_store();

//   };

//   return (<>

//     <div className='lmain-div'>
//       <div className='lside-section'>
//         <Dashboard />
//       </div>
//       {/* <div className="option_b1">
//                     <Option />
//                 </div>
//                 <SidebarL /> */}


//       {/* side section end .....................................................................*/}
//       {/* main section start */}

//       <div className='main-section'>
//         <button onClick={() => setForm(true)}>+ Add Catagory</button>
//         <div className='main-head'>Catagories</div>
//         {catagory_backend?.map((item,i) => <div><span className="main-span_l29">{++i}. {item.catagory}</span><br /></div>)}

//         {form && <div className="login-container">
//           <button onClick={() => setForm(false)}>X close</button>

//           <form onSubmit={handleCatagory} className="login-form">
//             <h2>Add Catagory</h2>
//             <input
//               type="text"
//               placeholder="Catagory"
//               name='catagory'
//               value={catagory}
//               onChange={(e) => setCatagory(e.target.value)}
//               required
//             />
//             <button type="submit">Add</button>
//           </form>
//         </div>}

//       </div>

//     </div>

//   </>
//   );
// };

// export default Admin_Login;
