import React from 'react'
import { useContext } from 'react'
import {ShopContext} from "../Context/ShopContext";
import {useParams} from "react-router-dom";
import Bredcrums from '../components/Bredcrums/Bredcrums';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import RelatedProduct from '../components/relatedProduct/RelatedProduct';

const Product=()=> {
  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  console.log(productId)
  const product=all_product.find((e)=>e.id===Number(productId));
  return (
    <div>
      <Bredcrums product={product} />
      <ProductDisplay product={product} />
      <RelatedProduct />
    </div>
  )
}

export default Product
