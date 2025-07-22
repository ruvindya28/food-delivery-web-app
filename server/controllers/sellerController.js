import jwt from 'jsonwebtoken';

//login seller : /api/seller/login
export const loginSeller = async (req, res) => {
    const { email, password } = req.body;

    if(password == process.env.SELLER_PASSWORD && email == process.env.SELLER_EMAIL) {
        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('selerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        });

        return res.json({
            success: true,
            message: 'Login successful'
        });
    }

}
