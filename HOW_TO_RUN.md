# How to Run Celer Clips

## 🚀 Easiest Way (One Click)

**Double-click:** `start_all.bat`

This will:
- ✅ Start backend on http://localhost:8000
- ✅ Start frontend on http://localhost:3000
- ✅ Open in 2 separate terminal windows

Then open your browser to: **http://localhost:3000**

---

## 📝 Manual Way (2 Terminals)

### Terminal 1 - Backend
```bash
cd c:\Users\vipad\opusmvp
python -m uvicorn app.main:app --reload
```

Or double-click: `start_backend.bat`

### Terminal 2 - Frontend
```bash
cd c:\Users\vipad\opusmvp\frontend
npm start
```

Or double-click: `start_frontend.bat`

---

## ⚠️ First Time Setup

**Before first run, install frontend dependencies:**
```bash
cd c:\Users\vipad\opusmvp\frontend
npm install
```

This only needs to be done once!

---

## ✅ Verify It's Working

1. Backend running: http://localhost:8000/docs
2. Frontend running: http://localhost:3000
3. Test the app:
   - Go to "Generate Clips" tab
   - Enter a video URL
   - Click "Generate Clips"
   - Copy job ID
   - Go to "Check Status" tab
   - Paste job ID and check status

---

## 🛑 Stop Servers

Press `Ctrl+C` in each terminal window

Or close the terminal windows

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 8000 (backend)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Frontend won't start:**
```bash
cd frontend
npm install
npm start
```

**Backend errors:**
- Check FFmpeg is installed: `ffmpeg -version`
- Check .env.local file exists with AWS credentials
- Check Python packages: `pip install -r requirements.txt`

---

## 📦 Quick Commands

| Action | Command |
|--------|---------|
| Start both | `start_all.bat` |
| Start backend only | `start_backend.bat` |
| Start frontend only | `start_frontend.bat` |
| Install frontend | `cd frontend && npm install` |
| Build frontend | `cd frontend && npm run build` |
| View API docs | http://localhost:8000/docs |

---

## 🎯 That's It!

Just run `start_all.bat` and you're good to go! 🚀
