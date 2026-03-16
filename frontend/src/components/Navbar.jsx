"use client"

import { Sparkles } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">
            CELER CLIPS
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>AI-Powered Video Processing</span>
        </div>
      </div>
    </nav>
  )
}
