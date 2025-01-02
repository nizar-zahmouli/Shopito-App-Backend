const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB =  require('./config/ConnectDB')
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const couponRoutes = require('./routes/couponRoutes');
const errorHandler = require('./middleware/errorMiddelware');

const app = express();


//  Midelwares 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
   cors({  origin: ["https://shoppito-app.vercel.app"],
    credentials: true})
)
// Routes 
app.use("/api/users", userRoute ) ;
app.use("/api/product", productRoutes ) ;
app.use("/api/category", categoryRoutes ) ;
app.use("/api/brand", brandRoutes ) ;
app.use("/api/coupon", couponRoutes ) ;

app.get('/', (req, res) => { 
    res.send("Home Page ...");
})

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = 8000;

connectDB()

app.listen(PORT, () => console.log("Server started"));
