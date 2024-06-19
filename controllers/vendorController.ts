import { Request, Response, NextFunction } from "express"
import { editVendorInputs, VendorLoginInput } from "../dto"
import { findVendor } from "./adminController"
import { generateSignature, validatePassword } from "../utilities"

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    
    const { email, password } = <VendorLoginInput> req.body

    const existingVendor = await findVendor("", email)

    if(existingVendor) {
        // validation and give access
        const validation = await validatePassword(password, existingVendor.password)

        if(validation) {

            const signature = generateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })

            return res.json(signature)
        }
        return res.json({ "message": "Password is not valid" }) 
    }

    return res.json({ "message": "Login credentials are not valid" })

}


export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if(user) {
        const existingUser = await findVendor(user._id)
        return res.json(existingUser)
    }

    return res.json({ "message": "Vendor information not found" })
}


export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, phone, foodTypes } = <editVendorInputs> req.body
    const user = req.user

    if(user) {
        const existingVendor = await findVendor(user._id)
        
        if(existingVendor) {
            existingVendor.name = name
            existingVendor.address = address
            existingVendor.phone = phone
            existingVendor.foodType = foodTypes

            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor information not found" })
}


export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if(user) {
        const existingVendor = await findVendor(user._id)
        
        if(existingVendor) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable
            const savedResult = await existingVendor.save()
            return res.json(savedResult)
        }

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor information not found" })
}