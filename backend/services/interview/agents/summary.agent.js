import llm from "../config/llm.js";
import summaryPrompt from "../prompts/summaryPrompt.js";

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
    throw new Error("The AI returned an invalid interview report.");
  }
};

const score = (value) => Math.max(0, Math.min(100, Number(value) || 0));

const list = (value, max) =>
  Array.isArray(value) ? value.map(String).filter(Boolean).slice(0, max) : [];

export const summaryAgent = async (data) => {
  try {
    const response = await llm.invoke(summaryPrompt(data));
    const result = parseJson(response.content);

    return {
      overallScore: score(result.overallScore),
      summary: String(result.summary || "").trim(),
      strengths: list(result.strengths, 5),
      weaknesses: list(result.weaknesses, 5),
      recommendations: list(result.recommendations, 5),
    };
  } catch (error) {
    console.error("Summary Agent Error:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
};
