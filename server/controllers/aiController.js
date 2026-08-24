import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

/* =====================================================
   HELPER — GET AI TEXT
===================================================== */
const generateText = async (contents) => {
  const response = await ai.models.generateContent({
    model: process.env.OPENAI_MODEL,
    contents,
  });

  return response.text;
};

/* =====================================================
   ENHANCE PROFESSIONAL SUMMARY
   POST: /api/ai/enhance-pro-sum
===================================================== */
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const enhancedContent = await generateText([
      {
        role: "user",
        parts: [
          {
            text: `You are a resume expert.

Rewrite the following professional summary into 1–2 ATS-friendly sentences.

Return ONLY the rewritten text.
Do not add explanations, headings, or quotation marks.

Professional summary:
${userContent}`,
          },
        ],
      },
    ]);

    return res.status(200).json({
      enhancedContent: enhancedContent.trim(),
    });
  } catch (error) {
    console.error("ENHANCE SUMMARY ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

/* =====================================================
   ENHANCE JOB DESCRIPTION
   POST: /api/ai/enhance-job-desc
===================================================== */
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const enhancedContent = await generateText([
      {
        role: "user",
        parts: [
          {
            text: `You are a professional resume writer.

Enhance the following job description into 1–2 concise ATS-friendly sentences.

Use strong action verbs and include quantified results when they are already present.
Do not invent facts or numbers.

Return ONLY the rewritten text.
Do not add explanations, headings, or quotation marks.

Job description:
${userContent}`,
          },
        ],
      },
    ]);

    return res.status(200).json({
      enhancedContent: enhancedContent.trim(),
    });
  } catch (error) {
    console.error("ENHANCE JOB DESCRIPTION ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

/* =====================================================
   UPLOAD RESUME
   PDF TEXT → AI → JSON → MONGODB
   POST: /api/ai/upload-resume
===================================================== */
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const systemPrompt = `
You are an expert resume parser.

Extract information from the resume text and return ONLY valid JSON.

Do not include markdown.
Do not include code fences.
Do not include explanations before or after the JSON.

Use this EXACT JSON structure:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}

IMPORTANT:
- Extract only information actually present in the resume.
- If information is missing, use an empty string.
- If there are no items in a section, use an empty array.
- Do not invent companies, dates, skills, education, projects, phone numbers, emails, or achievements.
- Keep descriptions concise but preserve the important information.
- "skills" must be an array of strings.
- "is_current" must be true or false.
`;

    const prompt = `${systemPrompt}

RESUME TEXT:
${resumeText}`;

    const extractedData = await generateText(prompt);

    /*
      Gemini may occasionally return markdown code fences.
      Remove them before JSON.parse().
    */
    let cleanedData = extractedData.trim();

    if (cleanedData.startsWith("```json")) {
      cleanedData = cleanedData
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
    } else if (cleanedData.startsWith("```")) {
      cleanedData = cleanedData
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
    }

    let parsedData;

    try {
      parsedData = JSON.parse(cleanedData);
    } catch (jsonError) {
      console.error("AI RETURNED INVALID JSON:");
      console.error(cleanedData);

      return res.status(400).json({
        message: "AI could not properly parse the resume.",
      });
    }

    /*
      Make sure all expected fields exist.
      This prevents MongoDB/model errors if Gemini omits
      an empty section.
    */
    parsedData.personal_info = {
      image: "",
      full_name: "",
      profession: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      ...(parsedData.personal_info || {}),
    };

    parsedData.professional_summary =
      parsedData.professional_summary || "";

    parsedData.skills = Array.isArray(parsedData.skills)
      ? parsedData.skills
      : [];

    parsedData.experience = Array.isArray(parsedData.experience)
      ? parsedData.experience
      : [];

    parsedData.project = Array.isArray(parsedData.project)
      ? parsedData.project
      : [];

    parsedData.education = Array.isArray(parsedData.education)
      ? parsedData.education
      : [];

    /*
      Save the extracted resume into MongoDB.
    */
    const newResume = await Resume.create({
      userId,
      title: title || "Uploaded Resume",
      ...parsedData,
    });

    console.log("RESUME UPLOADED SUCCESSFULLY:", newResume._id);

    return res.status(201).json({
      message: "Resume uploaded and analyzed successfully",
      resumeId: newResume._id,
    });
  } catch (error) {
    console.error("UPLOAD RESUME ERROR:");
    console.error(error);

    return res.status(400).json({
      message: error.message || "Failed to upload resume",
    });
  }
};