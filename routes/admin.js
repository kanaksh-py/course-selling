const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_SECRET;

const { adminMiddleware } = require("../middleware/admin");
const admin = require("../middleware/admin");

adminRouter.post("/signup", async function(req,res){
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hash(password, 5);

    await adminModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Sign Up done ;)"
    })
})

adminRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;
    const admin = adminModel.findOne({
        email
    });

    const hashedPassword = bcrypt.hash(password,5);

    if(admin.password == hashedPassword){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            maxAge: 3600000

        })
    } else {
        res.json({
            message: "incorrect credentials"
        })
    }
})

adminRouter.post("/course",adminMiddleware,async function(req, res){
    const { title, description, image, price} = req.body;
    const adminId = req.userId;
    const course = await courseModel.create({
        title: title,
        description: description,
        image: image,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "course created successfully",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware, async function(req, res){
    const { title, description, image, price} = req.body;
    const adminId = req.userId;

    const course = await courseModel.updateOne({
        creatorId: adminId
    },{
        title: title,
        description: description,
        image: image,
        price: price,
    })

    res.json({
        message: "updated successfully",
        courseId: course._id
    })
})

adminRouter.get("/course/all",adminMiddleware/async function(req, res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "all of your courses",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}
// signup, signin, course, course update , courses by an admin