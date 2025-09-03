import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = "₹"
    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    // fetch All Products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    // Add products to cart
    const addToCart = () => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId]=1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart")
    }

    useEffect(() => {
   fetchProducts()
    },[])



    const value = { navigate, user, setuser, isSeller, setSeller, showUserLogin, setShowUserLogin , products,currency,addToCart};
    return <AppContext.Provider value={value} >
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}