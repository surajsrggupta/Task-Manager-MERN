import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 🔥 SAME LOGIC: AI ko command
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a list of 5 sub-tasks for: ${prompt}. Keep them short and direct.`,
    });

    const text = response.text;

    // 🔥 SAME CLEANING LOGIC
    const tasks = text
      .split("\n")
      .filter((line) => line.match(/^\d+\.|^-|^\*/))
      .map((line) => line.replace(/^\d+\.|^-|\*/g, "").trim());

    if (!tasks.length) {
      return res.status(400).json({ error: "AI returned empty tasks" });
    }

    res.json({ tasks });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      error: "Gemini failed",
      details: error.message,
    });
  }
});

export default router;
