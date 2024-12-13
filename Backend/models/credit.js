const mongoose = require("mongoose")

const creditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    creditSource: {
        type: String,
        lowercase: true,
        enum: ['bank', 'person', 'general store', 'other'], 
        required: true
    },
    creditId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: false
    }
})

const CreditSchema = mongoose.model("credit", creditSchema)

module.exports = CreditSchema