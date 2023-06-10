const passport = require('passport')
const Student = require('../models/student')
const passportLocalStrategy = require('passport-local').Strategy


passport.use(  new passportLocalStrategy( {
    usernameField: 'email'
}, async function (email, password, done) {

    try{

        const student = await Student.findOne({email: email})
        if(student) {
            done(null, student)
        } else {
            done(null, false)
        }

    } catch (error) {

        done(error, false)

    }
    


}  )   )



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    const student  = await Student.findById(id);
    if(student) {
        done(null, student)
    } else {
        done(null, false)
    }
  });


  module.exports = passport