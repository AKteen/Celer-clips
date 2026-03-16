"use client"

import { Download, Upload, Cpu, Cloud, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Submit Video URL",
    description: "Paste a downloadable video URL from Dropbox, Drive, S3, or any direct link",
    color: "cyan"
  },
  {
    icon: Download,
    title: "Download & Process",
    description: "Video is downloaded and processed asynchronously in the background",
    color: "blue"
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Audio energy analysis detects high-engagement highlight segments",
    color: "purple"
  },
  {
    icon: Cloud,
    title: "Generate & Upload",
    description: "FFmpeg cuts clips at detected timestamps and uploads to Amazon S3",
    color: "pink"
  },
  {
    icon: CheckCircle,
    title: "Get Clip URLs",
    description: "Poll the job status endpoint to retrieve your generated clip URLs",
    color: "green"
  }
]

const colorClasses = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    glow: "bg-cyan-500/20"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    glow: "bg-blue-500/20"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    glow: "bg-purple-500/20"
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    glow: "bg-pink-500/20"
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-400",
    glow: "bg-green-500/20"
  }
}

export default function HowItWorks() {
  return (
    <section className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            How It{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Our end-to-end media processing pipeline transforms long-form videos into viral-ready clips
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color]
              const Icon = step.icon
              
              return (
                <div key={index} className="relative group">
                  {/* Arrow between steps (desktop) */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-3 top-12 z-10 hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                  
                  <div className={`relative h-full rounded-2xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
                    {/* Glow effect on hover */}
                    <div className={`absolute -inset-1 rounded-2xl ${colors.glow} blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
                    
                    <div className="relative">
                      {/* Step number */}
                      <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-400">{index + 1}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`mb-4 inline-flex rounded-xl ${colors.bg} border ${colors.border} p-3`}>
                        <Icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      
                      {/* Content */}
                      <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-sm text-gray-500 uppercase tracking-wider">Powered By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["FastAPI", "FFmpeg", "Librosa", "NumPy", "Amazon S3", "Docker"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-700 bg-gray-800/50 px-4 py-1.5 text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
