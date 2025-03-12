// using it to authenticate the user before accessing endpoints
// basically a guard between website and user.

// Middleware helps to make the code modular so that 
// these lines can be used for every endpoint

import jwt from "jsonwebtoken"
function authMiddleware (req, res, next) {

    // req will help to access the token associated with request
    // res will help to reject the user from accessing token if user found to be incorrect
    // next will enable to hit the endpoint after token authorization

    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({message: "No token provided"})
    }

    // Token has been provided
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {return res.status(401).json({message: "Invalid Token"})}
        req.userId = decoded.id
        next() 
    })
}

export default authMiddleware
