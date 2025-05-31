import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { dummyProducts } from "../assets/assets";



export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate=useNavigate();
    const[user,setUser]=useState(null);
    const[isSeller,setIsSeller]=useState(false);
    const[showUserLogin,setShowUserLogin]=useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    const fetchProducts = async () => {
          setProducts(dummyProducts);
    }

    const addToCart =(itemId)=>{
        let cartData = structuredClone(cartItems);

        if(
            cartData[itemId]){
                cartData[itemId] +=1;
            }
        else{
             cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart");
    }

    //update product from cart

    const updateCartItem =(itemsId,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemsId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    }

    //remove product from cart

    const removeCartItem=(itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        
        toast.success("Removed from Cart");
        setCartItems(cartData);
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    const value = {navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem,removeCartItem,cartItems,searchQuery,setSearchQuery};
    return <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>

}
export const useAppContext = () => {
    return useContext(AppContext);
  };