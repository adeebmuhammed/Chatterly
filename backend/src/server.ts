import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes/routes";

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
