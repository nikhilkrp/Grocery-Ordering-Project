import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";
import { useEffect } from "react";
import toast from "react-hot-toast";
const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    const { user, setuser, setShowUserLogin, navigate,
        getCartCount, getCartTotal,
        setSearchQuery, searchQuery,axios } = useAppContext();


    const logout = async () => {
        try {
            const {data} = await axios.get('/api/user/logout')
            if(data.success){
                toast.success(data.message)
                setuser(null)
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])


    return (

        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-green-100 relative transition-all rounded-full">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt='logo' />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white">Home</NavLink>
                <NavLink className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white" to="/products">Products</NavLink>
                <NavLink className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white" to="/contact">Contact</NavLink>
                <NavLink className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white" to="/seller">Seller</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-green-700 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-green-500" type="text" placeholder="Search products" />
                    <img className="text-green-900 w-4" src={assets.search_icon} alt="seacrch" />
                </div>

                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="h-4" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>


                {!user ?
                    (
                        <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-red-500 hover:bg-red-600  transition text-white rounded-full">
                            Login
                        </button>
                    ) : (
                        <div className="relative group">
                            <img src={assets.profile_icon} className="w-10" alt="" />
                            <ul className="hidden absolute group-hover:block top-10 right-0 bg-white shadow
                        border border-gray-200 py-2.5 w-40 rounded-md text-sm z-40">
                                <li onClick={() => navigate("my-orders")} className="p=1.5 pl-3 hover:bg-red-400 cursor-pointer">My Orders</li>
                                <li onClick={logout} className="p=1.5 pl-3 hover:bg-red-400 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )
                }
            </div>




            {/* Mobile Menu */}
            <div className="flex items-center gap-6 sm:hidden ">
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="h-4" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" className="" />
                </button>
            </div>
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] right-0 w-full z-10 py-4 flex-col items-end gap-2 px-5 text-md md:hidden text-black opacity-90 `}>
                    <NavLink  className="bg-green-400 hover:bg-green-500 px-2 rounded-lg text-white" to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white" to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user && <NavLink className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white" to="/myorder" onClick={() => setOpen(false)}>My Orders</NavLink>}
                    <NavLink className="bg-green-400 hover:bg-green-500  px-2 rounded-lg text-white" to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                    {!user ? (
                        <button onClick={() => { setOpen(false); setShowUserLogin(true) }} className="cursor-pointer px-4 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg text-sm">
                            Login
                        </button>) : (
                        <button onClick={logout} className="cursor-pointer px-4 py-1 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-lg text-sm">
                            Logout
                        </button>
                    )
                    }
                </div>

            )}

        </nav>

    )
}
export default Navbar