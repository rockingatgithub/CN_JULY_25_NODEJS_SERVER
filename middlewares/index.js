const Student = require("../models/student")
const jwt = require('jsonwebtoken')


exports.authenticate2 = async (req, res, next) => {

    if (req.cookies.user) {

        const id = jwt.verify(req.cookies.user, process.env.JWT_KEY)

        const student = await Student.findById(id)

        if(student) {
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorized!",
            })
        }
    } else {
        return res.status(401).json({
            message: "Unauthorized!",
        })
    }

}


exports.authenticate = async (req, res, next) => {

    console.log(req.cookies)
    if (req.cookies.user) {

        const student = await Student.findById(req.cookies.user)

        if(student) {
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorized!",
            })
        }
    } else {
        return res.status(401).json({
            message: "Unauthorized!",
        })
    }
}


exports.requestCounter = (req, res, next) => {
    // counter++
    // console.log("The total requests are:- ", counter)
    // next()
}

exports.authenticateLocal = (req, res, next) => {

    if(req.user) {
        next()
    } else {
        return res.status(401).json({
            message: "Unauthorized!",
        })
    }

}