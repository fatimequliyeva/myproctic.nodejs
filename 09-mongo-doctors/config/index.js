const mongoose = require('mongoose')
require('dotenv').config()

const connetctDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL.replace('<db_password>',process.env.PASSWORD))
        console.log('connected to ')

    }catch(error){
        console.log('error connecting to mongo db:',error)
    }
}

module.exports = connetctDB