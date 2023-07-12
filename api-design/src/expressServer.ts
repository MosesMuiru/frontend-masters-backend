// this is the main express app
import router from "./routers";
const express = require("express")
import morgan from "morgan"
const app = express()
import * as dotenv from "dotenv"
dotenv.config()//this is to log the env variable

// authorize
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

// middleware
app.use(morgan('dev'))//logs the req
app.use(express.json())//allow json 
app.use(express.urlencoded({extended:true}))//alow a client to decode and add 





//if anyone has to go through the router needs to check
app.use("/api",protect,router)
//created the user
app.post("/user",createNewUser)
app.post("/signin",signin)
const PORT = 3000;

app.get("/",(res,req) => {
    res.send("welcome").status(200)
    
})
app.listen(PORT,() => {

    console.log("done")
})