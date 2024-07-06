import express, { Application } from "express"
import path from "path"
import { adminRoute, vendorRoute } from "../routes"

export default async (app: Application) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/images", express.static(path.join(__dirname, "images")))

    app.use("/admin", adminRoute)
    app.use("/vendor", vendorRoute)

    return app
}




