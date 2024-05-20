const mongoose = require('mongoose');

const GrievanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    // attachment: {
    //     type: String
    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    status:{
        type: String,
        default: 'Not Seen'
    },
    feedback:{
        type: String,
        default:'Not Updated'
    }
    
});

const Grievance = mongoose.model('Grievance', GrievanceSchema);

module.exports = Grievance;
