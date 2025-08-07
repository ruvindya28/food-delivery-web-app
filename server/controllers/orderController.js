import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe" 

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

         amount += Math.floor(amount * 0.02); // Adding 2% tax

         await Order.create({
             userId,
             items,
             address,
             amount,
             paymentType: "COD",
         // Create a new order
         });
          return res.json({
                success: true,
                message: "Order placed successfully",
            });
     } catch (error) {
         console.error(error.message);
        return res.json({
             success: false,
             message: error.message
         });
     }
 }

    //place order Strpe :/api/order/stripe
   export const placeOrderStripe = async (req, res) => {
     try {
         const { userId, items, address } = req.body;
         const {origin} = req.headers;

         if(!address || items.lenght ===0){
                return res.json({
                    success: false,
                    message: "Invalid data"
                })
         }

         let productData = [];
        

         // Calculate total amount
         let amount = await items.reduce(async (acc, item) => {

            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            })
            return (await acc) + (product.offerPrice * item.quantity);
         }, 0);

         amount += Math.floor(amount * 0.02); // Adding 2% tax

         const order =await Order.create({
             userId,
             items,
             address,
             amount,
             paymentType: "Online",
         // Create a new order
         });

         // Stripe Gateway Initialize 
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe 

        const line_items = productData.map((item)=>{
            return {
                price_data: {
                    currency: "LKR",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity
            }
        })

        //create session 

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata:{
                orderId: order._id.toString(),
                userId,
            }
        })

            
          return res.json({
                success: true,
                url: session.url
            });
     } catch (error) {
         console.error(error.message);
        return res.json({
             success: false,
             message: error.message
         });
     }
 }


 //get order by userId : /api/order/user

 export const getUserOrders = async (req, res) => {
    try{
        const userId = req.userId;
        const orders = await Order.find({ userId , $or : [{ paymentType: "COD" },{isPaid: true }] 
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({
            success: true,
            orders
        });
    }catch(error){
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