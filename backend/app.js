const express = require("express");


const app = express();
const errorMiddleware = require("./middlewares/error")

const product = require("./routes/productRouter");

app.use(express.json());


app.use("/app/v1",product)

// middleware for errors 
app.use(errorMiddleware)

module.exports=app;