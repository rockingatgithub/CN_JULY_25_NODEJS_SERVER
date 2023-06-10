const express = require('express')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const generator = require('generate-password');
const Student = require('../../models/student')
const router = express.Router()
const passport = require('../../config/passportLocalStrategy')

router.use('/admin', require('./admin'))

// ==================== Local authentication =======================
router.post('/', async  (req, res) => {

    const student = await Student.findOne({email: req.body.email, password: req.body.password})

    if (student) {
        res.cookie('user', student.id)
        return res.status(200).json({
            message: "Student fetched!",
            data: student
        })
    }

    return res.status(401).json({
        message: "Unauthorized!",
    })

})

// ==================== JWT authentication =======================

router.post('/jwt', async  (req, res) => {

    const student = await Student.findOne({email: req.body.email, password: req.body.password})

    if(student) {

        const token = jwt.sign(student.id, process.env.JWT_KEY)

        res.cookie('user', token)
        return res.status(200).json({
            message: "Student fetched!",
            data: student
        })
    }

    return res.status(401).json({
        message: "Unauthorized!",
    })

})

router.post('/local', 

passport.authenticate('local', { failureRedirect: '/login' }),

(req, res) => {

    return res.status(200).json({
        message: "Authenticated!",
        data: req.user
    })

}


)


// ==================== Google authentication =======================

router.post('/google', async (req, res) => {

    console.log(req.body.token)

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    const {email, name, sub} = payload
    const password = generator.generate({
        length: 8
    })

    console.log(payload)

    let student = await Student.findOne({ email: email })

    if(student) {
        return res.status(200).json({
            message: "Student fetched!",
            data: student
        })
    }

    student = await Student.create({
        name,
        email,
        password
    })

    return res.status(200).json({
        message: "Student fetched!",
        data: student
    })

})



module.exports = router