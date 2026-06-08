import express from "express"
import Dotenv from "dotenv"
const app = express()

Dotenv.config()

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT)
})