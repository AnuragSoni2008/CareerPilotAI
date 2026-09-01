import llm from "../config/llm.js";
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js";
import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js";

const parseJson = (content) => {
  const text = String(content || "")
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error("The AI returned invalid interview questions.");
  }
};

export const interviewAgent = async (data) => {
  try {
    const prompt =
      data.type?.toLowerCase() === "hr"
        ? hrInterviewPrompt(data)
        : technicalInterviewPrompt(data);

    const response = await llm.invoke(prompt);
    const questions = parseJson(response.content);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("No interview questions were generated.");
    }

    return questions.slice(0, 6).map((item) => ({
      question: String(item?.question || "").trim(),
      difficulty: ["easy", "medium", "hard"].includes(item?.difficulty)
        ? item.difficulty
        : "medium",
      timer: Math.max(60, Number(item?.timer) || 90),
    })).filter((item) => item.question);
  } catch (error) {
    console.error("Interview Agent Error:", error);
    throw new Error(`Failed to generate interview questions: ${error.message}`);
  }
};
