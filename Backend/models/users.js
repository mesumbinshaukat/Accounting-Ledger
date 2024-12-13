const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"]
    },
    bank: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank'
    }]
})

const UserSchema = mongoose.model("users", userSchema)

module.exports = UserSchema