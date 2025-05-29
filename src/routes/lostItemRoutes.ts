import express from "express";
import { addLostItem, claimLostItem, getLostItemDetail, getLostItems } from "../controllers/lostItemController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Route untuk menambahkan barang hilang (hanya untuk pengguna yang terautentikasi)
router.post("/add", verifyToken, addLostItem);

// Endpoint untuk mendapatkan daftar barang hilang
router.get("/", verifyToken, getLostItems);

// Endpoint untuk mengubah status barang menjadi 'claimed'
router.patch("/claim/:id", verifyToken, claimLostItem);

// Endpoint untuk mendapatkan detail barang hilang berdasarkan ID
router.get("/:id", verifyToken, getLostItemDetail);


export default router;  // Pastikan menggunakan 'export default' di sini
