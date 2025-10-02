const express = require('express');

require('dotenv').config()

const db = require('./src/db')
const userRouter = require('./src/routes/user.routes');

const PORT = 5000

const app = express();


app.get("/", (req, res, next)=>{
    return res.status(200).json({
        status: "200",
        msg: "I am running"
    })
})

app.use("/api/user", userRouter)

app.listen(PORT, ()=>{
    console.info("Server is listening at port : ", PORT);
})