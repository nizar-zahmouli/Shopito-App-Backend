const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const couponRoutes = require('./routes/couponRoutes');
const errorHandler = require('./middleware/errorMiddelware');

const app = express();

mongoose.set("strictQuery", true);

//  Midelwares 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
   cors({ origin: ["http://localhost:3000", ""],
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
const PORT = process.env.PORT || 8000;
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// app.listen(PORT, () => console.log("Server started"));
