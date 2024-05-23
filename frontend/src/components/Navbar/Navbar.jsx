import React, { useState } from 'react';
import './Navbar.css';
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import {Link} from "react-router-dom"
function Navbar() {

  const [nav,setNav]=useState("shop");
  const logout=()=>{
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  }
  return (
    <div className='Navbar'>
    <div className='nav-logo'>
    <img src={logo} alt=''/>
    <p>Shopper</p>

    </div>
    <div className='nav-menu'>
        <li onClick={()=>{setNav("shop")}}><Link to="/" >Shop</Link> {nav==="shop" ?<hr />:<></>}</li>
        <li onClick={()=>{setNav("men")}}><Link to="/men">Men</Link> {nav==="men" ?<hr />:<></>}</li>
        <li onClick={()=>{setNav("women")}}><Link to="/women">Women</Link> {nav==="women" ?<hr />:<></>}</li>
        <li onClick={()=>{setNav("kids")}}><Link to="/kids">Kids</Link> {nav==="kids" ?<hr />:<></>}</li>
    </div>
    <div className='nav-login-cart'>
    {localStorage.getItem("auth-token")?<button onClick={logout}>Logout</button>: <Link to="/login" ><button>Login</button> </Link>}
       <Link to="/cart" ><img src={cart_icon} alt='' /> </Link>
        
    </div>
      
    </div>
  )
}

export default Navbar;
