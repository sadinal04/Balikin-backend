import { Request, Response, NextFunction } from "express";
import { LostItem } from "../models/LostItem";

// Fungsi untuk menambahkan barang hilang
export const addLostItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, description, location, image } = req.body;

  if (!name || !description || !location || !image) {
    res.status(400).json({ message: "All fields are required" });
    return; // Pastikan mengakhiri eksekusi fungsi di sini jika ada error
  }

  try {
    const newItem = new LostItem({
      name,
      description,
      location,
      image,
      status: "unclaimed",  // default status
      timestamp: new Date()
    });

    await newItem.save();
    res.status(201).json({ message: "Barang hilang berhasil ditambahkan", item: newItem });
  } catch (error) {
    next(error); // Melanjutkan error handling
  }
};

// Fungsi untuk mendapatkan daftar barang hilang
export const getLostItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const items = await LostItem.find();  // Menarik semua barang hilang dari database
    res.status(200).json(items);  // Mengirimkan daftar barang hilang sebagai respons
  } catch (error) {
    next(error); // Melanjutkan error handling
  }
};

// Fungsi untuk mengubah status barang menjadi 'claimed'
export const claimLostItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const itemId = req.params.id;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      res.status(404).json({ message: "Barang tidak ditemukan" });
      return; // Menyelesaikan fungsi jika item tidak ditemukan
    }

    if (item.status === "claimed") {
      res.status(400).json({ message: "Barang ini sudah diklaim" });
      return; // Menyelesaikan fungsi jika barang sudah diklaim
    }

    item.status = "claimed";
    await item.save();

    res.json({ message: "Barang berhasil diklaim", item });
  } catch (error) {
    next(error); // Melanjutkan error handling
  }
};

// Fungsi untuk mendapatkan detail barang hilang berdasarkan ID
export const getLostItemDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const itemId = req.params.id;

  try {
    const item = await LostItem.findById(itemId);  // Mencari barang berdasarkan ID
    if (!item) {
      res.status(404).json({ message: "Barang tidak ditemukan" });
      return;
    }

    res.status(200).json(item);  // Mengirimkan detail barang hilang
  } catch (error) {
    next(error); // Melanjutkan error handling
  }
};
