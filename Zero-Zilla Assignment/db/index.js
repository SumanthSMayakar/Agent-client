const mongoose = require('mongoose')

const connectDb = url => {
    return mongoose.connect(url, (err) => {
        console.log('mongodb connected successfully')
    })
}

module.exports = connectDb