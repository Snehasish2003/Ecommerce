import React from 'react'
import "./Cartitems.css"
import { useContext } from 'react'
import {ShopContext} from "../../Context/ShopContext"
import remove_icon from "../Assets/cart_cross_icon.png"
const Cartitems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext)
    console.log(cartItems);
    
  return (
    <div className='cartitems'>
    <div className="cartitems-format-main">

      <p>Products</p>
      <p>Title</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Total</p>
      <p>Remove</p>
    </div>
    <hr />
    {all_product.map((e)=>{
      if(cartItems[e.id]>0){
      return (
        <div className="cartitems-format">
            <img src={e.image} alt="" className='carticon-product-icon' />
            <p>{e.name}</p>
            <p>${e.new_price}</p>
            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
            <p>{e.new_price * cartItems[e.id] }</p>
            <img className='cartitem-removeicon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
            <hr />
        </div>
      )
      }
      return null;
    })}
    <div className="cartitems-down">
      <div className="cartitems-total">
        <h1>cart Totals</h1>
        <div>
          <div className="cartitems-total-item">
            <p>subtotal</p>
            <p>₹{getTotalCartAmount()}</p>

          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>shipping fee</p>
            <p>free</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <h1>Total</h1>
            <h3>₹{getTotalCartAmount()}</h3>
          </div>
        </div>
        <button>Proceed to checkout</button>
      </div>
    </div>
    </div>
  )
}

export default Cartitems
