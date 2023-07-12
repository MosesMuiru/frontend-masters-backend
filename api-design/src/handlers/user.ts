import prisma from "../db";
import { comparePasswords, hashPassword } from "../modules/auth";
import { createJWT } from "../modules/auth";
//funcntion that allows to create a user

export const createNewUser = async (req,res) => {
    // creating user
    //using a post req
    const user = await prisma.user.create({
        data:{
            username: req.body.username,
            password:await hashPassword(req.body.passoword)
        } })

    const token = createJWT(user)
    res.json({token})
}

export const signin =async (req,res) => {
    // if your password match with what it has in the database
    const user = await prisma.user.findUnique({
        where:{
            username:req.body.username 
        }
    })

    const isValid = await comparePasswords(req.body.passoword,user.password)

    if(!isValid) {
        res.status(401)
        res.json({
            message:"fuck you hacker you are not sign in"
        })

    }
}