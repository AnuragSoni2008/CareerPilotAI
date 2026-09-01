import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { createWorker } from "tesseract.js";
import { pdf } from "pdf-to-img";

const MIN_TEXT_LENGTH = 80;
const MAX_OCR_PAGES = 10;

const normalizeText = (text) =>
  String(text || "")
    .replace(/\u0000/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

const extractPdfText = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    const text = normalizeText(result?.text);

    // Text-based PDFs are fast and much more accurate than OCR, so use them
    // whenever they contain meaningful text.
    if (text.length >= MIN_TEXT_LENGTH) {
      return text;
    }
  } finally {
    if (typeof parser.destroy === "function") {
      await parser.destroy();
    }
  }

  // Scanned/image-only PDFs have little or no text layer. Fall back to OCR.
  return extractScannedPdfText(filePath);
};

const extractScannedPdfText = async (filePath) => {
  const worker = await createWorker("eng");
  const pages = [];

  try {
    const document = await pdf(filePath, { scale: 2 });

    let pageCount = 0;
    for await (const image of document) {
      pageCount += 1;

      if (pageCount > MAX_OCR_PAGES) break;

      const { data } = await worker.recognize(image);
      if (data?.text) pages.push(data.text);
    }

    if (typeof document.destroy === "function") {
      await document.destroy();
    }

    return normalizeText(pages.join("\n\n"));
  } finally {
    await worker.terminate();
  }
};

const extractDocxText = async (filePath) => {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return normalizeText(result?.value);
};

const extractImageText = async (filePath) => {
  const worker = await createWorker("eng");

  try {
    const { data } = await worker.recognize(filePath);
    return normalizeText(data?.text);
  } finally {
    await worker.terminate();
  }
};

const extractText = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".pdf") {
    return extractPdfText(filePath);
  }

  if (extension === ".docx") {
    return extractDocxText(filePath);
  }

  if ([".png", ".jpg", ".jpeg", ".webp"].includes(extension)) {
    return extractImageText(filePath);
  }

  throw new Error("Unsupported resume format.");
};

export default extractText;
