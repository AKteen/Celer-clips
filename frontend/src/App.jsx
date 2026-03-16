import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Clipbox from '@/components/Clipbox'
import StatusCheck from '@/components/StatusCheck'

function App() {
  const [currentJobId, setCurrentJobId] = useState(null)
  const [showStatusCheck, setShowStatusCheck] = useState(false)
  const [completedClips, setCompletedClips] = useState([])

  const handleJobCreated = (jobId) => {
    setCurrentJobId(jobId)
    setShowStatusCheck(true)
  }

  const handleStatusCheckComplete = (jobData) => {
    if (jobData.clips) {
      setCompletedClips(jobData.clips)
    }
    setShowStatusCheck(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        {!showStatusCheck ? (
          <>
            <Hero onJobCreated={handleJobCreated} />
            <Clipbox clips={completedClips} />
          </>
        ) : (
          <StatusCheck jobId={currentJobId} onComplete={handleStatusCheckComplete} />
        )}
      </main>
    </div>
  )
}

export default App
