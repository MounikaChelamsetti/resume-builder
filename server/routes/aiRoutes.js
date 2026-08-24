import express from "express"

import protect from "../middlewares/authMiddleware.js"

import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js"

const aiRouter = express.Router()

/*
  AI professional summary enhancement
*/
aiRouter.post(
  "/enhance-pro-sum",
  protect,
  enhanceProfessionalSummary
)

/*
  AI job description enhancement
*/
aiRouter.post(
  "/enhance-job-desc",
  protect,
  enhanceJobDescription
)

/*
  Upload existing PDF resume
  → Extracted text
  → AI
  → Structured resume
  → MongoDB
*/
aiRouter.post(
  "/upload-resume",
  protect,
  uploadResume
)

export default aiRouter