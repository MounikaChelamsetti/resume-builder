import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-purple-200/60 to-white mt-40">

        {/* Left section */}
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <a href="/">
            <img src="/logo.png" alt="logo" className="h-11 w-auto" />
          </a>

          <div>
            <p className="text-slate-800 font-semibold">Product</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:text-purple-600 transition">Home</a></li>
              <li><a href="/" className="hover:text-purple-600 transition">Support</a></li>
              <li><a href="/" className="hover:text-purple-600 transition">Pricing</a></li>
              <li><a href="/" className="hover:text-purple-600 transition">Affiliate</a></li>
            </ul>
          </div>

          <div>
            <p className="text-slate-800 font-semibold">Resources</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:text-purple-600 transition">Company</a></li>
              <li><a href="/" className="hover:text-purple-600 transition">Blogs</a></li>
              <li><a href="/" className="hover:text-purple-600 transition">Community</a></li>
              <li>
                <a href="/" className="hover:text-purple-600 transition">
                  Careers
                  <span className="text-xs text-white bg-purple-600 rounded-md ml-2 px-2 py-1">
                    We’re hiring!
                  </span>
                </a>
              </li>
              <li><a href="/" className="hover:text-purple-600 transition">About</a></li>
            </ul>
          </div>

          <div>
            <p className="text-slate-800 font-semibold">Legal</p>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:text-purple-600 transition">Privacy</a></li>
              <li><a href="/" className="hover:text-purple-600 transition">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-60">
            Making every customer feel valued—no matter the size of your audience.
          </p>

          {/* SOCIAL ICONS (ONLY LINKEDIN + GITHUB) */}
          <div className="flex items-center gap-4 mt-3">

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mounika-chelamsetti-953abb2b8/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-linkedin size-5 hover:text-purple-500">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/MounikaChelamsetti"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-github size-5 hover:text-purple-500">
                <path d="M15 22v-4a4 4 0 0 0-1-3.5c3 0 6-2 6-5.5a4.6 4.6 0 0 0-1.3-3.2A4.2 4.2 0 0 0 18 1s-1 0-3 1.3a11.5 11.5 0 0 0-6 0C7 1 6 1 6 1a4.2 4.2 0 0 0-.7 3.3A4.6 4.6 0 0 0 4 7.5c0 3.5 3 5.5 6 5.5A4 4 0 0 0 9 19v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

          </div>

          <p className="mt-3 text-center">© 2025 Resume Builder</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
