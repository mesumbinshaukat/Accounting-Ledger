const mongoose = require("mongoose")

const debtSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
   debtSource: {
        type: String,
        lowercase: true,
        enum: ['bank', 'person', 'general store', 'other'], 
        required: true
    },
    debtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bank',
        required: function () {
            return this.debtSource === 'bank'; 
        }
    },
    personName: {
        type: String,
        required: function () {
            return this.debtSource === 'person'; 
        }
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
    required: false,
    default: function() {
        const currentDate = new Date();
        return new Date(currentDate.setDate(currentDate.getDate() + 30));
    },
    validate: {
        validator: function(value) {
            return value >= new Date(); 
        },
        message: 'Due date cannot be in the past.'
    }
},
    status: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        required: true,
        default : "pending"
    }
})

const DebtSchema = mongoose.model("debt", debtSchema)

module.exports = DebtSchema