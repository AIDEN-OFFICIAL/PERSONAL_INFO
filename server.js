import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express()

const PORT = process.env.PORT || 5050;

app.listen(PORT,()=>console.log(`server running on https://localhost:${PORT}`))
