# 🚀 AI-Powered Resume Builder

<p align="center">
<b>Build professional, ATS-friendly resumes with the power of AI.</b>
</p>

<p align="center">
A full-stack web application that helps users create, customize, enhance, preview, and share professional resumes.
</p>

<p align="center">
🌐 <a href="https://resume-builder-ashen-omega.vercel.app/"><b>Live Demo</b></a>
&nbsp;&nbsp;•&nbsp;&nbsp;
💻 <a href="https://github.com/MounikaChelamsetti/resume-builder"><b>Source Code</b></a>
</p>

---

## ✨ Project Overview

Creating a professional resume from scratch can be challenging. Users often spend a lot of time deciding what to write, how to structure their information, and how to make their resume visually professional.

**AI-Powered Resume Builder** provides a complete solution by combining a modern resume editor with AI-assisted content enhancement.

Users can create a resume, choose a template, customize its appearance, improve their content using AI, upload profile images, preview the final result, and share their resume online.

---

## 🎯 What Can You Do With It?

| Feature | Description |
| --- | --- |
| 👤 **User Authentication** | Create an account and securely manage personal resumes |
| 📝 **Resume Creation** | Build resumes with personal, education, experience, projects, and skills |
| 🤖 **AI Enhancement** | Improve resume content using Google Gemini AI |
| 🎨 **Multiple Templates** | Choose between different professional resume layouts |
| 🌈 **Custom Colors** | Personalize the resume using accent colors |
| 📄 **Resume Parsing** | Upload an existing resume and extract information |
| 🖼️ **Profile Images** | Upload and manage profile images using ImageKit |
| 👀 **Live Preview** | Preview the resume while editing |
| 📥 **Resume Download** | Generate and download the completed resume |
| 🔗 **Public Sharing** | Share resumes through a public link |
| 📱 **Responsive UI** | Designed to work across desktop, tablet, and mobile |

---

## ⭐ Key Features

### 🔐 Secure Authentication

Users can register and log in securely.

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific resume access

---

### 📝 Professional Resume Creation

Users can create a complete resume by adding:

- 👤 Personal information
- 📌 Professional summary
- 💼 Work experience
- 🎓 Education
- 🚀 Projects
- 🛠️ Skills

All resume information is stored and associated with the authenticated user.

---

### 🤖 AI-Powered Resume Assistance

The application integrates **Google Gemini AI** to help users improve their resume content.

Instead of manually rewriting every section, users can provide basic content and receive more polished, concise, and professional wording.

**AI assistance can be used for:**

- Professional summary enhancement
- Resume content improvement
- Professional wording
- ATS-friendly content

---

### 🎨 Multiple Resume Templates

Users can choose from different designs depending on their preferred style.

| Template | Style |
| --- | --- |
| 📄 Classic | Traditional professional layout |
| ✨ Modern | Modern design with visual accents |
| 🖊️ Minimal | Clean and content-focused |
| 🖼️ Minimal Image | Minimal design with profile image |

Users can switch between templates without losing their resume information.

---

### 🌈 Resume Customization

Users can personalize the appearance of their resume using an accent-color picker.

This allows the same resume content to be presented in different visual styles while keeping the information unchanged.

---

### 🔗 Public Resume Sharing

Users can generate a public resume and share it through a link.

This can be useful when applying for:

- 💼 Jobs
- 🏢 Internships
- 🎓 Opportunities
- 👨‍💼 Recruiter reviews

---

## 🖥️ Application Highlights

```text
┌────────────────────────────────────────────────────┐
│ AI RESUME BUILDER │
├────────────────────────────────────────────────────┤
│ │
│ 👤 Create Account │
│ ↓ │
│ 📝 Build Your Resume │
│ ↓ │
│ 🤖 Enhance Content with AI │
│ ↓ │
│ 🎨 Choose Your Template │
│ ↓ │
│ 🌈 Customize Your Resume │
│ ↓ │
│ 👀 Preview & Edit │
│ ↓ │
│ 📥 Download / 🔗 Share │
│ │
└────────────────────────────────────────────────────┘

---

## 🏗️ System Architecture

This project follows a **full-stack client-server architecture**.

The React frontend communicates with the Node.js and Express backend through REST APIs. The backend handles authentication, resume data, AI processing, database operations, and image management.

```text
👤 USER
│
▼
┌─────────────────────┐
│ React + Vite │
│ Frontend │
└──────────┬──────────┘
│
REST API
│
▼
┌─────────────────────┐
│ Node.js + Express │
│ Backend │
└───────┬─┬─┬─────────┘
│ │ │
┌──────────┘ │ └──────────┐
▼ ▼ ▼
┌────────────┐ ┌───────────┐ ┌────────────┐
│ MongoDB │ │ Gemini AI │ │ ImageKit │
│ Database │ │ AI │ │ Images │
└────────────┘ └───────────┘ └────────────┘
---
## 🔄 How the Application Works

