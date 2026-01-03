import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware,requireAuth } from '@clerk/express'
import { clerkClient, getAuth } from '@clerk/express'
import airouter from './routes/airoute.js'

import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'


const app = express();
const PORT = process.env.PORT || 2000;
await connectCloudinary();

//middleware 
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(requireAuth());
app.use('/api/ai',airouter);
app.use('/api/user',userRouter);


//method define
app.get('/',(req,res)=>{
res.send('server is live!');
})

//
app.listen(PORT ,()=>{
    console.log("Server is running on port no.", PORT);
})


// create addition code
 


