import express from "express";
import mongoose from "mongoose";
import "dotenv/config"

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
        return res.status(403).json({"error": "invalid password"})
    }
    res.status(200).json({"status" : "okey"});
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})