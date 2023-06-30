const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../../models/admin')
const router = express.Router()

router.post('/', async (req, res) => {

    try{

        const admin = await Admin.create(req.body)

        let token = jwt.sign(admin.id, 'mykey')

        return res.status(200).json({
            message: "Admin created!",
            data: admin,
            isAdmin: true,
            token
        })

    } catch(error) {
        return res.status(500).json({
            message: "Server error!",
        })
    }

})

module.exports = router