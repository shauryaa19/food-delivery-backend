import express, { Request, Response, NextFunction } from "express"
import { addFood, getFoods, getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from "../controllers"
import { authenticate } from "../middleware"

const router = express.Router()

router.post("/login", vendorLogin)

router.use(authenticate)
router.get("/profile", getVendorProfile)
router.patch("/profile", updateVendorProfile)
router.patch("/service", updateVendorService)

router.post("/food", addFood)
router.get("/foods", getFoods)

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "hello from vendor" })
})

export { router as vendorRoute }