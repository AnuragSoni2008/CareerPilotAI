import llm from "../config/llm.js";
import feedbackPrompt from "../prompts/feedbackPrompt.js";

const parseJson = (content) => {
  const text = String(content || "")
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error("The AI returned invalid feedback.");
  }
};

const score = (value) => Math.max(0, Math.min(100, Number(value) || 0));

export const feedbackAgent = async (data) => {
  try {
    const response = await llm.invoke(feedbackPrompt(data));
    const result = parseJson(response.content);

    return {
      score: score(result.score),
      correctness: score(result.correctness),
      clarity: score(result.clarity),
      relevance: score(result.relevance),
      detail: score(result.detail),
      efficiency: score(result.efficiency),
      communication: score(result.communication),
      problemSolving: score(result.problemSolving),
      creativity: score(result.creativity),
      feedback: String(result.feedback || "").trim(),
      improvements: Array.isArray(result.improvements)
        ? result.improvements.map(String).filter(Boolean).slice(0, 3)
        : [],
    };
  } catch (error) {
    console.error("Feedback Agent Error:", error);
    throw new Error(`Failed to generate feedback: ${error.message}`);
  }
};
