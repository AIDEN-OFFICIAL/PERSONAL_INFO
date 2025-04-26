import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './routes/authRoute.js'
import {v2 as cloudinary} from 'cloudinary'

dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET,
})
const app = express()

app.use(cors({
    origin: 'https://localhost:3000',
    credentials:true,
}))
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected succesfully ');
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', router);

app.get('/', (req, res) => {
    res.send('API runing...')
})

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
    app.listen(PORT,()=>console.log(`server running on https://localhost:${PORT}`))
})
