import express from "express"
import Dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import router from "./routes/auth.routes.js"
const app = express()

Dotenv.config()

const PORT = process.env.PORT

app.use(express.json())  //req.body
connectDB()
app.use(router)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
})