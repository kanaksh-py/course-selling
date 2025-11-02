require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(express.json);
app.use(cookieParser());

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
}

main();