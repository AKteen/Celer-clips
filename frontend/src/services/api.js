// API Service - Central hub for all backend communication

const API_BASE_URL = 'http://127.0.0.1:8000'

/**
 * Generate clips from a video URL
 * @param {string} videoUrl - The URL of the video to process
 * @param {number} clipDuration - Duration of each clip in seconds (default: 40)
 * @param {number} clipCount - Number of clips to generate (default: 5)
 * @returns {Promise} - {job_id, status}
 */
export const generateClips = async (videoUrl, clipDuration = 40, clipCount = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-clips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_url: videoUrl,
        clip_duration: clipDuration,
        clip_count: clipCount,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail?.error || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error generating clips:', error)
    throw error
  }
}

/**
 * Get job status and clip URLs
 * @param {string} jobId - The job ID to check
 * @returns {Promise} - {job_id, status, clips, error}
 */
export const getJobStatus = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Job not found')
      }
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching job status:', error)
    throw error
  }
}

/**
 * Poll job status until completion or timeout
 * @param {string} jobId - The job ID to poll
 * @param {number} maxAttempts - Maximum number of poll attempts (default: 120 = 2 hours at 60s intervals)
 * @param {number} interval - Polling interval in milliseconds (default: 60000 = 60 seconds)
 * @returns {Promise} - Final job status
 */
export const pollJobStatus = async (jobId, maxAttempts = 120, interval = 60000) => {
  let attempts = 0

  return new Promise((resolve, reject) => {
    const poll = async () => {
      attempts++

      try {
        const job = await getJobStatus(jobId)

        if (job.status === 'completed' || job.status === 'failed') {
          resolve(job)
        } else if (attempts >= maxAttempts) {
          reject(new Error('Polling timeout: Job did not complete in time'))
        } else {
          setTimeout(poll, interval)
        }
      } catch (error) {
        reject(error)
      }
    }

    poll()
  })
}

export default {
  generateClips,
  getJobStatus,
  pollJobStatus,
}
