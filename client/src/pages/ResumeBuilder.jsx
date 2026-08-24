import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react"

import PersonalInfoForm from "../components/PersonalInfoForm"
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm"
import ExperienceForm from "../components/ExperienceForm"
import EducationForm from "../components/EducationForm"
import ProjectForm from "../components/ProjectForm"
import SkillsForm from "../components/SkillsForm"
import ResumePreview from "../components/ResumePreview"
import TemplateSelector from "../components/TemplateSelector"
import ColorPicker from "../components/ColorPicker"

import toast from "react-hot-toast"
import api from "../configs/api"

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate()

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {
      image: "",
      full_name: "",
      profession: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#8B5CF6",
    isPublic: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const sections = [
    { id: "personal", icon: User },
    { id: "summary", icon: FileText },
    { id: "experience", icon: Briefcase },
    { id: "education", icon: GraduationCap },
    { id: "projects", icon: FolderIcon },
    { id: "skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  /* ================= LOAD RESUME ================= */

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setIsLoading(true)

        const token = localStorage.getItem("token")

        if (!token) {
          toast.error("Please login again")
          navigate("/")
          return
        }

        const { data } = await api.get(
          `/api/resumes/get/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )

        if (!data.resume) {
          toast.error("Resume not found")
          navigate("/app")
          return
        }

        const resume = data.resume

        setResumeData({
          ...resume,
          isPublic: resume.public || false,
        })

        document.title = resume.title || "Resume Builder"
      } catch (error) {
        console.error("Failed to load resume:", error)

        toast.error(
          error?.response?.data?.message ||
            "Failed to load resume"
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (resumeId) {
      fetchResume()
    }
  }, [resumeId, navigate])

  /* ================= SAVE RESUME ================= */

  const handleSave = async () => {
    if (isSaving) return

    try {
      setIsSaving(true)

      const token = localStorage.getItem("token")

      if (!token) {
        toast.error("Please login again")
        navigate("/")
        return
      }

      /*
        Backend expects:
        resumeId
        resumeData
        image (optional)
        removeBackground
      */

      const formData = new FormData()

      /*
        Create a clean copy of resumeData.

        Backend database field is "public",
        while frontend uses "isPublic".
      */
      const resumeToSave = {
        ...resumeData,
        public: resumeData.isPublic,
      }

      /*
        Remove frontend-only field before sending
        it to MongoDB.
      */
      delete resumeToSave.isPublic

      /*
        If the user selected a new image,
        the image itself must be uploaded separately.

        File objects cannot be correctly stored inside
        JSON.stringify().
      */
      const personalInfo = {
        ...(resumeToSave.personal_info || {}),
      }

      if (personalInfo.image instanceof File) {
        personalInfo.image = ""
      }

      resumeToSave.personal_info = personalInfo

      formData.append(
        "resumeId",
        resumeId
      )

      formData.append(
        "resumeData",
        JSON.stringify(resumeToSave)
      )

      formData.append(
        "removeBackground",
        removeBackground
      )

      /*
        Upload image only if the user selected
        a new local image file.
      */
      if (
        resumeData.personal_info?.image instanceof File
      ) {
        formData.append(
          "image",
          resumeData.personal_info.image
        )
      }

      const { data } = await api.put(
        "/api/resumes/update",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      )

      if (!data.resume) {
        throw new Error("Resume was not returned by server")
      }

      /*
        Convert backend "public" field back to
        frontend "isPublic".
      */
      const savedResume = {
        ...data.resume,
        isPublic: data.resume.public || false,
      }

      setResumeData(savedResume)

      toast.success("Saved successfully")

      /*
        Move to the next section automatically.
      */
      if (activeSectionIndex < sections.length - 1) {
        setActiveSectionIndex(
          (index) => index + 1
        )
      } else {
        /*
          If Skills is the final section,
          return to Dashboard.
        */
        navigate("/app")
      }
    } catch (error) {
      console.error("Save error:", error)

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save resume"
      )
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DOWNLOAD ================= */

  const handleDownload = () => {
    window.print()
  }

  /* ================= SHARE ================= */

  const handleShare = async () => {
    const url = `${window.location.origin}/view/${resumeId}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: resumeData.title,
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard")
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error)
    }
  }

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-slate-600">
            Loading your resume...
          </p>
        </div>
      </div>
    )
  }

  /* ================= MAIN UI ================= */

  return (
    <div>
      {/* HEADER */}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon size={16} />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* ================= LEFT PANEL ================= */}

          <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border relative">

            {/* PROGRESS LINE */}

            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-purple-600 transition-all"
                style={{
                  width: `${
                    (activeSectionIndex /
                      (sections.length - 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="p-6 pt-6">

              {/* TOP CONTROLS */}

              <div className="flex items-center justify-between border-b pb-3 mb-6">

                <div className="flex gap-2">

                  <TemplateSelector
                    selectedTemplate={
                      resumeData.template
                    }
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template,
                      }))
                    }
                  />

                  <ColorPicker
                    selectedColor={
                      resumeData.accent_color
                    }
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />

                </div>

                {/* SECTION NAVIGATION */}

                <div className="flex gap-2">

                  {activeSectionIndex > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSectionIndex(
                          (index) => index - 1
                        )
                      }
                      className="p-2 rounded hover:bg-slate-100"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={
                      activeSectionIndex ===
                      sections.length - 1
                    }
                    onClick={() =>
                      setActiveSectionIndex(
                        (index) => index + 1
                      )
                    }
                    className="p-2 rounded hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>

                </div>
              </div>

              {/* ================= PERSONAL INFO ================= */}

              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={
                    resumeData.personal_info
                  }
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info: data,
                    }))
                  }
                  removeBackground={
                    removeBackground
                  }
                  setRemoveBackground={
                    setRemoveBackground
                  }
                />
              )}

              {/* ================= SUMMARY ================= */}

              {activeSection.id === "summary" && (
                <ProfessionalSummaryForm
                  data={
                    resumeData.professional_summary
                  }
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      professional_summary:
                        data,
                    }))
                  }
                />
              )}

              {/* ================= EXPERIENCE ================= */}

              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      experience: data,
                    }))
                  }
                />
              )}

              {/* ================= EDUCATION ================= */}

              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      education: data,
                    }))
                  }
                />
              )}

              {/* ================= PROJECTS ================= */}

              {activeSection.id === "projects" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      project: data,
                    }))
                  }
                />
              )}

              {/* ================= SKILLS ================= */}

              {activeSection.id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) =>
                    setResumeData((prev) => ({
                      ...prev,
                      skills: data,
                    }))
                  }
                />
              )}

              {/* ================= SAVE BUTTON ================= */}

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="mt-6 px-6 py-2 rounded-md bg-purple-100 text-purple-600 ring-1 ring-purple-300 hover:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving
                  ? "Saving..."
                  : activeSectionIndex ===
                    sections.length - 1
                  ? "Save & Finish"
                  : "Save Changes"}
              </button>

            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}

          <div className="lg:col-span-7 relative">

            {/* TOP RIGHT BUTTONS */}

            <div className="flex justify-end gap-2 mb-3">

              {/* SHARE */}

              {resumeData.isPublic && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-xs bg-blue-100 text-blue-600 rounded-lg ring-1 ring-blue-300"
                >
                  <Share2Icon size={14} />
                  Share
                </button>
              )}

              {/* PUBLIC / PRIVATE */}

              <button
                type="button"
                onClick={() =>
                  setResumeData((prev) => ({
                    ...prev,
                    isPublic: !prev.isPublic,
                  }))
                }
                className="flex items-center gap-2 px-4 py-2 text-xs bg-purple-100 text-purple-600 rounded-lg ring-1 ring-purple-300"
              >
                {resumeData.isPublic ? (
                  <EyeIcon size={14} />
                ) : (
                  <EyeOffIcon size={14} />
                )}

                {resumeData.isPublic
                  ? "Public"
                  : "Private"}
              </button>

              {/* DOWNLOAD */}

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-xs bg-green-100 text-green-600 rounded-lg ring-1 ring-green-300"
              >
                <DownloadIcon size={14} />
                Download
              </button>

            </div>

            {/* RESUME PREVIEW */}

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={
                resumeData.accent_color
              }
            />

          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder