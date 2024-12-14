const mongoose = require("mongoose")
const userModel = require("../models/users")
const basicTransaction = require("../models/basicTransaction")
const basicAccounts = require("../models/basicAccounts")

const accountValidator = async (userIdRegex, enumName, balanceRegex, descriptionRegex, enumStatus, res) => {
    const userIdRegex_ = /^[0-9a-fA-F]{24}$/
    const enumName_ = ['bank', 'cash']
    const balanceRegex_ = /^[0-9]+$/
    const descriptionRegex_ = /^[a-zA-Z0-9\s]+$/
    const enumStatus_ = ['active', 'inactive']

    if (!userIdRegex_.test(userIdRegex) || !mongoose.Types.ObjectId.isValid(userIdRegex) || !await userModel.findById(userIdRegex)) {
        throw new Error("Invalid userId");
    }

    if (!enumName_.includes(enumName)) {
        throw new Error("Invalid name");
    }

    if (!balanceRegex_.test(balanceRegex)) {
        throw new Error("Invalid balance");
    }

    if (!descriptionRegex_.test(descriptionRegex)) {
        throw new Error("Invalid description");
    }

    if (!enumStatus_.includes(enumStatus)) {
        throw new Error("Invalid status");
    }
}

// METHOD: POST
// ROUTE: /api/v2/easy-accounts
// DESC: Create a new account
const createAccount = async (req, res) => {
    try {
        const {userId, name, balance, description, status} = req.body

        console.table({userId, name, balance, description, status})

        await accountValidator(userId, name, balance, description, status);

        const newAccount = await new basicAccounts({
            userId,
            name,
            balance,
            description,
            status
        })

        if(!newAccount){
            console.log("Error while creating account")
            return res.status(400).json({
                message: "Error while creating account"
            })
        }

        const savedAccount = await newAccount.save()

        if(!savedAccount){
            console.log("Error while saving account")
            return res.status(400).json({
                message: "Error while saving account"
            })
        }
        
        console.log("Account created successfully")
        return res.status(201).json({
            message: "Account created successfully",
            account: savedAccount
        })

    } catch (error) {
        console.log("Catch Error: ", error)
        console.log("Specific Error Message: ", error.message)
        // throw new Error("Error while creating account")
        return res.status(500).json({ message: "Error while creating account" })
    }
}

// METHOD: PUT
// ROUTE: /api/v2/update-easy-account
// DESC: Update a account
const updateAccount = async (req, res) => {
    try {
        const {accountId, name, balance, description, status} = req.body

        console.table({accountId, name, balance, description, status})

        const id = new mongoose.Types.ObjectId(accountId)

        if(!mongoose.Types.ObjectId.isValid(id) || !await basicAccounts.findById(id)){
            throw new Error("Invalid accountId")
        }

        if(!name || !balance || !description || !status){
            throw new Error("All fields are required")
        }

        const userId = await basicAccounts.findById(id).select("userId")

        if(!userId){
            throw new Error("Account not found")
        }
        
        await accountValidator(userId, name, balance, description, status);

        const updatedAccount = await basicAccounts.findByIdAndUpdate(id, {
            name,
            balance,
            description,
            status
        }, {new: true})

        if(!updatedAccount){
            console.log("Error while updating account")
            return res.status(400).json({
                message: "Error while updating account"
            })
        }
        
        console.log("Account updated successfully")
        return res.status(200).json({
            message: "Account updated successfully",
            account: updatedAccount
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error while updating account" })
    }
}

// METHOD: POST
// ROUTE: /api/v2/easy-transaction
// DESC: Create a new transaction
const createTransaction = async (req, res) => {
    try {
        const {accountId, userId, amount, description, transactionType} = req.body
    } catch (error) {
        console.log(error)
        // throw new Error("Error while creating transaction")
        return res.status(500).json({ message: "Error while creating transaction" })
    }

}

module.exports = {
    createAccount,
    updateAccount,
    createTransaction
}