import prisma from "../db";
import { hashPassword } from "../modules/auth";
//funcntion that allows to create a user

export const createNewUser = async (req,res) => {
    // creating user
    //using a post req
    const user = await prisma.user.create({
        data:{
            username: req.body.username,
            password:await hashPassword(req.body.passoword)
        }
    })
}