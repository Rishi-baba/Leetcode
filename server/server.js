import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectdb from './src/config/db.js';

dotenv.config();

connectdb()

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000

app.listen( PORT, ()=>{
  console.log(`running at http://localhost:/${PORT} `)
} )