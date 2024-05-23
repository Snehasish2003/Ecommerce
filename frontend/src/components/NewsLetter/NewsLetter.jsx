import React from 'react'
import "./NewsLetter.css"
function NewsLetter() {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1> 
      <p>subscribe to our newletter and stay Connected</p>
    <div>
        <input type="email" placeholder='Your Email'/>
        <button>Subscribe</button>
    </div>
    </div>
  )
}

export default NewsLetter
