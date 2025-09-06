import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();


// created an app
const app = express()


// port number on which this app will run
const port = process.env.PORT || 4000;

// calling connectdb function
connectDB()

// calling cloudinary Function
connectCloudinary()


// middleware configuration
app.use(express.json())


 app.use(cookieParser())
 

// here we will add origin which can acccess this server
app.use(cors({
   origin:['http://localhost:5173'] ,
   credentials:true
}))




//---------------------- routes--------------------------//
app.get('/', (req,res)=>res.send("All is well"));
// user Route
app.use('/api/user',userRouter)
// seller Route
app.use('/api/seller',sellerRouter)
// product Route
app.use('/api/products', productRouter)
// cart Route
app.use('/api/cart',cartRouter)
// address Route
app.use('/api/address',addressRouter)
// order Route
app.use('/api/order',orderRouter)




















app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})