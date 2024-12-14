const mongoose = require("mongoose")

const Schema = mongoose.Schema

const basicTransactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'basicAccounts',
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
    transactionType: {
        type: String,
        lowercase: true,
        enum: ['debit', 'credit'], 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const BasicTransactionSchema = mongoose.model("basicTransaction", basicTransactionSchema)

module.exports = BasicTransactionSchema