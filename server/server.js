import express from 'express'
import connectDB from './configs/db.js'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express()

await connectDB();

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{res.send("server is running")})
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter);

app.listen(3000, ()=>{console.log("server is running on port 3000")})

