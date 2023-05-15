const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "name field must be filled"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email field must be filled"],
        trim: true,
        unique: [true, "email already exists."]
    },
    password: {
        type: String,
        required: [true, "password field must be filled"],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, "mobile field must be filled"],
        trim: true,
        unique: [true, "mobile already exists."]
    },
    role: {
        type: String,
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model("User", visitorSchema)