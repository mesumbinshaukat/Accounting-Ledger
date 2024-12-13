const mongoose = require("mongoose")

const customSavingAccountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    accountType: {
        type: String,
        enum: ['crypto', 'stocks', 'bonds', 'mutual funds', 'real estate', 'cash', 'gold', 'other'],  
    },
    accountName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length <= 50; 
            },
            message: 'Account name cannot exceed 50 characters.'
        },
        lowercase: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    savedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const CustomSavingAccountsSchema = mongoose.model("customSavingAccounts", customSavingAccountsSchema)

module.exports = CustomSavingAccountsSchema