


const express = require("express")
const router = express.Router()
const { addStudent, updateStudent,deleteStudent,getAllStudents,getStudentById } = require("../controllers/studentControllers")
const upload = require("../config/multer")
const auth = require("../middleware/authMiddleware")


// POST student without image
router.post("/",upload.single("image"),auth,addStudent)

// Update student (still optional for later)
router.put("/:id",upload.single("image"),auth, updateStudent)

//delete students
router.delete("/:id",auth, deleteStudent)

//get student
router.get("/",getAllStudents)

router.get("/:id",getStudentById)

module.exports = router