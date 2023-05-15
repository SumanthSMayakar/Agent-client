const jwt = require('jsonwebtoken')
// auth middleware read the user id from token (cookies)

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization'); // Auth Header (Auth 2.0)
           
        if(!token)
            return res.status(400).json({ msg: "Session Expired.. Login Again.."})
        
        // reverse logic to validate the user id
        jwt.verify(token, process.env.ACCESS_SECRET, (err,data) => {
            //err => server error, data=> output response
            if(err) return res.status(400).json({ msg: "Invalid Access Token.."})

             // user id 
             req.user = data._id;
             next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = auth;