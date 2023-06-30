const express = require('express')
const jwt = require('jsonwebtoken')
const { authenticate2, authenticateLocal } = require('../../middlewares')
const Student = require('../../models/student')
const router = express.Router()


router.get('/', authenticateLocal, async (req, res) => {

    console.log("the user", req.user)

    const students = await Student.find({})

    return res.status(200).json({
        message: "Student data",
        data: students
    })

})

router.post('/', async (req, res) => {

    console.log("the body", req.body)
    // students.push(req.body)

    const student = await Student.create(req.body)

    let token = jwt.sign(student.id, process.env.JWT_KEY)

    return res.status(200).json({
        message: "Student added",
        data: student,
        token
    }) ;

})

router.put('/', authenticate2 , async (req, res) => {

    console.log(req.body)
    const studentEmail = req.query.email

    const student = await Student.findOneAndUpdate({ email: studentEmail }, req.body, { new: true })

    return res.status(200).json({
        message: "Student updated!",
        data: student
    });
    
})



module.exports = router