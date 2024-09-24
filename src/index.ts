require('dotenv').config()

import express from 'express';
import cors from 'cors'

import { AppMiddleWares } from './middlewares';



const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors({origin:[
  "*",
  "http://localhost:3000",
]}))

app.use(AppMiddleWares.RateLimiter)

// Basic route

app.get('/test',async(req,res)=>{
  res.status(200).json({
    message:'success'
  })
})


app.use(AppMiddleWares.NotFound)
app.use(AppMiddleWares.ErrorHandler)



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
