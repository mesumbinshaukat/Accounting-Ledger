const userModel = require("../models/users")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")


// METHOD: POST
// ROUTE: /api/v2/create-user
// DESC: Create a new user
const createUser = async (req, res) => {
    try {
        const {first_name, last_name, email, phone, password} = req.body
        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const phone_regex = /^\+?[1-9]\d{1,14}$/

        if(!email_regex.test(email)){
            console.log("Invalid email")
            console.log(email)
            return res.status(400).json({
                message: "Invalid email"
            })
        }

        const checkEmail = await userModel.findOne({email})

        if(checkEmail){
            console.log("Email already exists")
            console.log(email)
            return res.status(400).json({
                message: "Email already exists"
            })
            
        }

        if(phone){
           console.log(phone)
            if(!phone_regex.test(phone)){
                console.log("Invalid phone")
                console.log(phone)
                return res.status(400).json({
                    message: "Invalid phone"
                })
            } 
        }

        if(!first_name || first_name.length < 3){
            console.log("Invalid name length")
            console.log(first_name)
            return res.status(400).json({
                message: "Invalid first name length"
            })
        }

        if(!last_name || last_name.length < 3){
            console.log("Invalid name length")
            console.log(last_name)
            return res.status(400).json({
                message: "Invalid last name length"
            })
        }

        if(!password || password.length < 5){
            console.log("Invalid password length")
            console.log(password)
            return res.status(400).json({
                message: "Invalid password length"
            })
        }

        const salt = await bcryptjs.genSalt(10)

        const encryptPassword = await bcryptjs.hash(password, salt)

        const user = new userModel({
            first_name,
            last_name,
            email,
            phone,
            password: encryptPassword
        })

        const createUser = await user.save()

        if(createUser){
            console.log("User Created:", createUser)
            const jwtToken = jwt.sign({user_id: createUser._id}, process.env.JWT_SECRET)
            console.log(jwtToken)
            return res.status(201).json({
                message: "User Created",
                jwtToken
            })
        }
        else{
            console.log("Error while creating user")
            return res.status(500).json({
                message: "Error while creating user"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error while creating user"
        })
    }
}


const loginUser = async (req, res) => {
    
}

module.exports = {
    createUser,
    loginUser
}