const express = require("express");


const app = express();

const product = require("./routes/productRouter");

app.use(express.json());


app.use("/app/v1",product)



module.exports=app;