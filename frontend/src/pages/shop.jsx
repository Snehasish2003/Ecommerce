import React from 'react'
import Hero from '../components/Hero/Hero';
import Popular from '../components/popular/Popular';
import Offers from '../components/offer/Offers';
import Newcollections from '../components/collection/Newcollections';
import NewsLetter from '../components/NewsLetter/NewsLetter';



function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <Newcollections />
      <NewsLetter />
  
    </div>
  )
}


export default Shop;

