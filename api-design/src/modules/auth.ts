// create a webtoken
import jwt from "jsonwebtoken"

// input 
export const createJWT =( user)=>{
    const token = jwt.sign({
        id:user.id,
        username:user.username,
    },process.env.JWT_SECRET
    )
    return token

}

export const protect = (req,res,next) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        res.status(401)
        res.json({
            message:"not authorized"
        })
        return
    }

    const [] = bearers.split()
}