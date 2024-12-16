const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const db = require("./config/config.js")
const { createUser, loginUser } = require("./controllers/UserController.js")
const {createAccount, getAllAccounts, updateAccount, createTransaction, getAllTransactions, updateTransaction} = require("./controllers/BasicLedgerController.js")

// CORS Whitelisting
const corsOptions = {
    origin: 'http://localhost:5173/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
// User Routes
app.post("/api/v2/create-user", createUser)
app.post("/api/v2/login-user", loginUser)

// Simple Accounting Ledger
app.post("/api/v2/easy-accounts", createAccount).put("/api/v2/update-easy-account", updateAccount).get("/api/v2/easy-accounts", getAllAccounts)

app.post("/api/v2/easy-transaction", createTransaction).put("/api/v2/update-easy-transaction", updateTransaction).get("/api/v2/easy-transaction", getAllTransactions)


const port = process.env.PORT ? process.env.PORT : 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    db()
})