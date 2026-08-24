import imagekit from "../configs/imageKit.js"
import Resume from "../models/Resume.js"
import fs from "fs"

/* =====================================================
   CREATE RESUME
   POST: /api/resumes/create
===================================================== */

export const createResume = async (req, res) => {
  try {
    const userId = req.userId
    const { title } = req.body

    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
    })

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}

/* =====================================================
   GET ALL USER RESUMES
   GET: /api/resumes/all
===================================================== */

export const getAllResumes = async (req, res) => {
  try {
    const userId = req.userId

    const resumes = await Resume.find({
      userId,
    }).sort({
      updatedAt: -1,
    })

    return res.status(200).json({
      resumes,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}

/* =====================================================
   DELETE RESUME
   DELETE: /api/resumes/delete/:resumeId
===================================================== */

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId
    const { resumeId } = req.params

    const deletedResume =
      await Resume.findOneAndDelete({
        userId,
        _id: resumeId,
      })

    if (!deletedResume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}

/* =====================================================
   GET PRIVATE RESUME
   GET: /api/resumes/get/:resumeId
===================================================== */

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId
    const { resumeId } = req.params

    const resume = await Resume.findOne({
      userId,
      _id: resumeId,
    })

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    return res.status(200).json({
      resume,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}

/* =====================================================
   GET PUBLIC RESUME
   GET: /api/resumes/public/:resumeId
===================================================== */

export const getPublicResumeById = async (
  req,
  res
) => {
  try {
    const { resumeId } = req.params

    const resume = await Resume.findOne({
      public: true,
      _id: resumeId,
    })

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    return res.status(200).json({
      resume,
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    })
  }
}

/* =====================================================
   UPDATE RESUME
   PUT: /api/resumes/update
===================================================== */

export const updateResume = async (req, res) => {
  let uploadedFilePath = null

  try {
    const userId = req.userId
    const {
      resumeId,
      resumeData,
      removeBackground,
    } = req.body

    const image = req.file

    if (!resumeId || !resumeData) {
      return res.status(400).json({
        message:
          "Resume ID and resume data are required",
      })
    }

    const resumeDataCopy =
      JSON.parse(resumeData)

    /*
      Keep public field consistent with MongoDB schema.
    */

    if (
      typeof resumeDataCopy.public ===
      "undefined"
    ) {
      resumeDataCopy.public = false
    }

    /*
      Upload profile image if a new image was selected.
    */

    if (image) {
      uploadedFilePath = image.path

      const imageBufferData =
        fs.createReadStream(image.path)

      const response =
        await imagekit.files.upload({
          file: imageBufferData,
          fileName: `resume-${resumeId}.png`,
          folder: "user-resumes",
          transformation: {
            pre:
              "w-300,h-300,f0-face,z-0.75" +
              (removeBackground === "true"
                ? ",e-bgremove"
                : ""),
          },
        })

      if (!resumeDataCopy.personal_info) {
        resumeDataCopy.personal_info = {}
      }

      resumeDataCopy.personal_info.image =
        response.url
    }

    const resume =
      await Resume.findOneAndUpdate(
        {
          _id: resumeId,
          userId,
        },
        resumeDataCopy,
        {
          new: true,
          runValidators: true,
        }
      )

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      })
    }

    return res.status(200).json({
      message: "Saved successfully",
      resume,
    })
  } catch (error) {
    console.error("Update resume error:", error)

    return res.status(400).json({
      message: error.message,
    })
  } finally {
    /*
      Multer temporarily stores uploaded images
      on the server. Remove them after processing.
    */

    if (
      uploadedFilePath &&
      fs.existsSync(uploadedFilePath)
    ) {
      try {
        fs.unlinkSync(uploadedFilePath)
      } catch (error) {
        console.error(
          "Failed to remove temporary image:",
          error
        )
      }
    }
  }
}