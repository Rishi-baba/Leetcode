import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config();



const client = createClient(
  
  {
    username: 'default',
    password:process.env.REDIS_PASS,
    socket: {
        host: 'ultrasmooth-shadowless-kittens-73163.db.redis.io',
        port: 15604
    }
});


export default client
