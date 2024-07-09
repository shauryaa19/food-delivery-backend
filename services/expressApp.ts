import express, { Application } from "express"
import path from "path"
import { adminRoute, shoppingRoute, vendorRoute } from "../routes"

export default async (app: Application) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    const imagesDir = path.join(__dirname, "../images")

    app.use("/images", express.static(imagesDir))

    app.use("/admin", adminRoute)
    app.use("/vendor", vendorRoute)
    app.use(shoppingRoute)

    return app
}




