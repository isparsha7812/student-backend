//studentProfileControllers.js

const Student= require ("../models/studentModels");
const bcrypt= require("bcrypt");

exports.getMyProfile= async(req,res)=>{
    try{
        const student = await Student.findById(req.user.id).select("-password")
        if(!student) return res.status(404).json({message:"Student not found"})
            res.json(student);
    }
    catch(err){
        console.error(err);
        res.ststus(500).json({message:"Server error",error:err.message});
    }
}