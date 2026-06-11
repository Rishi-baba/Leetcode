import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectdb from './src/config/db.js';
import authRouter from './src/Router/userAuth.js';
import client from './src/config/redis.js';
import problemRouter from './src/Router/createProblem.js';
import submitRouter from './src/Router/submitRoute.js';




const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/user', authRouter)
app.use('/problem', problemRouter)
app.use('/submission', submitRouter)

const initillizeConnection = async()=>{

  // console.log("SERVER:", process.env.REDIS_PASS);

  try {
    
    // console.log(process.env.REDIS_PASS)
    await Promise.all([ connectdb(), client.connect()])

    const PORT = process.env.PORT || 5000

    app.listen( PORT, ()=>{
      console.log(`running at http://localhost:${PORT} `)
    } )

  } catch (error) {
    
    console.log(error)

  }

}
initillizeConnection()

