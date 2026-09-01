import api from "../utils/axios";

const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message || error?.message || fallback;

export const startInterview = async (data) => {
    try {
        const response = await api.post("/api/interview/start", data);
        return response.data;
    } catch (error) {
        console.error("Start Interview Error:", error);
        return {
            success: false,
            message: getErrorMessage(error, "Failed to start interview"),
        };
    }
};

export const getInterview = async (id) => {
    try {
        const response = await api.get(`/api/interview/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get Interview Error:", error);
        return {
            success: false,
            message: getErrorMessage(error, "Failed to load interview"),
        };
    }
};

export const submitAnswer = async (data) => {
    try {
        const response = await api.post("/api/interview/answer", data);
        return response.data;
    } catch (error) {
        console.error("Submit Answer Error:", error);
        return {
            success: false,
            message: getErrorMessage(error, "Failed to submit answer"),
        };
    }
};

export const getAllInterviews = async () => {
    try {
        const response = await api.get("/api/interview/all");
        return response.data;
    } catch (error) {
        console.error("Get Interviews Error:", error);
        return {
            success: false,
            message: getErrorMessage(error, "Failed to load interviews"),
        };
    }
};
