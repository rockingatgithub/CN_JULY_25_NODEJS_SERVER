const mongoose = require('mongoose')


const interviewSchema = new mongoose.Schema({

    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    candidates: [{

        candidate: {
            ref: 'Candidate',
            type: mongoose.Types.ObjectId,
        },
        date: {
            type: Date,
            required: true,
        }
        
    }],

})

const Interview = mongoose.model('Interview', interviewSchema)
module.exports = Interview