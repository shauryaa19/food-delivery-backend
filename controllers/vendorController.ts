import { Request, Response, NextFunction } from "express"
import { CreateFoodInput, editVendorInputs, VendorLoginInput } from "../dto"
import { findVendor } from "./adminController"
import { generateSignature, validatePassword } from "../utilities"
import { Food } from "../models"

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

export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if(user) {

        const vendor = await findVendor(user._id)

        if(vendor) {

            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename)

            vendor.coverImages.push(...images)
    
            const result = await vendor.save()

            return res.json(result)
        }
    }

    return res.json({ "message": "Something went wrong with add food" })
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


export const addFood = async (req: Request, res: Response, next: NextFunction) => {

    const { name, description, category, foodType, readyTime, price } = <CreateFoodInput> req.body
    const user = req.user

    if(user) {

        const vendor = await findVendor(user._id)

        if(vendor) {

            const files = req.files as [Express.Multer.File]

            const images = files.map((file: Express.Multer.File) => file.filename)

            const createdFood = await Food.create({
                vendorId: vendor._id,
                name,
                description,
                category,
                foodType,
                readyTime,
                price,
                rating: 0,
                images
            })

            vendor.foods.push(createdFood)
            const result = await vendor.save()

            return res.json(result)
        }
    }

    return res.json({ "message": "Something went wrong with add food" })
}

export const getFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if(user) {
        const foods = await Food.find({ vendorId: user._id })

        if(foods) {
            return res.json(foods)
        }
    }

    return res.json({ "message": "Foods information not found" })
}