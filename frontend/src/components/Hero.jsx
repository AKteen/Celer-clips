import { useState } from "react"
import { Zap, Loader2, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateClips } from "@/services/api"

export default function Hero({ onJobCreated }) {
  const [videoUrl, setVideoUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobId, setJobId] = useState(null)
  const [error, setError] = useState(null)

  const handleGenerateClips = async () => {
    if (!videoUrl.trim()) return
    
    setIsGenerating(true)
    setError(null)
    
    try {
      const data = await generateClips(videoUrl)
      if (data.job_id) {
        setJobId(data.job_id)
        onJobCreated?.(data.job_id)
      }
    } catch (err) {
      setError(err.message || "Failed to generate clips")
      console.error("Error generating clips:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
        
        {/* Scanlines effect */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
          <Zap className="h-4 w-4" />
          <span>Next-Gen Video Processing</span>
        </div>
        
        <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl">
          <span className="text-white">Transform Videos into</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Viral Clips
          </span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-gray-400">
          Paste your Dropbox video URL and let AI extract the most engaging moments automatically.
        </p>

        {/* Input Section */}
        <div className="mx-auto max-w-xl space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-30 blur-lg transition-opacity group-hover:opacity-50" />
            <div className="relative flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gray-900/90 p-2 backdrop-blur-sm">
              <Link2 className="ml-3 h-5 w-5 text-gray-500" />
              <Input
                type="url"
                placeholder="Paste your Dropbox URL here, keep dl=1"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1 border-0 bg-transparent text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGenerateClips}
              disabled={isGenerating || !videoUrl.trim()}
              className="flex-1 h-12 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 via-50% to-purple-600 text-white font-semibold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:shadow-xl disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Generate Clips
                </>
              )}
            </Button>
          </div>

          {jobId && (
            <div className="rounded-full border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              Job created! ID: <code className="font-mono">{jobId}</code>
            </div>
          )}

          {error && (
            <div className="rounded-full border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
