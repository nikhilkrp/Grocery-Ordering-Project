import React from 'react'
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext.jsx';



const Bestseller = () => {
  const {products} = useAppContext();
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className='mt-6 grid  lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4'>

        {
          products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(
          <ProductCard key={index} product={product} />
          ))
        }
          
        </div>        
      
    </div>
  )
}

export default Bestseller
