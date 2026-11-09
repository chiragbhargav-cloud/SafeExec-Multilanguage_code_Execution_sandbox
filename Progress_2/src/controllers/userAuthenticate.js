const User=require("../models/user")
const validate=require('../utils/validate');
const bcrypt=required("bcrypt");
const jwt=require('jsonwebtoken'); 


// for new user registration 
const register =async(req,res)=>{

    try{

        // validate the data 
        validate(req.body);
        const{firstname,emailId,password}=req.body;
        req.body.password = await bcrypt.hash(password,10);

      const token=  jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
      res.cookie('token',token,{maxAge:60*60*1000});
      res.status(201).send("User Registration successfully");

        // If email already exist in my system 

        // const exist=User.exists({emailId})

      const user = await User.create(req.body);
    }
    catch(err){
        res.status(400).send("Error :"+err);
    }
}



// for old user's login
const login =async(req,res)=>{
    try{

        const {emailId,password}=req.body;
        if(!emailId)
            throw new Error("Invalid Credentials");

        if(!password)
            throw new Error("Invalid Credentials");
        

      const user=User.findOne({emailId});

    const match= bcrypt.compare(password , user.password);

    if(!match)
        throw new Error("Invalid Credentials");


    const token=  jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
    res.cookie('token',token,{maxAge:60*60*1000});
    res.status(200).send("Logged In successfully");

    }
    catch(err){
        res.status(401).send("Error" +err);
    }
}


// logout feature 

const logout=async (req,res)=>{

    try{
        
    }
    catch(err){

    }
}