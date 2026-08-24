import React from "react"
import ClassicTemplate from "./templates/ClassicTemplate"
import MinimalTemplate from "./templates/MinimalTemplate"
import ModernTemplate from "./templates/ModernTemplate"
import MinimalImageTemplate from "./templates/MinimalImageTemplate"

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full bg-gray-100">
      <div
        id="resume-preview"
        className={
          "bg-white border border-gray-200 print:border-none " + classes
        }
      >
        {renderTemplate()}
      </div>

      {/* PRINT STYLES */}
       <style>
        {`
          @page {
            size: A4;
            margin: 0;
          }

          @media print {
            html,
            body {
              margin: 0 !important;
              padding: 0 !important;
              width: 210mm !important;
              background: white !important;
            }

            body * {
              visibility: hidden !important;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible !important;
            }

            #resume-preview {
              position: static !important;
              display: block !important;
              width: 210mm !important;
              margin: 0 !important;
              padding: 0 !important;
              border: none !important;
              box-shadow: none !important;
              background: white !important;
            }
          }
        `}
      </style>
    </div>
  )
}
   


export default ResumePreview