The application follows this overall workflow:

```text
👤 User
│
▼
🔐 Login / Register
│
▼
📝 Create Resume
│
├── 👤 Personal Information
├── 💼 Experience
├── 🎓 Education
├── 🚀 Projects
└── 🛠️ Skills
│
▼
🤖 Enhance Content with AI
│
▼
🎨 Select Resume Template
│
▼
🌈 Customize Resume
│
▼
👀 Preview Resume
│
├── 📥 Download
│
└── 🔗 Share
```

---

## ⚛️ Frontend Architecture

The frontend is built using **React and Vite**.

It is organized into reusable components, pages, templates, and application state.

```text
client/
│
├── src/
│ │
│ ├── app/
│ │ ├── store.js
│ │ └── features/
│ │ └── authSlice.js
│ │
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Loader.jsx
│ │ ├── ColorPicker.jsx
│ │ ├── ResumePreview.jsx
│ │ ├── PersonalInfoForm.jsx
│ │ ├── ProfessionalSummaryForm.jsx
│ │ ├── ExperienceForm.jsx
│ │ ├── EducationForm.jsx
│ │ ├── ProjectForm.jsx
│ │ ├── SkillsForm.jsx
│ │ └── TemplateSelector.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Dashboard.jsx
│ │ ├── ResumeBuilder.jsx
│ │ ├── Preview.jsx
│ │ └── Layout.jsx
│ │
│ ├── assets/
│ │ └── templates/
│ │
│ ├── configs/
│ │ └── api.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
└── package.json
```

### Frontend Responsibilities

- 🖥️ User interface
- 📝 Resume forms
- 👀 Resume preview
- 🎨 Template selection
- 🌈 Accent color selection
- 🔐 Authentication state
- 🔄 API communication
- 📱 Responsive user experience

---

## 🟢 Backend Architecture

The backend is built using **Node.js and Express.js**.

The backend follows a modular structure with separate routes, controllers, models, middleware, and configuration files.

```text
server/
│
├── configs/
│ ├── ai.js
│ ├── db.js
│ ├── imageKit.js
│ └── multer.js
│
├── controllers/
│ ├── UserController.js
│ ├── resumeController.js
│ └── aiController.js
│
├── middlewares/
│ └── authMiddleware.js
│
├── models/
│ ├── User.js
│ └── Resume.js
│
├── routes/
│ ├── userRoutes.js
│ ├── resumeRoutes.js
│ └── aiRoutes.js
│
├── server.js
└── package.json
```

### Backend Responsibilities

- 🔐 Authentication
- 👤 User management
- 📄 Resume CRUD operations
- 🤖 AI requests
- 🖼️ Image uploads
- 🍃 MongoDB operations
- 🔗 Public resume access
- 🛡️ Protected API routes

---

## 🔐 Authentication Flow

Authentication is implemented using **JWT-based authentication**.

```text
👤 User
│
▼
Register / Login
│
▼
Express Backend
│
▼
Validate Credentials
│
▼
Password Verification
│
▼
JWT Token Generated
│
▼
React Frontend
│
▼
Protected API Requests
│
▼
JWT Verification
│
▼
✅ Authorized User
```

### Authentication Process

1. The user registers or logs in.
2. The backend validates the credentials.
3. Passwords are securely hashed using bcrypt.
4. A JWT token is generated after successful authentication.
5. The frontend uses the token for authenticated requests.
6. Backend middleware verifies the token before accessing protected resources.

---

## 📝 Resume Creation Flow

Users create their resume through the React-based resume builder.

```text
👤 User
│
▼
Resume Builder
│
├── Personal Information
├── Professional Summary
├── Experience
├── Education
├── Projects
└── Skills
│
▼
Resume Data
│
▼
REST API
│
▼
Express Backend
│
▼
MongoDB
│
▼
💾 Saved Resume
```

The saved resume can later be retrieved, edited, previewed, downloaded, or shared.

---

## 🤖 AI Integration Flow

Google Gemini AI is integrated through the backend.

The AI API credentials are kept on the server rather than being exposed directly in the frontend.

```text
👤 User
│
▼
Enter Resume Content
│
▼
React Frontend
│
▼
AI API Request
│
▼
Express Backend
│
▼
Google Gemini AI
│
▼
Enhanced Content
│
▼
Express Backend
│
▼
React Frontend
│
▼
✨ Improved Resume Content
```

### Why use the backend for AI?

The backend acts as a secure layer between the frontend and Gemini API.

This helps keep sensitive API credentials out of the browser.

---

## 🎨 Resume Template Architecture

Resume data is separated from the visual design.

This allows the same resume information to be displayed using different templates.

