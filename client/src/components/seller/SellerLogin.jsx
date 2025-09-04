import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {
    const{isSeller,setSeller,navigate} =useAppContext();
    const[email ,setEmail] =useState("");
    const[password ,setPassword] = useState("")

const submitHandler = async(e)=>{
           e.preventDefault();
           setSeller(true)
    }

    useEffect(()=>{
       if(isSeller){
        navigate("/seller")
       }    
    },[isSeller])


    
  return !isSeller && (
    <form onSubmit={submitHandler} className=" mt-24 flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
      <p className="text-2xl font-medium m-auto">
                <span className="text-green-500">Seller</span>Login
            </p>
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Enter email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"  required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" placeholder="Enter Password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"  required />
            </div>
            
            <button className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
             Login
            </button>
    </form>
  )
}

export default SellerLogin
