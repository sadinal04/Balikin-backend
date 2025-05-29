import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware umum
app.use(cors());
app.use(express.json());

// Daftarkan route auth
app.use("/api/auth", authRoutes);

// Route test
app.get("/", (req, res) => {
  res.send("Backend Balik.in FMIPA is running!");
});

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI || "", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Error handler middleware (harus di paling bawah)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", error: err.message || err });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
