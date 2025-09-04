import React, {useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import ProductCard from '../components/ProductCard.jsx'






const AllProducts = () => {

    const {products , searchQuery} = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(()=>{
          if(searchQuery.length>0){
            setFilteredProducts(products.filter((
                product)=> product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))}else{
        setFilteredProducts(products)
    }
    },[products,searchQuery])

  return (
    <div className='mt-16 flex flex-col'>

    <div className='flex flex-col gap-2 w-max items-end'>
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-green-500 rounded-full'></div>
    </div>

    <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
           {filteredProducts.filter((product)=>product.inStock).map((product , index)=>(
            <ProductCard key={index} product={product}/>
           ))}
    </div>
      
    </div>
  )
}

export default AllProducts
