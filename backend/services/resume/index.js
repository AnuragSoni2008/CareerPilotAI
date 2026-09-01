import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import resumeRouter from "./routes/resume.route.js"

dotenv.config()

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 6002

app.get("/", (_req, res) => {
    res.status(200).json({ success: true, service: "resume" });
});

app.get("/health", (_req, res) => {
    res.status(200).json({ success: true });
})

app.use("/", resumeRouter)



app.listen(PORT , ()=>{
    console.log(`Resume-service Started on ${PORT}`)
    connectDB()
})