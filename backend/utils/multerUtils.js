import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/productimages/");
  },
  filename: function (req, file, cb) {
    const randomHex = crypto.randomBytes(8).toString("hex");
    cb(
      null,
      file.fieldname +
        "_" +
        randomHex +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
