const express = require('express')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const generator = require('generate-password');
const Admin = require('../../../models/admin')
const router = express.Router()
const passport = require('../../../config/passportLocalStrategy')

// ==================== Local authentication =======================
router.post('/', async  (req, res) => {

    const admin = await Admin.findOne({email: req.body.email, password: req.body.password})

    if (admin) {
        res.cookie('user', admin.id)
        return res.status(200).json({
            message: "admin fetched!",
            data: admin
        })
    }

    return res.status(401).json({
        message: "Unauthorized!",
    })

})

// ==================== JWT authentication =======================

router.post('/jwt', async  (req, res) => {

    const admin = await Admin.findOne({email: req.body.email, password: req.body.password})

    if(admin) {

        const token = jwt.sign(admin.id, 'mykey')

        res.cookie('user', token)
        return res.status(200).json({
            message: "admin fetched!",
            data: admin
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

    const client = new OAuth2Client('84427783556-26q1c6omger9fie7mfvpaonihegat7h8.apps.googleusercontent.com')

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: '84427783556-26q1c6omger9fie7mfvpaonihegat7h8.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    const {email, name, sub} = payload
    const password = generator.generate({
        length: 8
    })

    console.log(payload)

    let admin = await Admin.findOne({ email: email })

    if(admin) {
        return res.status(200).json({
            message: "admin fetched!",
            data: admin
        })
    }

    admin = await Admin.create({
        name,
        email,
        password
    })

    return res.status(200).json({
        message: "admin fetched!",
        data: admin
    })

})



module.exports = router