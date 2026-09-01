import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import interviewRouter from "./routes/interview.route.js"

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 6003

app.get("/", (req, res) => {
    res.send("Hello from Interview-service")
})

// Health check must come before the main router
app.get("/health", (req, res) => {
    res.json({ success: true })
})

app.use("/", interviewRouter)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Interview-service Started on ${PORT}`)
    connectDB()
})