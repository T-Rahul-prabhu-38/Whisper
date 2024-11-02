import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/connectDB.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
