import express from "express"

import { connectdb } from "./lib/Databaseconnection.js";
import cookieParser from "cookie-parser";
import authroutes from "./routes/Auth.route.js"
import postroutes from "./routes/Post.route.js"


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// note the actual api point is http://loclhost:5000/api/auth/register  for the user
// note the actual api point is http://loclhost:5000/api/post/all  for the post
app.use("/api/auth",authroutes);
app.use("/api/post",postroutes);





connectdb();
app.listen(5000,()=>console.log("server started at port http://localhost:5000"));

app.get("/", (req, res) => res.send("server running"));