import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Admin_Login.css';

const Admin_Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const data_store = async()=>{
      
      const res = await axios?.post("http://localhost:5000/admin"
          ,{username:username,password:password}
          )
          console.log(res.data);
          if(res.data){
           navigate('/admin/dashboard/catagory');
           setUsername('');
           setPassword('');
          }
          else{
            alert('username and password is wrong');
            setUsername('');
            setPassword('');
          }
    }
    data_store(); 
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin_Login;
