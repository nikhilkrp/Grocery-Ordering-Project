import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import bgim from '../../assets/seller.jpg';
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setSeller, navigate,axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  // api call for seller login
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/seller/login', { email, password })
      if (data.success) {
        setSeller(true)
        navigate('/seller')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
  
  useEffect(() => {
    if (isSeller) {
      navigate("/seller")
    }
  }, [isSeller])



  return !isSeller && (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={bgim}
        alt="background"
        className="absolute w-full h-full object-cover"
      />

      {/* Login Form */}
      <form
        onSubmit={submitHandler}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
               flex flex-col gap-4 w-80 sm:w-[352px] p-8 py-12 bg-white bg-opacity-90
               text-gray-500 rounded-lg shadow-xl border border-gray-200"
      >
        <p className="text-2xl font-medium text-center">
          <span className="text-green-500">Seller</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default SellerLogin
