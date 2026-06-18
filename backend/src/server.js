import express from "express"
import Dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js"
import router from "./routes/auth.routes.js"
import messageRouter from "./routes/message.route.js"
import cors from "cors"
const app = express()

Dotenv.config()

const PORT = process.env.PORT

app.use(express.json())  //req.body
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
connectDB()
app.use("/api/auth", router)
app.use("/api", messageRouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
})