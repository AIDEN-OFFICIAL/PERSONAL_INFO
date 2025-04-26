import jwt, { decode } from "jsonwebtoken";
import User from '../models/Users.js'
const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({message:'Not autherized , no token'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:'Internal server error'})
    }
}

export default protect