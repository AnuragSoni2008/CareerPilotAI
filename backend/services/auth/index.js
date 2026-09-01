import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();


const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 6001

app.get("/health", (_req, res) => {
    res.status(200).json({ success: true });
});

app.use("/", authRouter);



app.listen(PORT,() => {
    console.log( `Auth Service Started on ${PORT}`);
    connectDb()
  }
);