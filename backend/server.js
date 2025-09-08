const app = require("./app");


const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({path:"backend/config/config.env"})

// handled  uncaught exception 
process.on("uncaughtException",(err)=>{

    console.log(`Error:${err.message}`);
    console.log("server shut down due to uncaught exception")

    process.exit(1)
})


connectDatabase();
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})



// unhandled Promise Rejection

process.on("unhandledRejection",(err)=>{

    console.log(`Error: ${err.message}`);
    console.log("server shuting down due to unhandled error")

server.close(()=>{
    process.exit(1)
})
})