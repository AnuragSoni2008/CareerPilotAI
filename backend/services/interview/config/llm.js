import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatGroq({
  model: process.env.GROQ_INTERVIEW_MODEL || "openai/gpt-oss-120b",
  temperature: 0.2,
  maxRetries: 2,
  modelKwargs: {
    response_format: { type: "json_object" },
  },
});

export default llm;
