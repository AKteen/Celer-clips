# Celer Clips - Complete Setup Guide

## 🚀 Quick Start (Development)

### Step 1: Start Backend

```bash
# From project root
uvicorn app.main:app --reload
```

Backend runs on: `http://localhost:8000`

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 3: Start Frontend

```bash
npm start
```

Or use the quick start script from project root:
```bash
start_frontend.bat
```

Frontend runs on: `http://localhost:3000`

### Step 4: Use the App

1. Open `http://localhost:3000` in your browser
2. Go to "Generate Clips" tab
3. Enter a video URL (e.g., Dropbox, Drive, S3 link)
4. Set clip duration and count
5. Click "Generate Clips"
6. Copy the job ID
7. Go to "Check Status" tab
8. Paste job ID and click "Check Status"
9. Wait for processing (auto-refreshes every 5 seconds)
10. Download your clips!

## 🎨 Features

### Generate Clips Tab
- Clean form interface
- Video URL input with validation
- Configurable clip duration (10-300s)
- Configurable clip count (1-10)
- Instant job ID response

### Check Status Tab
- Job ID lookup
- Auto-polling every 5 seconds
- Real-time status updates
- Inline video players for completed clips
- Download links for each clip

## 🔧 Configuration

### Backend
Edit `.env` in project root for AWS credentials and settings

### Frontend
Edit `frontend/.env` to change API URL:

```env
# Development
REACT_APP_API_URL=http://localhost:8000

# Production
REACT_APP_API_URL=https://your-backend.railway.app
```

## 📦 Production Deployment

### Backend
Already configured for Railway/Render (see main README)

### Frontend

#### Option 1: Vercel
```bash
cd frontend
npm run build
# Deploy /build folder to Vercel
```

#### Option 2: Netlify
```bash
cd frontend
npm run build
# Deploy /build folder to Netlify
```

#### Option 3: Serve with Backend
Build frontend and serve as static files from FastAPI

Don't forget to set `REACT_APP_API_URL` environment variable!

## 🐛 Troubleshooting

### CORS Errors
Backend already has CORS enabled. If issues persist, check browser console.

### API Connection Failed
- Ensure backend is running on port 8000
- Check `frontend/.env` has correct API URL
- Verify no firewall blocking

### Polling Not Working
- Check browser console for errors
- Ensure job ID is correct
- Backend must be running

### Video Processing Fails
- Check video URL is publicly accessible
- Ensure FFmpeg is installed
- Check backend logs for errors

## 📝 API Endpoints

### POST /generate-clips
```json
{
  "video_url": "https://example.com/video.mp4",
  "clip_duration": 40,
  "clip_count": 5
}
```

Response:
```json
{
  "job_id": "abc123...",
  "status": "processing"
}
```

### GET /jobs/{job_id}

Processing:
```json
{
  "job_id": "abc123...",
  "status": "processing"
}
```

Completed:
```json
{
  "job_id": "abc123...",
  "status": "completed",
  "clips": [
    "http://localhost:8000/clips/clip1.mp4",
    "http://localhost:8000/clips/clip2.mp4"
  ]
}
```

Failed:
```json
{
  "job_id": "abc123...",
  "status": "failed",
  "error": "Error message"
}
```

## 🎯 Tech Stack

- **Backend**: FastAPI, Python 3.11, FFmpeg, Librosa
- **Frontend**: React 18, Axios, CSS3
- **Storage**: Amazon S3
- **Deployment**: Railway, Render, Vercel, Netlify

## 📚 Documentation

- Main README: `/README.md`
- Frontend README: `/frontend/README.md`
- API Docs: `http://localhost:8000/docs` (when backend running)

## 👨‍💻 Author

Built by Aditya (Github: AKteen)
