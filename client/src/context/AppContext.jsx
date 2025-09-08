import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = ""
    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setSeller(true);
            }
            else {
                setSeller(false);
            }
        } catch (error) {
            setSeller(false);
        }
    }


    // fetch User Auth Status ,User Data and cart Items
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if (data.success) {
              setuser(data.user)
              setCartItems(data.user.cartItems)  
            } 
            else{
                setuser(null)
            }
        } catch (error) {
            setuser(null)
        }
    }

    // fetch All Products
    const fetchProducts = async () => {
         try {
            const {data} = await axios.get('/api/products/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
         } catch (error) {
             toast.error(error.message)
         }
    }

    // Add products to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart")
    }

    // update Cart items quantity

    const updateCartItem = (itemId,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated")
    }

    // Remove item from cart

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Item removed from cart")
        setCartItems(cartData);
    }

    // Counting the Cart Items

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // get total cart amount

    const getCartTotal = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemsInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemsInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

// use effect for to fetch seller user and products
    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()

    }, [])



    // for cart items
    useEffect(()=>{
       const updateCart = async ()=>{
        try {
            const {data} = await axios.post('/api/cart/update',{userId:user._id, cartItems})
            if(!data.success){
                toast.error(data.message)
            }

        } catch (error) {
              toast.error(error.message)
        }
       }
       if(user){
        updateCart()
       }
    },[cartItems])



    const value = {
        navigate, user, setuser, isSeller, setSeller, showUserLogin,
        setShowUserLogin, products, currency, addToCart
        , cartItems, setCartItems, updateCartItem, removeFromCart
        , searchQuery, setSearchQuery,
        getCartCount, getCartTotal, axios,fetchProducts
    };
    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}