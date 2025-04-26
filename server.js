import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';


dotenv.config();
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


app.get('/', (req, res) => {
    res.send('API runing...')
})

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
    app.listen(PORT,()=>console.log(`server running on https://localhost:${PORT}`))
})
