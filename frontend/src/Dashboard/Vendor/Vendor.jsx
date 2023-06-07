import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Vendor.css';



export default function Vendor() {
    const [img, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [qnt, setQnt] = useState('');
    const [pname, setText] = useState('');
    const [cat,setCat] = useState('');
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();

      const data_store = async () => {

        const res = await axios?.post("http://localhost:5000/addproduct"
          , { cat:cat,price:price,name:pname,qnt:qnt,img:img }
        )
        console.log(res.data);
        if (res.data) {
          alert('....');
          // showdata();
        }
        else {
          alert('this product is already exists');
          // showdata();
        }
      }
      data_store();

    };
  return (
    <>
       <form onSubmit={handleSubmit}>
      <div>
      <div>
      <div>
        <label htmlFor="catagory">Catagory:</label>
        <input
          type="text"
          id="text"
          name='catagory'
          value={cat}
          onChange={(event) => setCat(event.target.value)}
        />
      </div>

        <label htmlFor="pname">Name:</label>
        <input
          type="text"
          id="text1"
          name='pname'
          value={pname}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name='img'
          accept="image/*"
          onChange={handleImageUpload}
        />
        {img && <img src={img} alt="Uploaded" />}
      </div>

      <div>
        <label htmlFor="price">Price :</label>
        <input
          type="number"
          id="number1"
          name='price'
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="qnt">Quntaty:</label>
        <input
          type="number"
          id="number2"
          name='qnt'
          value={qnt}
          onChange={(event) => setQnt(event.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
    </>
  )
}
