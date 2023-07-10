// this is the main express app
import router from "./routers";
const express = require("express")
import morgan from "morgan"
const app = express()
import * as dotenv from "dotenv"
dotenv.config()//this is to log the env variable

// authorize
import { protect } from "./modules/auth";

// middleware
app.use(morgan('dev'))//logs the req
app.use(express.json())//allow json 
app.use(express.urlencoded({extended:true}))//alow a client to decode and add 
//my custom middleware
app.use((req,res,next) => {
    req.sh_secret = "doggy"
    next()
})



app.use("/api",protect,router)
const PORT = 3005;

app.get("/",(res,req) => {
    res.send("welcome").status(200)
    
})
app.listen(PORT,() => {
    console.log("done")
})