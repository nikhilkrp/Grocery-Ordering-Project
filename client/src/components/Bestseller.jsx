import React from 'react'
import ProductCard from './ProductCard';



const Bestseller = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div>
          <ProductCard/>
        </div>        
      
    </div>
  )
}

export default Bestseller
