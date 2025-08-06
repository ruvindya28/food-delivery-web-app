// controllers/cartController.js
import User from '../models/User.js';

export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.userId; // from middleware

        const user = await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true } 
        );

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: 'Cart updated successfully', cartItems: user.cartItems });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
