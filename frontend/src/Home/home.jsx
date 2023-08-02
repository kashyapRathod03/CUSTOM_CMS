import React, { useState, useEffect } from 'react';
import './home.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import banner from '../images/banner-img.png';

export default function Home() {
    const [data, setData] = useState([]);//store backend data
    const navigate = useNavigate();

    const showdata = async () => {
        const res = await axios.get("http://localhost:5000/addproduct");
        console.log(res.data);
        setData(res.data);
    }
    useEffect(() => {
        showdata();
    }, []);

    return (
        <>

            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {/* <li class="nav-item">
          <a class="nav-link" href="">Features</a>
        </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="banner">
                <div className="text-content">
                    <h1>SALES</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Obcaecati nulla aspernatur distinctio eos voluptatum, consequuntur necessitatibus
                        omnis possimus quaerat nobis nostrum dolor rem in debitis iste nihil laboriosam quae ratione!
                    </p>
                    <div className="ctas">
                        <button className='btn banner-cta'>Read More</button>
                        <button className='btn banner-cta'>Shop Now</button>
                    </div>
                </div>
                <img src={banner} alt="" className="showup-img" />
            </div>
            <h1>Our Products</h1>
            <div className="container main-div">
                {data?.map((item, i) =>
                <div className="cart-div">
                        <div class="col-xs-3 col-sm-3 col-md-3">
                            <div class="card align-items-center" style={{ width: "18rem" }}>
                                <img src={`http://localhost:5000/${item.img}`} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title" >{item.name.length >= 10 ? `${item.name.slice(0, 25)}...` : item.name}</h5>
                                    <p class="card-text">{item.cat.length >= 50 ? `${item.cat.slice(0, 70)}...` : item.cat}</p>
                                    <p class="card-text">{item.desc.length >= 50 ? `${item.desc.slice(0, 70)}...` : item.desc}</p>
                                    <span className="btn btn-primary" onClick={() => navigate('/admin/dashboard/vendor/' + item._id)}>Quick View</span>
                                </div>
                            </div>
                        </div>
                        </div>
                
                )}
            </div>

        </>
    )
}
