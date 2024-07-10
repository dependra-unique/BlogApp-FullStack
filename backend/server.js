import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";


//import schema
import User from "./Schema/User.js";

const app = express();
let port = process.env.PORT || 3000;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;    //regex for password

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
        
})

//send data to frontend
const formatDataToUser = (user) => {

    const accessToken = jwt.sign({id: User._id}, process.env.SECRET_ACCESS_KEY);

    return {
        accessToken,
        profileImg: user.personalInfo.profileImg,
        fullname: user.personalInfo.fullname,
        username: user.personalInfo.username
    }
}

//create dynamic username
const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let isUsernameNotUnique = await User.exists({"personalInfo.username": username}).then((result) => result);

    isUsernameNotUnique ? username +=  nanoid().substring(0, 5) :"";

    return username;
}


app.post("/signup", (req, res) => {
    
    let {fullname, email, password} = req.body;

    if(fullname.length < 3){
        return res.status(403).json({"error": "fullname must be atleast 3 character long"});
    }
    if(!email.length){
        return res.status(403).json({"error": "email is required"});
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error": "email invalid"});
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"error": "password should be at least 6 to 20 characters with long a numeric, 1 lowercase and 1 uppercase"})
    }
   
    //password hashes and stored in DB
    bcrypt.hash(password, 10, async (err, hashPassword) => {

        let username = await generateUsername(email);
       
        let user = new User( {
            personalInfo: { fullname, email, password: hashPassword, username }
        
        } )
        // console.log(user);
        user.save().then((user) => {
            return res.status(200).json(formatDataToUser(user))
        })
        .catch( err => {

            if(err.code == 11000){
                return res.status(500).json({"error": "Email already exists"})
            }
            return res.status(500).json({ "error": err.message })
        })
        
    })

    //  res.status(200).json({"status" : "okey"});

})


app.post("/signin", (req, res) => {

    const {email, password} = req.body;

    User.findOne({ "personalInfo.email": email})
    .then((user) => {
        console.log(user);
        if(!user){
            return res.status(403).json({"error": "email not found"})
        }

        bcrypt.compare(password, user.personalInfo.password, (err, result) => {

            
            if(err){
                return res.status(403).json({ "error ": "error occured while login please try again"})
            }
            if(!result){
                return res.status(403).json({"error": "Incorrect password"})
            } else {
                return res.status(200).json(formatDataToUser(user))
            }
        })
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({"error" : error.message});
    })
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})