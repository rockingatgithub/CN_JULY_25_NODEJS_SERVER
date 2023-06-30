const express = require('express');
const passport = require('../../config/passportJWTStrategy');
const Interview = require('../../models/interview');
const router = express.Router()

router.post('/' ,async (req, res) => {

    try {

        console.log(req.body);
        await Interview.create(req.body)
        const interviews = await Interview.find()

        return res.status(200).json({
            message: "Interview created successfully!",
            interviews
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            message: "Internal server error!",
        })

    }

})

router.get('/', async (req, res) => {

    try {

        const interviews = await Interview.find()
        return res.status(200).json({
            message: "Interview fetched successfully!",
            interviews
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            message: "Internal server error!",
        })

    }
})

module.exports = router