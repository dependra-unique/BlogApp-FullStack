import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";

const app = express();
let port = process.env.PORT || 3000;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;    //regex for password

app.use(express.json());
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
        
})


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
    res.status(200).json({"status" : "okey"});



    //password hashes and stored in DB
    bcrypt.hash(password, 10, (err, hashPassword) => {
        console.log(hashPassword);
    })


})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})