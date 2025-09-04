import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

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

    // fetch All Products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    // Add products to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId]=1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart")
    }

    // update Cart items quantity

    const updateCartItem = (itemId)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData);
        toast.success("Cart updated")
    }

    // Remove item from cart

    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -=1; 
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        toast.success("Item removed from cart")
        setCartItems(cartData);
    }

    // Counting the Cart Items

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
          return totalCount;
    }

    // get total cart amount

    const getCartTotal = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemsInfo = products.find((product)=>product._id===items);
            if(cartItems[items]>0){
                totalAmount+=itemsInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) /100;
    }

    useEffect(() => {
   fetchProducts()
    },[])



    const value = { navigate, user, setuser, isSeller, setSeller, showUserLogin,
         setShowUserLogin , products,currency,addToCart
         ,cartItems,setCartItems,updateCartItem,removeFromCart
         ,searchQuery,setSearchQuery,
        getCartCount,getCartTotal
        };
    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}