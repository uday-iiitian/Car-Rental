import dotenv from 'dotenv'
// Load environment variables before other imports
dotenv.config()

import express from 'express'
import connectDB from './configs/db.js'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express()

// Connect to database
await connectDB();

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{res.send("server is running")})
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter);

app.listen(process.env.PORT, ()=>{console.log("server is running on port " + process.env.PORT)})

