const mongoose = require("mongoose")

const basicAccountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true,
        enum: ['bank', 'cash'],
        validate: {
            validator: function(v) {
                return v.length >= 4
            },
            message: props => `${props.value} is not a valid name!`
        },
    },
    balance: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        lowercase: true,
        default : "active",
        validator: {
            validator: function(v) {
                return v.length >= 4
            },
            message: props => `${props.value} is not a valid status!`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const BasicAccountsSchema = mongoose.model("basicAccounts", basicAccountsSchema)

module.exports = BasicAccountsSchema