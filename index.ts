import express from "express"
import mongoose from "mongoose"
import { adminRoute, vendorRoute } from "./routes"
import { MONGO_URI } from "./config"

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/admin", adminRoute)
app.use("/vendor", vendorRoute)

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Db connected")
}).catch(err => console.log("error" + err))


app.listen(port, () => {
    console.clear()
    console.log(`App is listening on port ${port}`)
})

