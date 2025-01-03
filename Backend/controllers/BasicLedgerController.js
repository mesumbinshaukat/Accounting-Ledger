const mongoose = require("mongoose")
const userModel = require("../models/users")
const basicTransaction = require("../models/basicTransaction")
const basicAccounts = require("../models/basicAccounts")
const jwt = require("jsonwebtoken")

const accountValidator = async (userIdRegex, title, enumName, balanceRegex, descriptionRegex, enumStatus) => {
    const userIdRegex_ = /^[0-9a-fA-F]{24}$/
    const titleRegex = /^[a-zA-Z0-9\s]+$/
    const enumName_ = ['bank', 'cash']
    const balanceRegex_ = /^[0-9]+$/
    const descriptionRegex_ = /^[a-zA-Z0-9\s]+$/
    const enumStatus_ = ['active', 'inactive']

    if (!userIdRegex_.test(userIdRegex) || !mongoose.Types.ObjectId.isValid(userIdRegex) || !await userModel.findById(userIdRegex)) {
        throw new Error("Invalid userId");
    }

    if (!titleRegex.test(title)) {
        throw new Error("Invalid title");
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

const transactionValidator = async (userId, accountId, amount, description, transactionType) => {
    const userIdRegex = /^[0-9a-fA-F]{24}$/
    const accountIdRegex = /^[0-9a-fA-F]{24}$/
    const amountRegex = /^[0-9]+$/
    const descriptionRegex = /^[a-zA-Z0-9\s]+$/
    const transactionTypeRegex = ['debit', 'credit']

    if (!userIdRegex.test(userId) || !mongoose.Types.ObjectId.isValid(userId) || !await userModel.findById(userId)) {
        throw new Error("Invalid userId");
    }

    if (!accountIdRegex.test(accountId) || !mongoose.Types.ObjectId.isValid(accountId) || !await basicAccounts.findById(accountId)) {
        throw new Error("Invalid accountId");
    }

    if (!amountRegex.test(amount)) {
        throw new Error("Invalid amount");
    }

    if (!descriptionRegex.test(description)) {
        throw new Error("Invalid description");
    }

    if (!transactionTypeRegex.includes(transactionType)) {
        throw new Error("Invalid transactionType");
    }
}
// METHOD: POST
// ROUTE: /api/v2/easy-accounts
// DESC: Create a new account
const createAccount = async (req, res) => {
    try {
        const {name, title, balance, description, status, token} = req.body

        console.table({token, name, balance, description, status})

        if(!token){
            console.log("You are not logged in")
            return res.status(400).json({
                message: "You are not logged in"
            })
        }

        const userId = await jwt.verify(token, process.env.JWT_SECRET)

        console.log("userId: ", userId.user_id)

        if(!userId.user_id){
            console.log("You are not logged in")
            return res.status(400).json({
                message: "You are not logged in"
            })
        }

        const user_id = userId.user_id

        await accountValidator(user_id, title, name, balance, description, status);

        const newAccount = await new basicAccounts({
            userId: user_id,
            name,
            title,
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
        return res.status(500).json({ message: error.message })
    }
}

// METHOD: GET
// ROUTE: /api/v2/easy-accounts
// DESC: Get all accounts for specific user
const getAllAccounts = async (req, res) => {
    try {
        const {user_Id} = req.params

        console.table({user_Id})

        if(!user_Id){
            console.log("You are not logged in")
            return res.status(400).json({
                message: "You are not logged in"
            })
        }

        const userIdObj = jwt.verify(user_Id, process.env.JWT_SECRET)

        console.log("userIdObj: ", userIdObj)

        const userId = userIdObj.user_id

        console.log("userId: ", userId)

        const userIdRegex = /^[0-9a-fA-F]{24}$/

        if(!userIdRegex.test(userId) || !mongoose.Types.ObjectId.isValid(userId) || !await userModel.findById(userId)){
            throw new Error("Invalid userId")
        }

        const accounts = await basicAccounts.find({userId})

        console.log("accounts: ", accounts)

        if(!accounts){
            console.log("Error while getting accounts")
            return res.status(400).json({
                message: "Error while getting accounts"
            })
        }

        console.log("Accounts fetched successfully")
        return res.status(200).json({
            message: "Accounts fetched successfully",
            accounts
        })
    } catch (error) {
        console.log("Catch Error: ", error)
        console.log("Specific Error Message: ", error.message)
        // throw new Error("Error while getting accounts")
        return res.status(500).json({ message: "Error while getting accounts" })
    }
}

// METHOD: PUT
// ROUTE: /api/v2/update-easy-account
// DESC: Update a account
const updateAccount = async (req, res) => {
    try {
        const {accountId, name, balance, description, status} = req.body

        console.table({accountId, name, balance, description, status})

        if(!mongoose.Types.ObjectId.isValid(accountId) || !await basicAccounts.findById(accountId)){
            throw new Error("Invalid accountId")
        }

        if(!name || !balance || !description || !status){
            throw new Error("All fields are required")
        }

        const userId = await basicAccounts.findById(accountId).select("userId")

        console.log(userId)

        const extractId = userId.userId.toString()

        console.log(extractId)

        if(!extractId){
            throw new Error("Account not found")
        }
        
        await accountValidator(extractId, name, balance, description, status);

        const updatedAccount = await basicAccounts.findByIdAndUpdate(accountId, {
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
        let {userId, accountId, amount, description, transactionType} = req.body

        console.table({accountId, userId, amount, description, transactionType})

        userId = jwt.verify(userId, process.env.JWT_SECRET)

        userId = userId.user_id

        if(!mongoose.Types.ObjectId.isValid(accountId) || !await basicAccounts.findById(accountId)){
            throw new Error("Invalid accountId")
        }

        if(!mongoose.Types.ObjectId.isValid(userId) || !await userModel.findById(userId)){
            throw new Error("Invalid userId")
        }

        if(!amount || !description || !transactionType){
            throw new Error("All fields are required")
        }

        await transactionValidator(userId, accountId, amount, description, transactionType);

        const getBalance = await basicAccounts.findById(accountId).select("balance")

        if(!getBalance){
            throw new Error("Account not found")
        }

        const balance = getBalance.balance

        if(balance < amount){
            throw new Error("Insufficient balance")
        }

        if(transactionType === "debit"){
            const newBalance = balance - amount
            const updatedAccount = await basicAccounts.findByIdAndUpdate(accountId, {
                balance: newBalance
            }, {new: true})
            if(!updatedAccount){
                console.log("Error while updating account")
                return res.status(400).json({
                    message: "Error while updating account"
                })
            }
        }

        if(transactionType === "credit"){
            const newBalance = balance + amount
            const updatedAccount = await basicAccounts.findByIdAndUpdate(accountId, {
                balance: newBalance
            }, {new: true})
            if(!updatedAccount){
                console.log("Error while updating account")
                return res.status(400).json({
                    message: "Error while updating account"
                })
            }
        }

        const newTransaction = await new basicTransaction({
            userId,
            accountId,
            amount,
            description,
            transactionType
        })

        if(!newTransaction){
            console.log("Error while creating transaction")
            return res.status(400).json({
                message: "Error while creating transaction"
            })
        }

        const savedTransaction = await newTransaction.save()

        if(!savedTransaction){
            console.log("Error while saving transaction")
            return res.status(400).json({
                message: "Error while saving transaction"
            })
        }
        
        console.log("Transaction created successfully")
        return res.status(201).json({
            message: "Transaction created successfully",
            transaction: savedTransaction
        })
        

    } catch (error) {
        console.log(error)
        // throw new Error("Error while creating transaction")
        return res.status(500).json({ message: "Error while creating transaction" })
    }

}

// METHOD: GET
// ROUTE: /api/v2/easy-transaction
// DESC: Get all transactions for specific user
const getAllTransactions = async (req, res) => {
    try {
        const {userId} = req.body

        console.table({userId})

        if(!mongoose.Types.ObjectId.isValid(userId) || !await userModel.findById(userId)){
            throw new Error("Invalid userId")
        }

        const transactions = await basicTransaction.find({userId})

        if(!transactions){
            console.log("Error while getting transactions")
            return res.status(400).json({
                message: "Error while getting transactions"
            })
        }

        console.log("Transactions fetched successfully")
        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions
        })

    } catch (error) {
        console.log(error)
        // throw new Error("Error while getting transactions")
        return res.status(500).json({ message: "Error while getting transactions" })
    }
}

// METHOD: POST
// ROUTE: /api/v2/update-easy-transaction
// DESC: Update transaction
const updateTransaction = async (req, res) => {
    try {
        const {userId, transactionId, amount, description, transactionType} = req.body

        console.table({transactionId, userId, amount, description, transactionType})

        if(!mongoose.Types.ObjectId.isValid(transactionId) || !await basicTransaction.findById(transactionId)){
            throw new Error("Invalid transactionId")
        }

        if(!mongoose.Types.ObjectId.isValid(userId) || !await userModel.findById(userId)){
            throw new Error("Invalid userId")
        }

        if(!amount || !description || !transactionType){
            throw new Error("All fields are required")
        }

        const accountId = await basicTransaction.findById(transactionId).select("accountId")

        console.log(accountId)

        if(!accountId){
            throw new Error("Account not found")
        }

        if(!await basicAccounts.findById(accountId.accountId)){
            throw new Error("Account not found")
        }

        const extractAccId = accountId.accountId.toString()

        await transactionValidator(userId, extractAccId, amount, description, transactionType);

        const getTransaction = await basicTransaction.findById(transactionId)

        if(!getTransaction){
            console.log("Error while getting transaction")
            return res.status(400).json({
                message: "Error while getting transaction"
            })
        }

        const getAmount = getTransaction.amount
        const getBalance = await basicAccounts.findById(getTransaction.accountId).select("balance")

        if(!getBalance){
            throw new Error("Account not found")
        }

        const balance = getBalance.balance

        if(balance < amount){
            throw new Error("Insufficient balance")
        }

        if(transactionType === "debit"){
            const newBalance = balance + getAmount - amount
            const updatedAccount = await basicAccounts.findByIdAndUpdate(getTransaction.accountId, {
                balance: newBalance
            }, {new: true})
            console.log(updatedAccount)
            if(!updatedAccount){
                console.log("Error while updating account")
                return res.status(400).json({
                    message: "Error while updating account"
                })
            }
        }

        if(transactionType === "credit"){
            const newBalance = balance - getAmount + amount
            const updatedAccount = await basicAccounts.findByIdAndUpdate(getTransaction.accountId, {
                balance: newBalance
            }, {new: true})
            if(!updatedAccount){
                console.log("Error while updating account")
                return res.status(400).json({
                    message: "Error while updating account"
                })
            }
        }

        const updatedTransaction = await basicTransaction.findByIdAndUpdate(transactionId, {
            amount,
            description,
            transactionType
        }, {new: true})

        if(!updatedTransaction){
            console.log("Error while updating transaction")
            return res.status(400).json({
                message: "Error while updating transaction"
            })
        }
        
        console.log("Transaction updated successfully")
        return res.status(200).json({
            message: "Transaction updated successfully",
            transaction: updatedTransaction
        })

    } catch (error) {
        console.log(error)
        // throw new Error("Error while updating transaction")
        return res.status(500).json({ message: "Error while updating transaction" })
    }
}

module.exports = {
    createAccount,
    getAllAccounts,
    updateAccount,
    createTransaction,
    getAllTransactions,
    updateTransaction
}