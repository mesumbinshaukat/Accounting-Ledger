const mongoose = require("mongoose")

const creditCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cardName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const CreditCardSchema = mongoose.model("creditCard", creditCardSchema)

module.exports = CreditCardSchema