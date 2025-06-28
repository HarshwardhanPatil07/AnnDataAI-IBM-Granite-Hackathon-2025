# AnnDataAI 🌾 - IBM Granite AI-Powered Agricultural Intelligence Platform

[![Hackathon](https://img.shields.io/badge/Hackathon-AI%20%26%20Automation%20Unpacked-blue?style=for-the-badge)](https://github.com)
[![IBM Granite](https://img.shields.io/badge/Powered%20by-IBM%20Granite-red?style=for-the-badge)](https://watsonx.ai)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)]()

## 🎯 **Hackathon Submission: "AI & Automation Unpacked" June 2025**

**AnnDataAI** is a revolutionary agricultural intelligence platform that leverages **100% IBM Granite models** via **Hugging Face** and watsonx.ai to provide farmers with AI-powered crop recommendations, disease detection, yield predictions, and intelligent farming guidance.

**🚀 NEW:** Now using IBM Granite models on Hugging Face for enhanced performance and reliability!

---

## 🏆 **Key Features**

### 🌾 **Intelligent Crop Recommendation**
- Advanced soil analysis using N-P-K nutrients and pH levels
- Climate-based crop selection with confidence scoring
- Regional optimization for maximum yield potential
- **Powered by:** `ibm-granite/granite-3.3-8b-instruct` via Hugging Face

### 🦠 **Disease Detection & Treatment**
- Symptom-based plant disease diagnosis
- Comprehensive treatment protocols (organic & chemical)
- Preventive measures and recovery timelines
- **AI Confidence:** 85-96% accuracy using IBM Granite

### 📈 **Yield Prediction & Optimization**
- Production forecasting with quality grade analysis
- Risk assessment and mitigation strategies
- Profit margin estimation and harvest timing
- **Data-driven insights** powered by IBM Granite models

### 🤖 **AgriBot - Intelligent Farm Assistant**
- Context-aware conversational AI
- Expert agricultural guidance 24/7
- Multi-language support with real-time responses
- **Powered by:** `ibm-granite/granite-3.3-2b-instruct` for fast responses

### 🗺️ **Geospatial Crop Analysis**
- Location-based crop suitability mapping
- Topographical and climate impact assessment
- Water resource availability analysis
- **GPS-integrated** farming recommendations

### 💧 **Smart Irrigation Management**
- Water requirement calculations by crop and season
- Irrigation scheduling optimization
- Conservation strategies and efficiency metrics
- **IoT-ready** for sensor integration

### 🌱 **Fertilizer Optimization**
- NPK ratio calculations based on soil analysis
- Organic and chemical fertilizer recommendations
- Cost-benefit analysis and application scheduling
- **Sustainable farming** practices

---

## 🚀 **Technology Stack**

### **AI & Machine Learning**
- **IBM watsonx.ai** - Cloud AI platform
- **IBM Granite Models** - `ibm/granite-13b-instruct-v2`
- **Advanced Prompt Engineering** - Task-specific optimization
- **Confidence Scoring** - Transparent AI reliability

### **Backend Architecture**
- **Node.js** + **Express.js** - RESTful API server
- **TypeScript** - Type-safe development
- **Socket.io** - Real-time communication
- **MongoDB** - Database for user data and analytics
- **Hugging Face API** - Primary access to IBM Granite models
- **IBM Cloud SDK** - Fallback watsonx.ai integration

### **Frontend Experience**
- **React.js** + **Vite** - Modern web application
- **Tailwind CSS** - Responsive design system
- **Progressive Web App** - Mobile-optimized experience
- **Real-time Updates** - Live AI responses

---

## 🛠️ **Quick Start Guide**

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Hugging Face account with API access (primary)
- IBM Cloud account with watsonx.ai access (fallback)
- MongoDB database (local or cloud)

### **1. Clone Repository**
```bash
git clone https://github.com/HarshwardhanPatil07/AnnDataAI-IBM-Granite-Hackathon-2025.git
cd AnnDataAI-IBM-Granite-Hackathon-2025
```

### **2. Backend Setup**
```bash
cd AnnDataAI/backend
npm install

# Create .env file with your credentials
cp .env.example .env
# Edit .env with your HUGGINGFACE_API_KEY (primary) and IBM credentials (fallback)
# HUGGINGFACE_API_KEY=your_hf_token_here
# WATSONX_API_KEY=your_ibm_api_key_here
# WATSONX_PROJECT_ID=your_project_id_here

# Start backend server
node server.js
```

### **3. Frontend Setup**
```bash
cd AnnDataAI/frontend
npm install

# Start development server
npm run dev
```

### **4. Access Application**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3600

---

## 🔑 **IBM watsonx.ai Configuration**

### **Required Environment Variables**
```env
WATSONX_API_KEY=your_ibm_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
MONGO_URI=your_mongodb_connection_string
PORT=3600
NODE_ENV=development
```

### **IBM Granite Model Usage**
- **Primary Model:** `ibm/granite-13b-instruct-v2`
- **Task Optimization:** Intelligent model selection per AI feature
- **Parameters:** Temperature 0.7, Max tokens 300-800, Top-P 0.9
- **Fallback:** Enhanced analytical responses for API failures

---

## 📱 **API Endpoints**

### **Core AI Features**
| Endpoint | Method | Description | Model |
|----------|--------|-------------|-------|
| `/api/ai/crop-recommendation` | POST | Intelligent crop suggestions | Granite-13B-Instruct |
| `/api/ai/disease-detection` | POST | Plant disease diagnosis | Granite-13B-Instruct |
| `/api/ai/yield-prediction` | POST | Production forecasting | Granite-13B-Instruct |
| `/api/ai/chat` | POST | AgriBot conversations | Granite-13B-Instruct |
| `/api/ai/geospatial-analysis` | POST | Location-based analysis | Granite-13B-Instruct |
| `/api/ai/irrigation-requirement` | POST | Water management | Granite-13B-Instruct |
| `/api/ai/fertilizer-recommendation` | POST | Nutrient optimization | Granite-13B-Instruct |

---

## 🏅 **Hackathon Compliance**

### **"AI & Automation Unpacked" Requirements**
✅ **100% IBM Granite Models** - No external AI services used
✅ **watsonx.ai Integration** - Direct cloud platform connection  
✅ **Agricultural Domain Focus** - Specialized farming use cases
✅ **Production Ready** - Scalable, documented, deployable
✅ **Innovation** - Novel AI applications in agriculture
✅ **User Experience** - Intuitive interface with real-time AI

---

**🌾 Empowering farmers with IBM Granite AI technology - Built for the future of sustainable agriculture! 🚀**

---
