import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request } from "express"
import { AuthPayload, VendorPayload } from "../dto"
import { JWT_SECRET } from "../config"

export const generatePassword = async (password: string) => await bcrypt.hash(password, 10)

export const validatePassword = async (enteredPassword: string, savedPassword: string) => await bcrypt.compare(enteredPassword, savedPassword)

export const generateSignature = (payload: VendorPayload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })

export const validateSignature = async (req: Request) => {

    const signature = req.get("Authorization")

    if(signature) {
        const payload = jwt.verify(signature.split(" ")[1], JWT_SECRET) as AuthPayload
        req.user = payload 
        return true
    }

    return false
}
    
