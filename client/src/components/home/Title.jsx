import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className="mt-6 max-w-3xl text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
        {title}
      </h2>

      <p className="mt-4 text-base md:text-lg text-slate-600">
        {description}
      </p>
    </div>
  )
}

export default Title
