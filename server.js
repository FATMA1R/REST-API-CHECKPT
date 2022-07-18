const express = require('express');

const app = express()
const db_connect=require("./db_connect");
require("dotenv").config({path:"./config/.env"});
db_connect(); //appel db

app.use(express.json()); 

// ---global middlware for user routes 
// ---@PATH: /user
app.use("/user",require("./routes/user"));

//run server
app.listen(process.env.PORT, (err)=>
err ? console.log(err) : console.log("server is running"));
