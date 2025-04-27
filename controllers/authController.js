import User from "../models/Users.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const register = async (req, res) => {
    try {
        const { name, password, email } = req.body

        if (!email || !password || !name) return res.status(400).json({ message: 'All fields are required' });

        const user = await User.findOne({ email })
        if (user) {
           return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            username: name,
            email,
            password: hashedPassword
        })

        await newUser.save();

        res.status(201).json({ message: "User created successfully" , name:`${newUser.username}` });

    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
          });
        
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong'})
    }
}
const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.status(200).json({ message: "Logged Out successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong'})
    }
}

export {register,login, logout}