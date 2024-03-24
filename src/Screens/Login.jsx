import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    const json = await response.json();
    console.log(json);

    if(json.success){
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate('/');
    }else{
      alert("Enter valid credentials");
    }
  }

  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }
  return (
    <div>
      <div className="container">
            <form onSubmit={handleSubmit} className='mt-5'>
                <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    id="exampleInputEmail1"
                />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    id="exampleInputPassword1"
                />
                </div>
                <button type="submit" className="btn btn-primary">
                Login
                </button>
                <Link to="/createuser" className="m-3 btn btn-danger">Create an Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login