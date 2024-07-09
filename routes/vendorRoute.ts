import express, { Request, Response, NextFunction } from "express"
import multer from "multer"
import { addFood, getFoods, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from "../controllers"
import { authenticate } from "../middleware"
import path from 'path';

const router = express.Router()

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        const imagesDir = path.join(__dirname, '../images')
        cb(null, imagesDir)
    },
    filename: function(req, file, cb) {
        const filename = new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname // --> replace is used to replace : by - for windows
        cb(null, filename)
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