import React, { useEffect, useState } from "react"
import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLineIcon,
  TrashIcon,
  XIcon,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import pdfToText from "react-pdftotext"

import api from "../configs/api"

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth)

  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
  ]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] =
    useState(false)
  const [showUploadResume, setShowUploadResume] =
    useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false)

  const [title, setTitle] = useState("")
  const [uploadTitle, setUploadTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const [deletingResume, setDeletingResume] =
    useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)

  const navigate = useNavigate()

  /* =====================================================
     LOAD USER RESUMES
  ===================================================== */

  const fetchResumes = async () => {
    try {
      setIsLoading(true)

      if (!token) {
        toast.error("Please login again")
        return
      }

      const { data } = await api.get(
        "/api/resumes/all",
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setAllResumes(data.resumes || [])
    } catch (error) {
      console.error("Fetch resumes error:", error)

      toast.error(
        error?.response?.data?.message ||
          "Failed to load resumes"
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [token])

  /* =====================================================
     CREATE RESUME
  ===================================================== */

  const createResume = async (e) => {
    e.preventDefault()

    try {
      if (!title.trim()) {
        toast.error("Please enter a resume title")
        return
      }

      const { data } = await api.post(
        "/api/resumes/create",
        {
          title: title.trim(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setTitle("")
      setShowCreateResume(false)

      toast.success(
        "Resume created successfully"
      )

      navigate(
        `/app/builder/${data.resume._id}`
      )
    } catch (error) {
      console.error("Create resume error:", error)

      toast.error(
        error?.response?.data?.message ||
          "Failed to create resume"
      )
    }
  }

  /* =====================================================
     UPLOAD PDF RESUME
  ===================================================== */

  const uploadResume = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      toast.error("Please select a PDF resume")
      return
    }

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file")
      return
    }

    if (!uploadTitle.trim()) {
      toast.error("Please enter a resume title")
      return
    }

    try {
      setIsUploading(true)

      toast.loading(
        "Reading your resume...",
        { id: "resume-upload" }
      )

      /*
        Convert PDF into plain text in the browser.
      */
      const resumeText = await pdfToText(
        selectedFile
      )

      if (!resumeText || !resumeText.trim()) {
        toast.error(
          "Could not extract text from this PDF",
          { id: "resume-upload" }
        )
        return
      }

      toast.loading(
        "AI is analyzing your resume...",
        { id: "resume-upload" }
      )

      /*
        Send extracted text to backend AI.
      */
      const { data } = await api.post(
        "/api/ai/upload-resume",
        {
          resumeText,
          title: uploadTitle.trim(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      toast.success(
        "Resume uploaded successfully",
        { id: "resume-upload" }
      )

      setSelectedFile(null)
      setUploadTitle("")
      setShowUploadResume(false)

      /*
        Open the newly created AI resume.
      */
      if (data.resumeId) {
        navigate(
          `/app/builder/${data.resumeId}`
        )
      } else {
        await fetchResumes()
      }
    } catch (error) {
      console.error(
        "Upload resume error:",
        error
      )

      toast.error(
        error?.response?.data?.message ||
          "Failed to upload resume",
        { id: "resume-upload" }
      )
    } finally {
      setIsUploading(false)
    }
  }

  /* =====================================================
     DELETE RESUME
  ===================================================== */

  const confirmDeleteResume = async () => {
    if (!deletingResume) return

    try {
      await api.delete(
        `/api/resumes/delete/${deletingResume._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setAllResumes((prev) =>
        prev.filter(
          (resume) =>
            resume._id !== deletingResume._id
        )
      )

      setDeletingResume(null)
      setShowDeleteConfirm(false)

      toast.success(
        "Resume deleted successfully"
      )
    } catch (error) {
      console.error(
        "Delete resume error:",
        error
      )

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete resume"
      )
    }
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ACTION BUTTONS */}

      <div className="flex gap-4 flex-wrap">

        {/* CREATE */}

        <button
          onClick={() =>
            setShowCreateResume(true)
          }
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition"
        >
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />

          <p className="font-medium text-slate-600">
            Create New
          </p>
        </button>

        {/* UPLOAD */}

        <button
          onClick={() =>
            setShowUploadResume(true)
          }
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition"
        >
          <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />

          <p className="font-medium text-slate-600">
            Upload
          </p>
        </button>
      </div>

      <hr className="border-slate-300 my-8 sm:w-[305px]" />

      {/* RESUME CARDS */}

      {isLoading ? (
        <div className="text-slate-500">
          Loading your resumes...
        </div>
      ) : allResumes.length === 0 ? (
        <div className="text-slate-500">
          You don't have any resumes yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">

          {allResumes.map((resume, i) => {
            const baseColor =
              colors[i % colors.length]

            return (
              <div
                key={resume._id}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border group hover:shadow-lg transition"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}25)`,
                  borderColor: `${baseColor}40`,
                }}
              >

                <button
                  onClick={() =>
                    navigate(
                      `/app/builder/${resume._id}`
                    )
                  }
                  className="flex flex-col items-center gap-2"
                >
                  <FilePenLineIcon
                    className="size-7"
                    style={{
                      color: baseColor,
                    }}
                  />

                  <p className="text-sm font-medium text-center px-2 text-slate-700">
                    {resume.title}
                  </p>
                </button>

                <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">

                  <TrashIcon
                    className="size-7 p-1.5 rounded hover:bg-white/60 text-red-600 cursor-pointer"
                    onClick={() => {
                      setDeletingResume(
                        resume
                      )

                      setShowDeleteConfirm(
                        true
                      )
                    }}
                  />

                </div>
              </div>
            )
          })}

        </div>
      )}

      {/* =====================================================
          CREATE MODAL
      ===================================================== */}

      {showCreateResume && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <form
            onSubmit={createResume}
            className="bg-white p-6 rounded-xl w-full max-w-sm relative shadow-2xl"
          >

            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Create Resume
            </h2>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full mb-4 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g. Software Engineer Resume"
              required
              autoFocus
            />

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowCreateResume(false)
                }
                className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Create
              </button>

            </div>

            <XIcon
              className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() =>
                setShowCreateResume(false)
              }
            />

          </form>
        </div>
      )}

      {/* =====================================================
          UPLOAD MODAL
      ===================================================== */}

      {showUploadResume && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <form
            onSubmit={uploadResume}
            className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-2xl"
          >

            <h2 className="text-xl font-bold mb-2 text-slate-800">
              Upload Resume
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Upload your existing PDF resume and AI
              will extract the information for you.
            </p>

            {/* TITLE */}

            <label className="block text-sm font-medium text-slate-600 mb-1">
              Resume Title
            </label>

            <input
              value={uploadTitle}
              onChange={(e) =>
                setUploadTitle(e.target.value)
              }
              className="w-full mb-4 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="e.g. My Software Resume"
              required
            />

            {/* FILE */}

            <label className="block text-sm font-medium text-slate-600 mb-1">
              PDF Resume
            </label>

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files?.[0] || null
                )
              }
              className="w-full mb-5 border border-slate-200 rounded-lg p-2 text-sm"
              required
            />

            {selectedFile && (
              <p className="text-xs text-green-600 mb-4">
                Selected: {selectedFile.name}
              </p>
            )}

            <div className="flex gap-3">

              <button
                type="button"
                disabled={isUploading}
                onClick={() => {
                  setShowUploadResume(false)
                  setSelectedFile(null)
                  setUploadTitle("")
                }}
                className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUploading}
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
              >
                {isUploading
                  ? "Processing..."
                  : "Upload & Analyze"}
              </button>

            </div>

            <XIcon
              className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600"
              onClick={() => {
                if (!isUploading) {
                  setShowUploadResume(false)
                  setSelectedFile(null)
                  setUploadTitle("")
                }
              }}
            />

          </form>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center shadow-2xl">

            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="size-6" />
            </div>

            <h2 className="text-lg font-bold mb-2 text-slate-800">
              Delete Resume?
            </h2>

            <p className="text-slate-500 text-sm mb-6">
              This action cannot be undone. You will
              lose all data in "
              {deletingResume?.title}".
            </p>

            <div className="flex justify-center gap-3">

              <button
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteResume}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard