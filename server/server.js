import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectdb from './src/config/db.js';
import authRouter from './src/Router/userAuth.js';

dotenv.config();

connectdb()

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/user', authRouter)

const PORT = process.env.PORT || 5000

app.listen( PORT, ()=>{
  console.log(`running at http://localhost:/${PORT} `)
} )