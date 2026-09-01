import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./configs/db.js"
import billingRouter from "./routes/billing.route.js"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 6005

app.get("/", (_req, res) => {
    res.status(200).json({ success: true, service: "billing" });
});

app.get("/health", (_req, res) => {
    res.status(200).json({ success: true });
});

app.use("/",billingRouter)

app.listen(PORT , ()=>{
    console.log(`Billing-service Started on ${PORT}`)
    connectDB()
    
})