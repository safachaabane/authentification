const User = require("../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const register=async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    try {
    const existeUser= await User.findOne({email})
    if(existeUser){return res.status(400).json([{msg:"user already exist"}])}
        const user=await new User({firstName,lastName,email,password})
        const salt=await bcrypt.genSalt(saltRounds);
         user.password=await bcrypt.hash(password,salt)
 await user.save()
const payload={
    userID:user._id,
}
var token = jwt.sign(payload, process.env.SECRET);

 res.send({
     token,
     user:{
         firstName:user.firstName,
         lastName:user.lastName,
         email:user.email,
         password:user.password
     }
 })
    } catch (error) {
        console.error(error);
    }
}


const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email})
    if(!user){return res.status(400).json([{msg:"you should register first"}])}
    const exist=bcrypt.compare(password,user.password)
    if(!exist){
        return res.status(400).json([{msg:"bad Credential"}])
    }
    const payload={
        userID:user._id,
    }
    var token = jwt.sign(payload, process.env.SECRET);
    res.send({
        token,
        user:{
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            password:user.password
        }
    })
    } catch (error) {
        console.error(error);
    }
}

const getAuth=(req,res)=>{
res.send(req.user)
}




module.exports={register,login,getAuth}