const express = require("express");
const userRoute = express.Router();
//Import our model
const User = require("../models/User");

//ALL routes--------------------------------------------------------

//*******************  GET :  RETURN ALL USERS *******************//
userRoute.get("/", async (req , res)=>{
    try{
        const users = await  User.find({});
        res.status(201).send({users: users});
    }catch(error){
        res.status(500).send({error, message: "cannot get users"});
    }
});

//******************* POST :  ADD A NEW USER TO THE DATABASE *******************//
userRoute.post("/add", async (req, res) => {
        
        try {
            const newUser = new User(req.body);
            let result = await newUser.save();
            res.send({ users : result , message: "success" });
        } catch (error) {
           console.log(error);
        }
    });
//*******************    PUT : EDIT A USER BY ID *******************//
userRoute.put("/:id",async (req,res)=>{
    try{
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            { $set: {...req.body}}
        );
        if(!updateUser){
            res.status(404).send("not found");
        }
        res.status(201).send({message: "user is updated"});

    }catch(error){
        res.status(500).send(error);
    }
});
//******************* DELETE : REMOVE A USER BY ID *******************//
userRoute.delete("/:id",async (req,res)=>{
    try{
        await User.findOneAndDelete({_id:req.params.id})
    res.status(201).send("success");}
    catch(error){
        res.status(500).send(error);
    }
});


module.exports = userRoute;