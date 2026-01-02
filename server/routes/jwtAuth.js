import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import connectMongo from "../libs/mongodb.js";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middleware/validEmail.js";
import validEmail from "../middleware/validEmail.js";
import authorization from "../middleware/authorization.js";


const router = Router();

router.post("/register", validInfo, async (req, res)=> {
    try{

        await connectMongo();

        const {email, f_name, l_name, password} = req.body;

        //Checks if email exists
        const existingUser = await User.findOne({ email: email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists"})
        }

        //if password is not provided
        if(!password){
            return res.status(400).json({message: "Password is required!"});
        }

        //Hash the password before saving
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //Create new User with password
        const newUser = await User.create({
            email,
            f_name,
            l_name,
            password: bcryptPassword
        })

        //Generate a signed token for authorization
        const token = jwtGenerator(newUser._id);
        return res.status(200).json({
            token,
            message: "User registered successfully!",
            user: {
              _id: newUser._id,
              f_name,
              email
            }
          });          
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post("/login", validEmail, async (req, res)=>{
    try{

        await connectMongo();

        const {email, password} = req.body;

        //check if user exists in database
        const userDetails = await User.findOne({email: email});
        if(!userDetails){
            return res.status(401).json({message: "Invalid email or password!"})
        };

        //Compare password
        const isValidPassword = await bcrypt.compare(password, userDetails.password);
        if (!isValidPassword){
            return res.status(401).json({message: "Invalid email or password"});
        }

        //Generate JWT token
        const token = jwtGenerator(userDetails._id);

        //Send token to client
        return res.status(200).json({
            token,
            message: "Login successful!",
            user: {
              _id: userDetails._id,
              f_name: userDetails.f_name,
              email: userDetails.email
            }
          });
          

    }catch(error){
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});

// router.get("/is-verify", authorization, async (req, res)=> {
//     try{
//         res.json(true);
//     }catch(error){
//         console.log(error.message);
//         res.status(500).json("Server Error");
//     }
// });

export default router;