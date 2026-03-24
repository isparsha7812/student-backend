const Student = require("../models/studentModels")

const bcrypt = require("bcrypt");

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const { name, email, className, phone, totalFee, paidAmount,  dueAmount,status,password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
    // Quick validation
    if (!name || !email || !className || !phone || !totalFee || !paidAmount || !password ) {
      return res.status(400).json({ message: "All fields are required ❌" })
    }
   

    const student = new Student({
      name,
      email,
      className,
      phone,
      totalFee,
      paidAmount,
       dueAmount,
      status,
      password:hashedPassword,
      image: req.file ? 
      `${req.protocol}:/${req.get("host")}/uploads/${req.file.filename}`: null
    });

    await student.save()
    res.status(201).json({ message: "Student added successfully ✅", student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
}


// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { name, email, className, phone, totalFee , paidAmount,dueAmount,status,password}=req.body
    if (req.file) {updateData.image =`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;}
    if(password){
      updateData.password = await bcrypt.hash(password,10);
    }

    const student = await Student.findByIdAndUpdate(id, updateData,
       {
         new: true,
       });

    if (!student) return res.status(404).json({ message: "Student not found ❌" })

      //remove password from response
      student.password= undefined;

    res.json({ message: "Student updated successfully ✅", student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
};

//Delete student

exports.deleteStudent = async (req,res)=>{
  try{
    const {id} = req.params;
    const student= await Student.findByIdAndDelete(id);
    if (!student)
      return res.status(404).json({message: "Student not found"});
    res.json ({message:"Student deleted successfully",student})
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
};

//get student


// const Student = require("../models/studentModel");

exports.getAllStudents = async (req,res)=> {
try{
  const students = await Student.find();
  res.json(students);
}
catch (err) {
    
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
};


//get one student by id

exports.getStudentById = async (req, res)=>{

  try{
    const {id} = req.params;

    const student = await Student.findById(id);
    if(!student)
     return res.status(404).json({message: "Student not found"});

    res.json(student)
  }
  catch (err) {
  
    res.status(500).json({ message: "Server error ❌", error: err.message })
  }
  
}


