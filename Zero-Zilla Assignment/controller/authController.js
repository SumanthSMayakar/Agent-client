const User = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createAccessToken } = require('../util/token')

const authController = {
    register: async(req,res) => {
        try {
            const {name, email, mobile, password} = req.body

            // password encryption
            const encPass = await bcrypt.hash(password, 10) //hash(pass,salt)

            // creating new user in db
            const newUser = await User.create({
                name,
                email,
                mobile,
                password: encPass
            })
            res.json({msg : "User registered successfully", user: newUser })
        } catch (err) {
        return res.status(500).json({msg : err.message});        
        }
    },
    login: async(req,res) => {
        try {
           const {email, password} = req.body;

            // validating user email
            let extUser = await User.findOne({email})
                if(!extUser)
                    return res.status(400).json({msg : "User doesn't exist"})

            //password compare - bcrypt.compare(string,salt)
            const isMatch = await bcrypt.compare(password,extUser.password)
                if(!isMatch)
                    return res.status(400).json({msg: "password doesn't exist"})

            //check user active or not
            if(!extUser.isActive)
                return res.status(400).json({msg : "Sorry, your account is blocked, contact Admin"})

            const accessToken = createAccessToken({_id:extUser._id})

            res.cookie('accessToken',accessToken, {
                httpOnly: true,
                signed: true,
                path : '/api/v1/auth/authToken',
                maxAge: 1 * 24 * 60 *60 *1000  // 1day 24hours 60 min 60sec 1000m.s 
            })

           res.json({token: accessToken, msg:"Login Successful" })
        } catch (err) {
        return res.status(500).json({msg : err.message});        
        }
    },
    logout: async(req,res) => {
        try {
            res.clearCookie('accessToken',{path:'/api/v1/auth/authToken'})
                res.status(200).json({msg : "Logout successfully"})

        } catch (err) {
        return res.status(500).json({msg : err.message});        
        }
    },
    authToken: async(req,res) => {
        try {
           const token = req.signedCookies.accessToken; 

           if(!token)
           return res.status(400).json({msg : 'Session Expired.. Login Again..'})

            //reverse logic to validate the user id
            jwt.verify(token, process.env.ACCESS_SECRET, (err,data) => {
                //err => server error, data => output response
                if(err) return res.status(400).json({msg : 'Invalid Access Token.. '})

                //regenerate access token
                const accessToken = createAccessToken({_id: data._id})
                res.json({accessToken})
            })

        } catch (err) {
        return res.status(500).json({msg : err.message});        
        }
    },
    currentUser : async(req,res) => {
        try {
            const cUser = await User.findById({_id:req.user})
            res.json({user:cUser})
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    }
}

module.exports = authController