
const express= require("express");
const {login}= require("../controllers/studentAuthControllers");
const  {getMyProfile}= require("../controllers/studentProfile")
const router= express.Router();
const stdAuth = require("../middleware/studentMiddleware")

router.post("/login",login);

//get logged-in students's profile

router.get("/profile",stdAuth,getMyProfile);
router.get ("/profile/:id",stdAuth,getMyProfile)

// 
//update loggedin student's profile
// router.put("/my/profile",studentAuth,updateMyProfile)
module.exports= router;