// create a webtoken
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const comparePasswords = (passwords, hash) => {
    // this will compare if the passoword and the hash are the same ;
    
    return bcrypt.compare(passwords , hash)
}

// salt = makes it hard to guess
export const hashPassword = (password) => {
    return bcrypt.hash(password,5)
}

// input - something about the user
export const createJWT =( user)=>{
    const token = jwt.sign({
        id:user.id,
        username:user.username,
    },process.env.JWT_SECRET
    )
    return token

}

//this is middle where that checkes if a user is already signed in or not
export const protect = (req,res,next) => {
    //bearer - have ability to make the autorization header
    const bearer = req.headers.authorization//this gives the bearer what is in the authorization
    
    //if no token send the toke
    if(!bearer) {
        res.status(401)
        res.json({
            message:"not authorized"
        })
        return
    }

    // this is to check if the token is there
    const [,token] = bearer.split(" ")
    
    if(!token){
        res.status(401)
        res.json(
            {
                message:"this token is not valid"
            }
        )
        return
    }

    //if the token is real
    try{
        // we verify the token using the screet
            const user = jwt.verify(token, process.env.JWT_SECRET)
            req.user  = user
            next()

    }
    catch (e) {
        res.status(401)
        res.json({
            message:"not a valid token"
        })
        console.log(e)
    }
}