const mongoose = require("mongoose")

const bankSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: () => {
            return this.role === 'user';
        }
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

const BankSchema = mongoose.model("bank", bankSchema)

module.exports = BankSchema