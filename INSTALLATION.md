# Installation Instructions

## Prerequisites Check

Before starting, ensure you have:

- [ ] Python 3.11+ installed
- [ ] Node.js 16+ and npm installed
- [ ] FFmpeg installed and in PATH
- [ ] AWS credentials configured (for S3)

## Step-by-Step Installation

### 1. Backend Setup

```bash
# Navigate to project root
cd c:\Users\vipad\opusmvp

# Install Python dependencies (if not already done)
pip install -r requirements.txt

# Verify FFmpeg is installed
ffmpeg -version

# Configure AWS credentials in .env file
# Make sure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# This will install:
# - react (18.2.0)
# - react-dom (18.2.0)
# - react-scripts (5.0.1)
# - axios (1.6.0)
```

### 3. Configuration

#### Backend (.env in root)
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=your_bucket
AWS_REGION=us-east-1
```

#### Frontend (frontend/.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

### 4. Start Development Servers

#### Terminal 1 - Backend
```bash
# From project root
uvicorn app.main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

#### Terminal 2 - Frontend
```bash
# From project root
cd frontend
npm start
```

Or use the quick start script:
```bash
# From project root
start_frontend.bat
```

Expected output:
```
Compiled successfully!

You can now view celer-clips-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### 5. Verify Installation

1. Open browser to `http://localhost:3000`
2. You should see the Celer Clips interface
3. Backend API docs available at `http://localhost:8000/docs`

## Testing the Application

### Quick Test

1. **Generate Clips Tab**:
   - Enter a test video URL (use a short video for testing)
   - Set clip duration: 30 seconds
   - Set clip count: 2
   - Click "Generate Clips"
   - Copy the job ID

2. **Check Status Tab**:
   - Paste the job ID
   - Click "Check Status"
   - Watch auto-refresh every 5 seconds
   - Wait for completion
   - View and download clips

### Test Video URLs

For testing, you can use:
- Short public videos from Dropbox
- Google Drive direct links
- S3 public URLs
- Any direct .mp4 link

## Troubleshooting

### Backend Issues

**Port 8000 already in use**:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**FFmpeg not found**:
- Download from https://ffmpeg.org/download.html
- Add to system PATH
- Restart terminal

**AWS credentials error**:
- Check .env file exists in root
- Verify credentials are correct
- Test with AWS CLI: `aws s3 ls`

### Frontend Issues

**npm install fails**:
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

**Port 3000 already in use**:
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**API connection error**:
- Verify backend is running on port 8000
- Check `frontend/.env` has correct URL
- Check browser console for CORS errors

### CORS Issues

Backend already has CORS enabled in `app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

If issues persist:
1. Clear browser cache
2. Try incognito mode
3. Check browser console for specific errors

## Production Deployment

### Backend (Railway/Render)
Already configured with Dockerfile and render.yaml

### Frontend (Vercel/Netlify)

```bash
# Build production bundle
cd frontend
npm run build

# Deploy /build folder to hosting service
```

**Important**: Set environment variable on hosting platform:
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## File Structure

```
opusmvp/
├── app/                    # Backend code
│   ├── api/
│   ├── services/
│   └── main.py
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClipGenerator.js
│   │   │   └── JobStatus.js
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .env
├── storage/               # Local file storage
├── requirements.txt       # Python dependencies
├── README.md             # Main documentation
├── SETUP_GUIDE.md        # Setup instructions
└── start_frontend.bat    # Quick start script
```

## Next Steps

After successful installation:

1. Read `SETUP_GUIDE.md` for usage instructions
2. Check `frontend/FEATURES.md` for UI features
3. Explore API docs at `http://localhost:8000/docs`
4. Test with sample videos
5. Configure for production deployment

## Support

For issues:
1. Check troubleshooting section above
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify all prerequisites are installed

## Success Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Can access UI in browser
- [ ] Can submit video URL
- [ ] Receive job ID
- [ ] Can check job status
- [ ] Auto-polling works
- [ ] Can view completed clips

If all checked, you're ready to go! 🚀
