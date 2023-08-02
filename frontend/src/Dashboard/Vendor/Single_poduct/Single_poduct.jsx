import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
require("./Single_poduct.css");


export default function Single_poduct() {
    const { id } = useParams();
    const [data, setData] = useState([]);//store backend data

    const showdata = async () => {
        const res = await axios?.get("http://localhost:5000/giveproduct/"+id);
        console.log(res.data);
        setData(res.data);
      }
      useEffect(() => {
        showdata();
      }, []);
  return (
    <>
    <h1>{data.name}</h1>
        <div className='single-main-div'>
            <div className="main-img-div">
            <span className="dataimage"><img src={`http://localhost:5000/${data.img}`} alt="" /></span>
            </div>
            <div className="exp-main-div">
                <span className='head'>Product Name:</span><br/>
                <span>{data.name}</span><br/><br/>
                <span className='head'>Product Catagory:</span><br/>
                <span>{data.cat}</span><br/><br/>
                <span className='head'>Product Description:</span><br/>
                <span>{data.desc}</span><br/><br/>
                <span className='head'>Product Sku:</span><br/>
                <span>{data.sku}</span><br/><br/>
                <span className='head'>Product Price:   </span> 
                <span>{data.pprice}</span><br/><br/>
                <span className='head'>Selling Price:   </span>
                <span>{data.sprice}</span><br/><br/>
                <span className='head'>Stack:   </span>
                <span>{data.qnt}</span><br/><br/>
            </div>
        </div>
    </>
  )
}
