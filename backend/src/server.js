import express from "express"
import Dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js"
import router from "./routes/auth.routes.js"
import messageRouter from "./routes/message.route.js"
const app = express()

Dotenv.config()

const PORT = process.env.PORT

app.use(express.json())  //req.body
app.use(cookieParser())
connectDB()
app.use(router)
app.use(messageRouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
})