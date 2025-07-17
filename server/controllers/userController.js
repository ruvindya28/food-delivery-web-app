import User from '../models/User.js';



//register user : /api/user/register

export const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        // Check if user already exists
        if(!name || !email || !password) {
            return res.json({success: false, message: 'Please fill all fields' });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.json({success: false, message: 'User already exists' });
        }

    }catch(error) {

    }
}