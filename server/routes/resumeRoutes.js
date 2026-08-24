import express from "express"

import protect from "../middlewares/authMiddleware.js"

import {
  createResume,
  getAllResumes,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resumeController.js"

import upload from "../configs/multer.js"

const resumeRouter = express.Router()

/*
  Create
*/
resumeRouter.post(
  "/create",
  protect,
  createResume
)

/*
  Get all resumes belonging to logged-in user
*/
resumeRouter.get(
  "/all",
  protect,
  getAllResumes
)

/*
  Update
*/
resumeRouter.put(
  "/update",
  protect,
  upload.single("image"),
  updateResume
)

/*
  Delete
*/
resumeRouter.delete(
  "/delete/:resumeId",
  protect,
  deleteResume
)

/*
  Get private resume
*/
resumeRouter.get(
  "/get/:resumeId",
  protect,
  getResumeById
)

/*
  Get public resume
*/
resumeRouter.get(
  "/public/:resumeId",
  getPublicResumeById
)

export default resumeRouter