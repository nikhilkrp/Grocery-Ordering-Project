import React from "react"
import { useAppContext } from "../context/AppContext.jsx"
import { useParams } from "react-router-dom"
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard.jsx";

const ProductCategory = () => {
    const {products} = useAppContext();
    const {category} = useParams();
    const  searchCategory = categories.find((item)=>item.path.toLowerCase()===category)

    const filteredProducts = products.filter((product)=>product.category.toLowerCase()===category)





    return (
        <div className="mt-16">
           {searchCategory && (
            
            <div className="flex flex-col items-end w-max">
                <p className="text-2xl font-medium">
                    {searchCategory.text.toUpperCase()}
                    <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
                </p>
            </div>
           )}

           {/* filtering products based on category*/}

          { filteredProducts.length>0 ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product,index)=>(<ProductCard key={product._id} product={product}/>) ) }
            </div>
          ):(
            <div className="h-[70vh] flex flex-col justify-center items-center gap-4">
                <p className="font-semibold md:text-3xl text-2xl text-red-600">No Products Matches !!</p>
            </div>
          )}



        </div>

    )
}
export default ProductCategory