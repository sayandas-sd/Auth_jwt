const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../json_token");
const router = Router();

router.post("/signup", async (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username,
        password
    })
    res.json({
        msg: "User created successfully"
    })
})

router.post("/signin", async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    if(user){
        const token = jwt.sign({
            username,
        }, JWT_SECRET);
    
        res.json({
            token
        })
    } else {
        res.status(411).json({
            msg: "incorrect email and password"
        })
    }

})

router.get("/courses", async (req,res)=>{
    const response = await Course.find({});
    res.json({
        courses: response
    })
})

router.post("/courses/:courseId", userMiddleware, async (req,res)=>{
    
    const courseId = req.params.courseId;
    await User.updateOne({
       "$push": {
           purchasedCourse: courseId
       }
    });
    res.json({
       msg: "Purchase complete"
    });

})

router.get("/purchasedCourses", userMiddleware, async (req,res)=>{
    const user = await User.findOne({
        username: req.headers.username
    });
    
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourse
        }
    })
    res.json({
        courses: courses
    })
})

module.exports = router ;