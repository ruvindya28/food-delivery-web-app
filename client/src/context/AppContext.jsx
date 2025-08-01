import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { dummyProducts } from "../assets/assets";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate=useNavigate();
    const[user,setUser]=useState(null)
    const[isSeller,setIsSeller]=useState(false)
    const[showUserLogin,setShowUserLogin]=useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    //fetch seller status

    const fetchSeller = async () => {
        try {
          const { data } = await axios.get("/api/seller/is-auth");
          if(data.success) {
            setIsSeller(true);
          }else{
            setIsSeller(false);
          }
        } catch (error) {
          
          setIsSeller(false);
        }
      };

      //fetch user Auth status ,user data and cart items

      const fetchUser = async () => {
        try {
          const { data } = await axios.get("/api/user/is-auth");
          if(data.success) {
            setUser(data.user);
            setCartItems(data.user.cartItems);
          }
        } catch (error) {
          
          setUser(null);
          
        }
      };



      //fetch all products

    const fetchProducts = async () => {
         try{

            const { data } = await axios.get("/api/product/list");
           if(data.success){
            setProducts(data.products);
           }else(
            toast.error(data.message))
    
         }catch{
            toast.error(error.message);
         }
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

    //get cart items count

    const getCartCount = ()=>{
    let totalCount= 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //get cart total price

    const getCartTotal = () => {
    let totalPrice = 0;
    for (const item in cartItems) {
        let itemInfo = products.find((product) => product._id.toString() === item);
        if (itemInfo && cartItems[item] > 0) {
            totalPrice += itemInfo.offerPrice * cartItems[item]; // Assuming `offerPrice` is correct
        }
    }
    return Math.floor(totalPrice * 100) / 100;
};



    useEffect(() => {
        fetchProducts();
        fetchSeller();
    }, []);


    const value = {navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem,removeCartItem,cartItems,searchQuery,setSearchQuery,getCartCount,getCartTotal,axios,fetchProducts,fetchUser};
    
    return <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>

}
export const useAppContext = () => {
    return useContext(AppContext);
  };