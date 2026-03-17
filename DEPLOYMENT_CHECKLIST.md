# Render Deployment Checklist ✅

## Pre-Deployment Verification

### Frontend
- [x] API URL uses environment variables (VITE_API_URL)
- [x] HTML metadata updated (title, description)
- [x] Docker & nginx configuration ready
- [x] .env.example created with API_URL template
- [x] .gitignore configured for environment files
- [x] Build scripts in package.json ready
- [x] Vite config supports environment variables

### Backend  
- [x] CORS configured to allow frontend domain
- [x] Health check endpoint available at `/`
- [x] Docker configured with FFmpeg and dependencies
- [x] Environment variables specified in render.yaml
- [x] S3 bucket configuration ready

### Monorepo Configuration
- [x] render.yaml defines both services
- [x] Frontend service on port 3000
- [x] Backend service on port 8000
- [x] Health check paths configured
- [x] Automatic branch deploys on `main`

## Render Setup Steps

1. **Connect Repository**
   - Go to https://dashboard.render.com
   - Connect your GitHub repository
   
2. **Create Blueprint Deploy**
   - Click "New +" → "Blueprint"
   - Select your repository
   - Render will auto-detect `render.yaml`

3. **Set Environment Variables**
   - Backend service: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
   - Frontend service: VITE_API_URL=https://opus-mvp-api.onrender.com

4. **Deploy**
   - Click "Deploy"
   - Both services will build and start

## Post-Deployment Verification

- [ ] Frontend accessible at https://opus-mvp-frontend.onrender.com
- [ ] Backend accessible at https://opus-mvp-api.onrender.com
- [ ] Frontend can call backend API endpoints
- [ ] Health checks passing for both services

## Local Testing Before Push

```bash
# Build frontend Docker image locally
cd frontend
docker build -t opus-frontend .

# Test frontend
docker run -p 3000:3000 -e VITE_API_URL=http://host.docker.internal:8000 opus-frontend

# Backend should be running on 8000
python -m pip install -r requirements.txt
python run_local.py
```

Then visit `http://localhost:3000` and test clip generation.

## Troubleshooting

**Frontend shows blank page:**
- Check browser console for errors
- Verify VITE_API_URL environment variable
- Check Render backend service status

**API calls fail:**
- Verify backend URL matches VITE_API_URL
- Check backend health at https://opus-mvp-api.onrender.com/
- Check CORS headers (should be already configured)

**Build fails:**
- Frontend: Ensure Node 20+ in Dockerfile
- Backend: FFmpeg installation in Dockerfile
- Check Render build logs in dashboard
