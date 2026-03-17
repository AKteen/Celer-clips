# Render Monorepo Deployment Guide

## Overview
This project is deployed on Render as a monorepo with two separate services:
- **Frontend**: React + Vite application (port 3000)
- **Backend**: Python FastAPI application (port 8000)

## Deployment Configuration

The `render.yaml` file defines both services:

### Frontend Service
- **Name**: opus-mvp-frontend
- **Port**: 3000
- **Environment**: VITE_API_URL points to the backend API URL
- **Build**: Multi-stage Docker build with nginx

### Backend Service
- **Name**: opus-mvp-api
- **Port**: 8000
- **Runtime**: Python 3.11 with FFmpeg
- **Environment**: AWS credentials, S3 bucket config

## Local Development

### Start Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173 with Vite
```

### Start Backend
```bash
python -m pip install -r requirements.txt
python run_local.py
# Backend runs on http://localhost:8000
```

### Environment Variables

**Frontend** (.env or .env.local):
```
VITE_API_URL=http://localhost:8000
```

**Backend** (.env file in root, if needed):
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET=opus-clips
```

## Render Deployment

### First Time Setup
1. Connect your GitHub repository to Render
2. Create a Blueprint using `render.yaml`
3. Set up environment variables:
   - Backend: AWS credentials, S3 bucket settings
   - Frontend: VITE_API_URL (will be set to your backend API URL)

### Automatic Deploys
- Every push to `main` branch triggers both services to rebuild
- Frontend will use the backend's public URL for API calls
- Health checks ensure both services are running

### Troubleshooting

**Frontend can't reach backend:**
- Check `VITE_API_URL` in Render environment variables
- Ensure backend service is running and healthy
- Check CORS headers in backend (if needed)

**Build failures:**
- Frontend: `npm install` or npm/node version issues
- Backend: FFmpeg installation or Python dependencies

**Port conflicts:**
- Frontend uses port 3000
- Backend uses port 8000
