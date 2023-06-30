const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const passport = require('passport')
const Admin = require('../models/admin')
const Student = require('../models/student')

passport.use(new JWTStrategy({
    secretOrKey: 'mykey',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken

}, async function (id, done) {

    try {

        console.log(id)

        const student = await Student.findById(id)
        if(student){
            done(null, student)
        } else {

            const admin = await Admin.findById(id)
            if(admin) {
                done (null, admin)
            } else {
                done(null, false)
            }
        }

    } catch(error) {
        done(error, false)
    }

}))


module.exports = passport