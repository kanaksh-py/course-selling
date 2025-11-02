// signup
// sigin
// purchases

const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");

const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_SECRET;
const { userMiddleware } = require("../middleware/user");

const bcrypt = require("bcrypt");

const userRouter = Router();

userRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName} = req.body;
    const hashedPassword = bcrypt.hash(password,5);

    await userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "signup ;)"
    })
})

userRouter.post("/signin",async function(req,res){
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email: email
    })

    const hashedPassword = bcrypt.hash(password,5);
    if (user.password == hashedPassword) {
        const token = jwt.sign({
            id: user._id,
        },JWT_USER_PASSWORD)

        res.cookie("token",token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
        })
    }
    else {
        res.json({
            message: "incorrect credentials T_T"
        })
    }
})

userRouter.get("/purchases",userMiddleware, async function(req, res){
    
})
