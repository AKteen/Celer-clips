import { useState, useEffect } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { pollJobStatus } from "@/services/api"
import { Button } from "@/components/ui/button"

export default function StatusCheck({ jobId, onComplete }) {
  const [status, setStatus] = useState("processing")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [clips, setClips] = useState([])

  useEffect(() => {
    if (!jobId) return

    const startPolling = async () => {
      try {
        const result = await pollJobStatus(jobId, 120, 5000) // Poll every 5 seconds for 10 minutes
        setStatus(result.status)
        if (result.clips) {
          setClips(result.clips)
        }
        onComplete?.(result)
      } catch (err) {
        setError(err.message)
        setStatus("failed")
      }
    }

    startPolling()
  }, [jobId, onComplete])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8">
          {status === "processing" && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500/20 blur-xl" />
                  <div className="relative rounded-full border border-cyan-500/30 bg-gray-800/50 p-4">
                    <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Processing Your Video</h2>
              <p className="text-gray-400 mb-6">
                Job ID: <code className="font-mono text-cyan-400">{jobId}</code>
              </p>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress || 33}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">{progress || 33}% Complete</p>
              </div>

              <p className="text-sm text-gray-500">
                This may take a few minutes. Please keep this window open.
              </p>
            </>
          )}

          {status === "completed" && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />
                  <div className="relative rounded-full border border-green-500/30 bg-gray-800/50 p-4">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Clips Generated Successfully!</h2>
              <p className="text-gray-400 mb-6">
                {clips.length} clip{clips.length !== 1 ? 's' : ''} ready for download
              </p>

              {clips.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {clips.map((clip, index) => (
                      <a
                        key={index}
                        href={clip}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 bg-gray-700/50 hover:bg-gray-700 rounded text-cyan-400 text-sm truncate transition-colors"
                      >
                        📹 Clip {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => onComplete?.({ status, clips })}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold"
              >
                Back to Home
              </Button>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl" />
                  <div className="relative rounded-full border border-red-500/30 bg-gray-800/50 p-4">
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Processing Failed</h2>
              <p className="text-red-400 mb-6">
                {error || "An error occurred while processing your video"}
              </p>

              <Button
                onClick={() => onComplete?.({ status, clips: [] })}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold"
              >
                Try Again
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
