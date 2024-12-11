const mongoose = require('mongoose')
const conn = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_CONNECTION)
        if(!con){
            console.log('Error while connecting to DB')
            throw new Error('Error while connecting to DB')
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error while connecting to DB')
    }
}

module.exports = conn