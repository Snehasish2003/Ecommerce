import React, { useState } from 'react'
import "./css/LoginSignup.css"

function LoginSignup() {
  const [state,setState]=useState("Login");
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
  });

  const changeHandler=async(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    
  }

  const login=async()=>{
    let responseData;
    await fetch("http://localhost:4000/login",{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData=data});

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
  }
  const signUp=async()=>{
    console.log("signUp")
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData=data});

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }

  }
  return (
    <div className='LoginSignup'>
    <div className="LoginSignup-container">
      <h1>{state}</h1>
      <div className="LoginSignup-fields">
       {state==="Sign Up"? <input type="text" name='username' value={formData.name} onChange={changeHandler} placeholder='Your Name' /> :<></>}
        <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
        <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
      </div>
      <button onClick={()=>{state==="Login"?login():signUp()}}>Countinue</button>
    {state==="Sign Up"?  <p className="LoginSignup-login">Already have an account?<span onClick={()=>setState("Login")}>Login here</span></p>:<p className="LoginSignup-login">Create an account?<span onClick={()=>setState("Sign Up")}>Click here</span></p>}
      <div className="LoginSignup-agree">
        <input type="checkbox" name="" id="" />
        <p>By Countinuing ,I agree to the Privacy policy and Terms</p>
      </div>
    </div>
      
    </div>
  )
}

export default LoginSignup;
