const mongoose = require("mongoose")

const Schema = mongoose.Schema

const spendingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    spendingOn: {
        type: String,
        lowercase: true,
        enum: ['shopping', 'medical expense', 'grocery', 'other'], 
        required: true
    },
    spendingFrom:{
        type: Schema.Types.ObjectId,
        enum: ['debit card', 'credit card', 'other'],
        lowercase: true,
        required: true
    },
    spendingFromDebit: {
        type: Schema.Types.ObjectId,
        ref: 'debitCard',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },   

    date: {
        type: Date,
        default: Date.now
    }
    
})

const SpendingSchema = mongoose.model("spendings", spendingSchema)

module.exports = SpendingSchema