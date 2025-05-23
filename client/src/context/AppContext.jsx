import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.VITE_CURRENCY;

    const navigate=useNavigate();
    const[user,setUser]=useState(null);
    const[isSeller,setIsSeller]=useState(false);
    const[showUserLogin,setShowUserLogin]=useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const fetchProducts = async () => {
          setProducts(dummyProducts);
    }

    const addToCart =()=>{
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

    useEffect(() => {
        fetchProducts();
    }, []);


    const value = {navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart};
    return <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>

}
export const useAppContext = () => {
    return useContext(AppContext);
  };