```text
📄 Resume Data
│
┌────────────┼────────────┐
│ │ │
▼ ▼ ▼
Classic Modern Minimal
Template Template Template
│ │ │
└────────────┼────────────┘
│
▼
👀 Resume Preview
```

### Available Templates

- 📄 Classic Template
- ✨ Modern Template
- 🖊️ Minimal Template
- 🖼️ Minimal Image Template

Users can switch templates without recreating their resume.

---

## 🖼️ Image Upload Flow

Profile images are handled using **ImageKit**.

```text
👤 User
│
▼
Select Profile Image
│
▼
React Frontend
│
▼
Backend
│
▼
ImageKit
│
▼
Image URL
│
▼
Resume Data
```

This allows image files to be stored and delivered separately from the main application server.

---

## 🔗 Public Resume Sharing Flow

Users can choose whether their resume should be public or private.

When a resume is public, it can be accessed through a shareable link.

```text
👤 User
│
▼
Resume Dashboard
│
▼
Public / Private
│
▼
🔗 Public Resume Link
│
▼
👥 Recruiter / Viewer
│
▼
📄 Resume Preview
```

---

## 🔌 REST API Architecture

The backend APIs are divided according to functionality.

```text
🟢 Express Server
│
┌─────────────┼─────────────┐
│ │ │
▼ ▼ ▼
/api/users /api/resumes /api/ai
│ │ │
▼ ▼ ▼
User APIs Resume APIs AI APIs
```

### 👤 User Routes

`/api/users`

Responsible for user registration, login, and authentication-related operations.

### 📄 Resume Routes

`/api/resumes`

Responsible for resume creation, retrieval, updating, deletion, and sharing functionality.

### 🤖 AI Routes

`/api/ai`

Responsible for AI-powered resume enhancement and resume parsing functionality.

---

## 🌐 Frontend ↔ Backend Communication

The frontend and backend are maintained as separate applications inside the same GitHub repository.

```text
┌───────────────────────────┐
│ ⚛️ CLIENT │
│ │
│ React + Vite │
│ │
│ Forms │
│ Templates │
│ Resume Preview │
│ Authentication │
└─────────────┬─────────────┘
│
│ REST API
▼
┌───────────────────────────┐
│ 🟢 SERVER │
│ │
│ Node.js + Express │
│ │
│ Routes │
│ Controllers │
│ Authentication │
│ AI Integration │
└─────────────┬─────────────┘
│
┌──────┼──────┐
▼ ▼ ▼
MongoDB Gemini ImageKit
```

Keeping the frontend and backend separate makes the application easier to develop, maintain, test, and deploy.

---

## ☁️ Production Deployment Architecture

The frontend and backend are deployed separately.

```text
🐙 GitHub
│
┌─────────┴─────────┐
│ │
▼ ▼
▲ Vercel ☁️ Render
Frontend Backend
│ │
│ ┌────────┼────────┐
│ │ │ │
│ ▼ ▼ ▼
│ MongoDB Gemini ImageKit
│
└──────── REST API ──────────┘
```

### Production Services

| Layer | Technology | Purpose |
|---|---|---|
| 🎨 Frontend | Vercel | Hosts the React application |
| 🟢 Backend | Render | Runs the Express API |
| 🍃 Database | MongoDB | Stores users and resumes |
| 🤖 AI | Google Gemini | Enhances resume content |
| 🖼️ Images | ImageKit | Stores profile images |
| 🐙 Source Control | GitHub | Version control and code hosting |

---

## 📁 Complete Repository Structure

```text
resume-builder/
│
├── 📁 client/
│ ├── 📁 public/
│ ├── 📁 src/
│ │ ├── 📁 app/
│ │ ├── 📁 assets/
│ │ ├── 📁 components/
│ │ ├── 📁 pages/
│ │ ├── 📄 App.jsx
│ │ ├── 📄 index.css
│ │ └── 📄 main.jsx
│ │
│ ├── 📄 index.html
│ ├── 📄 package.json
│ └── 📄 vite.config.js
│
├── 📁 server/
│ ├── 📁 configs/
│ ├── 📁 controllers/
│ ├── 📁 middlewares/
│ ├── 📁 models/
│ ├── 📁 routes/
│ ├── 📄 server.js
│ └── 📄 package.json
│
├── 📄 .gitignore
└── 📄 README.md
```

---

## 🧭 Architecture at a Glance

```text
🚀 RESUME BUILDER
│
▼
⚛️ React Frontend
│
REST APIs
│
▼
🟢 Express Backend
│
┌─────────────────┼─────────────────┐
│ │ │
▼ ▼ ▼
🍃 MongoDB 🤖 Gemini AI 🖼️ ImageKit
│ │ │
└─────────────────┼─────────────────┘
│
▼
📄 Resume System
│
┌──────────┴──────────┐
▼ ▼
📥 Download 🔗 Share
```

---
