import React from "react"
import Navbar from "./components/Navbar.jsx"
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home.jsx"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer.jsx"
import { useAppContext } from "./context/AppContext.jsx"
import Login from "./components/Login.jsx"
import AllProducts from "./pages/AllProducts.jsx"
import ProductCategory from "./pages/ProductCategory.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import Cart from "./pages/Cart.jsx"
import AddAddress from "./pages/AddAddress.jsx"
import MyOrders from "./pages/MyOrders.jsx"
import SellerLogin from "./components/seller/SellerLogin.jsx"
import Seller from "./pages/Seller.jsx"
import AddProduct from "./pages/AddProduct.jsx"
import ProductList from "./pages/ProductList.jsx"
import Orders from "./pages/Orders.jsx"
import Contact from "./pages/Contact.jsx"
import Loading from "./components/Loading.jsx"


const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {isSellerPath ? null : <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/seller' element={isSeller ? <Seller /> :<SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
