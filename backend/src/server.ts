import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes/routes";
import cors from "cors";

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
