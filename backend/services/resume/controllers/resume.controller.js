import fs from "node:fs/promises";
import redis from "../../../shared/redis/redis.js";
import { resumeAgent } from "../agents/resume.agent.js";
import extractText from "../config/pdf.js";
import Resume from "../models/resume.model.js";

const deleteUploadedFile = async (file) => {
  if (!file?.path) return;

  try {
    await fs.unlink(file.path);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("FILE DELETE ERROR:", error);
    }
  }
};

export const uploadResume = async (req, res) => {
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume file.",
      });
    }

    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "UserId is required.",
      });
    }

    const resumeText = await extractText(file.path);

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(422).json({
        success: false,
        message:
          "We could not read enough text from this resume. Try a clearer PDF/image or a DOCX file.",
      });
    }

    const resumeData = await resumeAgent(resumeText);

    let resume = await Resume.findOne({ userId });

    if (resume) {
      Object.assign(resume, {
        ...resumeData,
        extractedText: resumeText,
      });
      await resume.save();
    } else {
      resume = await Resume.create({
        userId,
        extractedText: resumeText,
        ...resumeData,
      });
    }

    await redis.set(
      `resume:${userId}`,
      JSON.stringify(resume),
      "EX",
      60 * 60
    );

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data: resume,
    });
  } catch (error) {
    console.error("RESUME UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Resume analysis failed.",
    });
  } finally {
    await deleteUploadedFile(file);
  }
};

export const getResume = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "UserId is required.",
      });
    }

    const cache = await redis.get(`resume:${userId}`);

    if (cache) {
      return res.status(200).json({
        success: true,
        source: "redis",
        data: JSON.parse(cache),
      });
    }

    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    await redis.set(
      `resume:${userId}`,
      JSON.stringify(resume),
      "EX",
      60 * 60
    );

    return res.status(200).json({
      success: true,
      source: "mongoDb",
      data: resume,
    });
  } catch (error) {
    console.error("GET RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to fetch resume.",
    });
  }
};
