import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/product", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
