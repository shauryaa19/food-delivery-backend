import express, { Request, Response, NextFunction } from "express"
import multer from "multer"
import { addFood, getFoods, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from "../controllers"
import { authenticate } from "../middleware"

const router = express.Router()

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "images")
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString()+"_"+ file.originalname)
    }
})

const images = multer({ storage: imageStorage }).array("images", 10)

router.post("/login", vendorLogin)

router.use(authenticate)
router.get("/profile", getVendorProfile)
router.patch("/profile", updateVendorProfile)
router.patch("/coverimage", images, updateVendorCoverImage)
router.patch("/service", updateVendorService)

router.post("/food", images, addFood)
router.get("/foods", getFoods)

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "hello from vendor" })
})

export { router as vendorRoute }