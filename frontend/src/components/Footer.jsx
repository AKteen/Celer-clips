"use client"

import { Code2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/10 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Code2 className="h-4 w-4 text-cyan-500/60" />
            <span>
              Developed and engineered by{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text font-medium text-transparent">
                Aditya Kulkarni
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
