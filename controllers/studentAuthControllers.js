
const Student= require("../models/studentModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
  
exports.login= async(req,res)=>{
    try{
        const {email,password}= req.body;
         const student = await Student.findOne({email}).select("+password");
         if (!student) return res.status(400).json({message:"Student not Found"});

         //compare students

         const isMatch = await bcrypt.compare(password,student.password);
         if(!isMatch) return res.status (401).json({message:"Incorrect password"});

         //Generate JWT token
         const token = jwt.sign(

            {
                id:student._id,
                role:"student" //can be used for role based access
            },
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
         );
        
         student.password= undefined;
         res.json({message:"Login successfully"}),
         token,
         student
         
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
}