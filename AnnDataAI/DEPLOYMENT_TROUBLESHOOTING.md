## 🚀 AnnDataAI Deployment Troubleshooting Guide

### ✅ Current Status:
- **Local Backend**: ✅ Working perfectly (Port 3600)
- **Local Authentication**: ✅ Disabled (DISABLE_AUTH = true)
- **Deployment**: ❓ Needs verification

### 🔍 Common Deployment Issues & Solutions:

#### 1. 📡 **Frontend API URL Configuration**
**Problem**: Frontend can't reach the deployed backend
**Solution**: Check `frontend/src/config/constants.js`

```javascript
// Current configuration:
export const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3600/api"
    : "/api");
```

**Action Required**:
- Set `VITE_BACKEND_URL` environment variable in Vercel
- OR update the fallback URL to your actual backend URL

#### 2. 🔐 **Environment Variables Missing**
**Check these in your Vercel Dashboard** → Settings → Environment Variables:

```bash
# Required Variables:
MONGO_CONNECTION_URL=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=production

# Optional (for AI features):
IBM_CLOUD_API_KEY=your-ibm-key
IBM_WATSONX_PROJECT_ID=your-project-id
IBM_WATSONX_URL=https://us-south.ml.cloud.ibm.com

# Frontend Variables:
VITE_BACKEND_URL=https://your-app.vercel.app/api
```

#### 3. 🗄️ **MongoDB Connection Issues**
**Common Problems**:
- MongoDB Atlas network access not allowing Vercel IPs
- Incorrect connection string
- Database credentials expired

**Solutions**:
- In MongoDB Atlas → Network Access → Add IP: `0.0.0.0/0` (Allow all)
- Verify connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database`
- Test connection string locally first

#### 4. 📁 **Vercel Configuration Issues**
**Check your `vercel.json` files**:

Root level `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/$1"
    }
  ]
}
```

#### 5. 🛠️ **Build Process Issues**
**Common Problems**:
- TypeScript compilation errors
- Missing dependencies
- Build timeouts

**Debug Steps**:
1. Check Vercel deployment logs
2. Test build locally: `cd backend && npm run build`
3. Verify all dependencies are in package.json (not devDependencies)

#### 6. 🌐 **CORS Configuration**
**Your current CORS setup**:
```typescript
cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-production-frontend.com", // ⚠️ UPDATE THIS!
  ],
  // ...
})
```

**Action Required**: Update CORS origins with your actual Vercel domain

---

### 🔧 **Step-by-Step Debugging Process**:

#### Step 1: Get Your Vercel URLs
```bash
# Run this in your project directory:
npx vercel --prod
```
This will give you your deployment URLs.

#### Step 2: Test Your Backend API
Replace `YOUR_VERCEL_URL` with your actual URL:
```bash
# Test if backend is responding:
curl https://YOUR_VERCEL_URL/api/

# Test products endpoint:
curl https://YOUR_VERCEL_URL/api/products
```

#### Step 3: Check Vercel Function Logs
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on your function to see logs
5. Look for error messages

#### Step 4: Verify Environment Variables
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure all required variables are set for "Production"
3. Redeploy after adding variables

#### Step 5: Test Frontend API Calls
Open browser developer tools:
```javascript
// Test in browser console:
fetch('/api/products')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### 🚨 **Emergency Quick Fix**:
If you need to get it working immediately:

1. **Hardcode the API URL** in `frontend/src/config/constants.js`:
```javascript
export const API_URL = "https://your-actual-vercel-url.vercel.app/api";
```

2. **Update CORS** in `backend/src/app.ts`:
```typescript
cors({
  origin: "*", // ⚠️ Temporary - not secure for production
  // ... rest of config
})
```

3. **Redeploy** both frontend and backend

---

### 📋 **Next Steps**:
1. Share your Vercel deployment URL
2. Check Vercel function logs for errors
3. Verify environment variables are set
4. Test the deployed API endpoints
5. Update CORS origins with actual domain

### 🆘 **Still Having Issues?**
If problems persist, check:
- Vercel deployment status
- MongoDB Atlas connection
- Environment variables spelling
- Function timeout limits (increase if needed)
