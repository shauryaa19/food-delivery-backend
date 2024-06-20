import { Request, Response, NextFunction } from "express"
import { CreateVendorInput } from '../dto';
import { Vendor } from "../models";
import { generatePassword } from "../utilities";

// function to find vendor with email or id
export const findVendor = async (id : string | undefined, email ?: string) => {
    if(email) {
        return await Vendor.findOne({email})
    } else {
        return await Vendor.findById(id)
    }
}

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {

    // parse body
    const { name, address, pinCode, foodType, email, password, ownerName, phone } = <CreateVendorInput> req.body

    // check existing vendor
    const existingVendor = await findVendor("", email)

    if(existingVendor) {
        return res.json({
            message: "Vendor ith this email already exist"
        })
    }

    // hash password
    const userPassword = await generatePassword(password)

    // create vendor
    const createVendor = await Vendor.create({
        name, 
        address, 
        pinCode, 
        foodType, 
        email, 
        password: userPassword, 
        ownerName, 
        phone,
        salt: "hkuiu",
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: []
    })

    res.json(createVendor)
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    
    const vendors = await Vendor.find()

    if(vendors) {
        return res.json(vendors) 
    } 

    return res.json({ "message": "vendors data not vailable" })
}



export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
    
    const vendorId = req.params.id
    const vendor = await findVendor(vendorId)

    if(vendor) {
        return res.json(vendor)
    }

    return res.json({ "message": "vendor data is not available" })
}