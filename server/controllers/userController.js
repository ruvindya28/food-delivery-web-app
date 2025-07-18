import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



//register user : /api/user/register

export const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        // Check if user already exists
        if(!name || !email || !password) {
            return res.json({success: false, message: 'Please fill all fields' });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) 
            return res.json({success: false, message: 'User already exists' });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        });

        return res.json({
            success: true,
            message: 'User registered successfully',
            user: {
                name: user.name,
                email: user.email
            }
        });   
    
    }catch(error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}