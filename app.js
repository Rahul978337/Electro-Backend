const connectDB= require('./config/db')

const express=require("express")
const cors = require("cors");
const { errors } = require('celebrate');


require('dotenv').config()
const app=express()
app.use("/uploads",express.static("uploads"))
app.use(express.json())
app.use(cors());

// app.listen(5000,'0.0.0.0',()=> console.log("server is running"));
app.use(require('./routes/userRoutes'))
app.use(require('./routes/CategoryRoutes'))
app.use(require('./routes/productRoutes'))
app.use(require('./routes/frontApiRoutes/customerRou'))
app.use(require('./routes/frontApiRoutes/categoryRou'))
app.use(require('./routes/frontApiRoutes/productRou'))
app.use(require('./routes/frontApiRoutes/cartRou'))
app.use(require('./routes/frontApiRoutes/placeOrderRou'))
app.use(require('./routes/frontApiRoutes/contactRou'))
app.use(require('./routes/AdminOrderRoutes'))
app.use(require('./routes/adminContactRou'))
app.use(require('./routes/frontApiRoutes/myProfileRou'))
app.use(require('./routes/dashboardRoutes'))
app.use(require('./routes/SliderRoutes'))
app.use(require('./routes/frontApiRoutes/sliderRou'))






app.use(errors());

const PORT=process.env.PORT || 3005;
connectDB().then(()=>{
    app.listen(PORT,()=>{
console.log("server start sussessfully");
    console.log("server running on port",PORT);
    })
    

})
