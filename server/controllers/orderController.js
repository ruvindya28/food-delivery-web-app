import Order from "../models/Order";
import Product from "../models/Product";

//place order COD :/api/order/cod

export const placeOrderCOD = async (req, res) => {
     try {
         const { userId, items, address } = req.body;
         if(!address || items.lenght ===0){
                return res.json({
                    success: false,
                    message: "Invalid data"
                })
         }

         // Calculate total amount
         let amount = await items.reduce(async (acc, item) => {

            const product = await Product.findById(item.product);
            return (await acc) + (product.offerPrice * item.quantity);
         }, 0);

         amount += Math.floor(amount * 0.02); // Adding 5% tax

         await Order.create({
             userId,
             items,
             address,
             amount,
             paymentType: "COD",
         // Create a new order
         });
            res.json({
                success: true,
                message: "Order placed successfully",
            });
     } catch (error) {
         console.error(error.message);
         res.json({
             success: false,
             message: error.message
         });
     }
 }


 //get order by userId : /api/order/user

 export const getUserOrders = async (req, res) => {
    try{
        const { userId } = req.body;
        const orders = await Order.find({ userId , $or : [{ paymentType: "COD" },{isPaid: true }] 
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({
            success: true,
            orders
        });
    }catch{
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
}

//get all order (for seller/admin): /api/order/seller

export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({}).populate("items.product address").sort({ createdAt: -1 });
        res.json({
            success: true,
            orders
        });
    }catch{
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
}