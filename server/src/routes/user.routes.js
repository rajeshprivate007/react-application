const router = require("express").Router();

const db = require("../db")
const { User } = require("../schema/user.schema");
router.post("/add", (req, res) => {

    const { name } = req.body;
    console.info("User: ", User, name)
    return res.status(200).json({
        status: 200,
        msg: "User added successfully"
    })
})


module.exports = router;