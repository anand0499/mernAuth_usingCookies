// const User=require("../models/user")
// const bcrypt=require("bcryptjs")
// const jwt=require('jsonwebtoken')

// const signup=async(req,res,next)=>{
//     const {name,email,password}=req.body;
//     let existingUser;

//     try{
//         existingUser=await User.findOne({email:email})
//     }catch(err){
//         console.log(err)
//     }

//     if(existingUser) return res.status(400).json({message:'user already exists'})
//     const hashedPassword=bcrypt.hashSync(password);

//     const user=new User({
//         name:name,
//         email:email,
//         password:hashedPassword
//     })
//     try{
//         await user.save();
//     }catch(err){    
//         console.log(err)
//     }

//     return res.status(201).json({message:user})
// }

// const login=async(req,res,next)=>{
//     const {email,password}=req.body;
//     let existingUser;
//     try{
//         existingUser=await User.findOne({email})
//     }catch(err){
//         console.log(err);
//         return new Error(err)
//     }

//     if(!existingUser) return res.status(400).json({message:"User doesnot exits,please signup"})
//     const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
//     if(!isPasswordCorrect) res.status(400).json({message:"Password doesnot matched"})
//     const token=jwt.sign({id:existingUser._id},process.env.key,{
//         expiresIn:'30s'
//     })

//     res.cookie(String(existingUser._id),token,{
//         path: '/',
//         expires: new Date(Date.now() + 1000 * 30),
//         httpOnly: true,
//         sameSite: 'None', 
//         secure: true,  
//     })

//     return res.status(200).json({message:'successfully logged in',token:token})
// }

// const verifyToken = (req, res, next) => {
//     const cookie = req.headers.cookie;
//     const token = cookie.split("=")[1];
//     console.log(token)

//     if (!token) {
//         return res.status(400).json({ message: "No token found" });
//     }

//     jwt.verify(String(token), process.env.key, (error, user) => {
//         if (error) {
//             return res.status(400).json({ message: "Invalid Token" });
//         }
//         console.log(user.id);
//         req.id = user.id;
//     });

//     next();
// };


// const getUser=async(req,res,next)=>{
//     const userId=req.id;
//     let user;
//     try{
//         user=await User.findOne(userId,"-password")
//     }catch(err){
//         console.log(err)
//     }

//     if(!user){
//         return res.status(400).json({message:"User Not Found"})
//     }

//     return res.status(200).json({user})
// }

// exports.signup=signup;
// exports.login=login;
// exports.verifyToken=verifyToken;
// exports.getUser=getUser;








const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10); // Hash password with salt rounds

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist. Please sign up." });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.key, {
            expiresIn: '1h' // Example: Token expires in 1 hour
        });

        res.cookie(String(existingUser._id), token, {
            path: '/',
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        return res.status(200).json({ message: 'Successfully logged in', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const verifyToken = (req, res, next) => {
    const cookie = req.headers.cookie;
    const token = cookie && cookie.split("=")[1]; // Check if cookie is present

    if (!token) {
        return res.status(400).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.key, (error, user) => {
        if (error) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        req.id = user.id;
        next();
    });
};

const getUser = async (req, res, next) => {
    const userId = req.id;

    try {
        const user = await User.findById(userId, "-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    signup,
    login,
    verifyToken,
    getUser
};
