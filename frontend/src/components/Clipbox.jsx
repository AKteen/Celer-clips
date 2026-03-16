"use client"

import { Film, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Clipbox({ clips = [] }) {
  const hasClips = clips && clips.length > 0

  return (
    <section className="relative py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">Generated Clips</h2>
          <p className="mt-2 text-gray-400">
            {hasClips ? `${clips.length} clip${clips.length !== 1 ? 's' : ''} ready for download` : 'Your AI-extracted clips will appear below'}
          </p>
        </div>
        
        <div className="relative">
          {/* Glow border effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-lg" />
          
          {/* Main container */}
          <div className={`relative rounded-2xl border border-gray-800 ${hasClips ? 'bg-gray-900/50 backdrop-blur-sm' : 'min-h-[400px]'} flex flex-col items-center justify-center`}>
            {/* Dotted grid background */}
            <div 
              className="absolute inset-0 opacity-30 rounded-2xl"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
            
            {hasClips ? (
              // Clips grid
              <div className="relative z-10 w-full p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clips.map((clip, index) => (
                    <div
                      key={index}
                      className="group rounded-lg border border-cyan-500/30 bg-gray-800/50 hover:bg-gray-800 overflow-hidden transition-colors"
                    >
                      {/* Video thumbnail placeholder */}
                      <div className="aspect-video bg-gray-700 flex items-center justify-center relative overflow-hidden">
                        <Film className="h-8 w-8 text-gray-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            asChild
                            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
                          >
                            <a href={clip} download target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                      
                      {/* Clip info */}
                      <div className="p-3">
                        <p className="text-sm font-medium text-white">Clip {index + 1}</p>
                        <a
                          href={clip}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-300 truncate block mt-1"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Empty state content
              <div className="relative z-10 flex flex-col items-center gap-4 text-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500/20 blur-xl" />
                  <div className="relative rounded-full border border-cyan-500/30 bg-gray-800/50 p-6">
                    <Film className="h-12 w-12 text-cyan-500/50" />
                  </div>
                </div>
                
                <div>
                  <p className="text-xl font-medium text-gray-300">Clips appear here</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Submit a video URL above to generate clips
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="mt-4 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 w-2 rounded-full bg-cyan-500/30 animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
