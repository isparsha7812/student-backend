
const Admin = require("../models/authModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({

            email,
            password: hashedPassword
        });

        await admin.save();
        res.json({ message: "Admin created " })
    } catch (err) {

        res.status(500).json({ message: "Error" })

    }

};

//login
exports.login = async (req,res) => {

    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found!" })

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Wrong Password!" })

        const token = jwt.sign(
            { id:admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Error" });
    }


};
