# IBM Granite Models on Hugging Face Integration Guide

## 🎯 Overview

AnnDataAI now uses **IBM Granite models exclusively** via **Hugging Face** as the primary AI service, with IBM Watson as a fallback. This ensures we're using only IBM Granite family models while leveraging Hugging Face's robust API infrastructure.

## 🤖 IBM Granite Models Used

### Primary Models
- **ibm-granite/granite-3.3-8b-instruct** - Main model for complex analysis
- **ibm-granite/granite-3.3-2b-instruct** - Faster model for chatbot responses
- **ibm-granite/granite-4.0-tiny-preview** - Latest compact model
- **ibm-granite/granite-timeseries-tspulse-r1** - Specialized for time series data

### Model Selection Strategy
- **Crop Recommendation**: `granite-3.3-8b-instruct` (comprehensive analysis)
- **Disease Detection**: `granite-3.3-8b-instruct` (detailed diagnosis)
- **Yield Prediction**: `granite-3.3-8b-instruct` (complex calculations)
- **Market Analysis**: `granite-3.3-8b-instruct` (market insights)
- **Fertilizer Recommendations**: `granite-3.3-8b-instruct` (detailed advice)
- **Chatbot Responses**: `granite-3.3-2b-instruct` (faster responses)
- **Geospatial Analysis**: `granite-3.3-8b-instruct` (spatial intelligence)

## 🔧 Technical Implementation

### Backend Architecture
```
Frontend Request → AI Controller → HuggingFaceGraniteService → IBM Granite Models
                                      ↓ (fallback if needed)
                                  IBMWatsonService → IBM Granite on Watson
```

### Service Layer
- **Primary**: `HuggingFaceGraniteService.ts` - Uses Hugging Face API with IBM Granite models
- **Fallback**: `IBMWatsonService.ts` - Uses IBM Watson with Granite models
- **Controller**: `aiController.ts` - Routes requests to appropriate service

## 🌟 Benefits of Hugging Face Integration

### Advantages
1. **Model Variety**: Access to all IBM Granite model variants
2. **Performance**: Hugging Face's optimized inference infrastructure
3. **Reliability**: Robust API with good uptime
4. **Flexibility**: Easy model switching and version management
5. **Cost Effective**: Pay-per-use pricing model

### IBM Granite Model Features
- **Language Understanding**: Advanced natural language processing
- **Agricultural Domain**: Pre-trained on diverse datasets including agricultural content
- **Instruction Following**: Optimized for following detailed prompts
- **JSON Output**: Capable of structured response generation
- **Multilingual**: Support for multiple languages (beneficial for global agriculture)

## 📊 AI Feature Mapping

| Feature | Model Used | Hugging Face Endpoint | Watson Fallback |
|---------|------------|----------------------|-----------------|
| Crop Recommendation | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |
| Disease Detection | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |
| Yield Prediction | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |
| Market Analysis | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |
| Fertilizer Advice | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |
| AgriBot Chat | granite-3.3-2b-instruct | ✅ Primary | ✅ Available |
| Geospatial Analysis | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |
| Irrigation Planning | granite-3.3-8b-instruct | ✅ Primary | ✅ Available |

## 🔑 API Key Requirements

### Hugging Face API Key
1. Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Create a new Access Token
3. Select "Read" permissions (sufficient for inference)
4. Copy the token and add to `.env` as `HUGGINGFACE_API_KEY`

### IBM Watson API Key (Fallback)
1. Go to [IBM Cloud](https://cloud.ibm.com)
2. Create watsonx.ai instance
3. Get API key from IAM settings
4. Add to `.env` as `WATSONX_API_KEY` and `WATSONX_PROJECT_ID`

## 🚀 Performance Optimization

### Response Time Optimization
- **Chatbot**: Uses smaller 2B model for faster responses
- **Analysis**: Uses 8B model for comprehensive insights
- **Fallback**: Automatic failover to Watson service

### Prompt Engineering
- **Structured Prompts**: JSON-formatted requests for consistent output
- **Context-Aware**: Agricultural domain-specific prompting
- **Temperature Control**: Optimized for each use case
- **Token Limits**: Efficient token usage for cost optimization

## 🔍 Monitoring & Debugging

### Model Information Logging
```javascript
// Frontend logs model usage information
console.log(`Using ${result.model_info.model_family} via ${result.model_info.primary_service}:`, result.model_info.specific_model);
```

### Health Check Endpoint
```
GET /api/ai/health
```
Returns status of both Hugging Face and Watson services.

### Error Handling
- **Graceful Degradation**: Fallback to Watson if Hugging Face fails
- **Retry Logic**: Automatic retry with exponential backoff
- **Error Logging**: Detailed error information for debugging

## 📈 Hackathon Compliance

### AI & Automation Unpacked Requirements
✅ **IBM Granite Models Only**: All AI features use IBM Granite family models  
✅ **No External Models**: No Gemini, OpenAI, or other non-IBM models  
✅ **Robust Architecture**: Primary + fallback service architecture  
✅ **Performance Optimized**: Model selection based on use case  
✅ **Agricultural Focus**: Domain-specific prompt engineering  
✅ **Scalable Design**: Easy to add new IBM Granite models  

### Implementation Verification
- All AI endpoints return `model_info` with IBM Granite model details
- Frontend logs confirm IBM Granite model usage
- Health check endpoint verifies IBM-only model usage
- Fallback system ensures reliability while maintaining IBM compliance

## 🔧 Development Notes

### Adding New Features
1. Update `HuggingFaceGraniteService.ts` with new method
2. Select appropriate IBM Granite model for the task
3. Add controller endpoint in `aiController.ts`
4. Implement frontend service call in `ibmGraniteService.js`
5. Update model selection strategy if needed

### Model Selection Guidelines
- **Complex Analysis**: Use `granite-3.3-8b-instruct`
- **Fast Responses**: Use `granite-3.3-2b-instruct`  
- **Specialized Tasks**: Consider domain-specific Granite models
- **Experimental Features**: Use `granite-4.0-tiny-preview`

This implementation ensures 100% IBM Granite model usage while providing robust, scalable AI services for the AnnDataAI platform.
