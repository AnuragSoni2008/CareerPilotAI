import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadPath = process.env.UPLOAD_DIR || path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const allowedTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const allowedExtensions = new Set([".pdf", ".docx", ".png", ".jpg", ".jpeg", ".webp"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`;
    cb(null, safeName);
  },
});

const fileFilter = (_req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.has(file.mimetype) && allowedExtensions.has(extension)) {
    return cb(null, true);
  }

  cb(new Error("Supported resume formats: PDF, DOCX, PNG, JPG, JPEG, WEBP."));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});
