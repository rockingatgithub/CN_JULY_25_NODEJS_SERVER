const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    interviews: [{
        ref: 'Interview',
        type: mongoose.Types.ObjectId,
    }]

})

const Student = mongoose.model('Candidate', studentSchema)
module.exports = Student