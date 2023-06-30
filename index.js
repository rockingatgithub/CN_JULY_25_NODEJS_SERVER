const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const PORT = 8000
const app = express()
const db = require('./config/mongoose');
// const passport = require('./config/passportLocalStrategy')
const passport = require('./config/passportJWTStrategy')
dotenv.config()

var corsOptions = {
    origin: 'http://localhost:3000',
  }

// middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routers'))


app.listen(PORT, () => {
    console.log("Express is running!")
})