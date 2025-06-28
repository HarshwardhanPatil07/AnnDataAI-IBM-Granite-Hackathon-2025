# IBM watsonx.ai Setup Guide for Granite Models

## 🔑 Complete Setup Process for IBM Granite Integration

### Step 1: Create IBM Cloud Account

1. **Go to IBM Cloud**: Visit [https://cloud.ibm.com](https://cloud.ibm.com)
2. **Sign Up**: Create a new account or sign in with existing credentials
3. **Verify Email**: Complete email verification if required
4. **Choose Plan**: Select appropriate pricing plan (Free tier available for testing)

### Step 2: Set Up watsonx.ai Service

1. **Navigate to watsonx.ai**:
   - From IBM Cloud dashboard, go to "Catalog"
   - Search for "watsonx.ai" or find it under "AI/Machine Learning"
   - Click on "watsonx.ai"

2. **Create Service Instance**:
   - Choose your region (recommend: Dallas/us-south for best performance)
   - Select pricing plan:
     - **Lite Plan**: Free tier with limited usage
     - **Essentials Plan**: Pay-as-you-go for production
   - Click "Create"

3. **Access watsonx.ai Studio**:
   - From your IBM Cloud dashboard, go to "Resource List"
   - Find your watsonx.ai service and click "Launch watsonx.ai"

### Step 3: Create a Project

1. **In watsonx.ai Studio**:
   - Click "Projects" in the left navigation
   - Click "New Project"
   - Choose "Create an empty project"

2. **Project Configuration**:
   - **Name**: "AnnDataAI-Production" (or your preferred name)
   - **Description**: "Agricultural AI platform using IBM Granite models"
   - **Storage**: Associate with Cloud Object Storage (will be created if needed)
   - Click "Create"

3. **Note Your Project ID**:
   - After creation, go to project settings
   - Copy the **Project ID** - you'll need this for configuration

### Step 4: Get API Credentials

1. **Create API Key**:
   - Go to IBM Cloud dashboard
   - Click on "Manage" → "Access (IAM)" → "API keys"
   - Click "Create an IBM Cloud API key"
   - **Name**: "watsonx-api-key-anndataai"
   - **Description**: "API key for AnnDataAI watsonx.ai integration"
   - Click "Create"
   - **IMPORTANT**: Copy and save the API key immediately (you won't see it again)

2. **Service URL**:
   - The service URL depends on your region:
     - **Dallas (us-south)**: `https://us-south.ml.cloud.ibm.com`
     - **Frankfurt (eu-de)**: `https://eu-de.ml.cloud.ibm.com`
     - **Tokyo (jp-tok)**: `https://jp-tok.ml.cloud.ibm.com`

### Step 5: Environment Configuration

Create these environment variables in your backend:

#### Backend Environment Variables (.env file)
```bash
# IBM watsonx.ai Configuration
WATSONX_API_KEY=your_api_key_here
WATSONX_PROJECT_ID=your_project_id_here
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_AUTHENTICATOR=iam

# Other existing variables...
PORT=3600
NODE_ENV=development
```

#### Example .env.example file:
```bash
# IBM watsonx.ai Configuration (Required)
WATSONX_API_KEY=your_ibm_cloud_api_key
WATSONX_PROJECT_ID=your_watsonx_project_id
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_AUTHENTICATOR=iam

# Database Configuration
DB_HOST=localhost
DB_PORT=27017
DB_NAME=anndataai

# Other Configuration
PORT=3600
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

### Step 6: Install Required Dependencies

The backend already has the necessary dependencies configured, but verify they're installed:

```bash
cd backend
npm install @ibm-cloud/watsonx-ai
```

### Step 7: Verify IBM Granite Models Access

1. **Available Models**:
   - **ibm/granite-13b-instruct-v2**: For general instructions and analysis
   - **ibm/granite-13b-chat-v2**: For conversational interactions (chatbot)
   - **ibm/granite-20b-multilingual**: For multilingual support (if needed)

2. **Check Model Access**:
   - In watsonx.ai Studio, go to "Foundation models"
   - Verify you can see IBM Granite models listed
   - Test with a simple prompt to ensure access

### Step 8: Testing Your Setup

Create a simple test script to verify everything works:

#### Test Script (backend/test-watson.js)
```javascript
require('dotenv').config();
const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');

async function testWatsonXAI() {
  try {
    const watsonxAI = WatsonXAI.newInstance({
      authenticator: 'iam',
      serviceUrl: process.env.WATSONX_URL
    });

    const params = {
      input: 'What are the best crops for sandy soil?',
      modelId: 'ibm/granite-13b-instruct-v2',
      projectId: process.env.WATSONX_PROJECT_ID,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 100,
        min_new_tokens: 1,
        repetition_penalty: 1.05
      }
    };

    const response = await watsonxAI.generateText(params);
    console.log('✅ Watson AI Test Successful!');
    console.log('Response:', response.result?.results?.[0]?.generated_text);
  } catch (error) {
    console.error('❌ Watson AI Test Failed:', error.message);
  }
}

testWatsonXAI();
```

Run the test:
```bash
node test-watson.js
```

### Step 9: Production Considerations

#### Security Best Practices:
1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly
4. **Monitor usage** to avoid unexpected costs

#### Cost Management:
1. **Monitor Token Usage**: IBM charges based on tokens processed
2. **Set Budget Alerts**: Configure spending notifications
3. **Optimize Prompts**: Use concise, efficient prompts
4. **Cache Results**: Cache responses when appropriate

#### Rate Limiting:
- IBM watsonx.ai has rate limits based on your plan
- Implement proper error handling for rate limit responses
- Consider request queuing for high-volume scenarios

### Step 10: Monitoring and Maintenance

1. **Usage Dashboard**:
   - Monitor API usage in IBM Cloud dashboard
   - Track costs and token consumption
   - Set up alerts for high usage

2. **Error Monitoring**:
   - Implement logging for all AI requests
   - Monitor for failed requests
   - Set up alerts for service issues

3. **Performance Optimization**:
   - Monitor response times
   - Optimize prompt engineering
   - Consider caching for frequently requested data

## 📋 Quick Setup Checklist

- [ ] IBM Cloud account created
- [ ] watsonx.ai service provisioned
- [ ] Project created in watsonx.ai Studio
- [ ] API key generated and secured
- [ ] Project ID noted
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Test connection successful
- [ ] All AI endpoints tested
- [ ] Production security measures implemented

## 🚨 Troubleshooting Common Issues

### Authentication Errors:
- Verify API key is correct and not expired
- Check if service is properly provisioned
- Ensure correct region/service URL

### Model Access Issues:
- Verify project has access to Granite models
- Check if you're in the correct region
- Ensure proper permissions are set

### Rate Limiting:
- Monitor API usage in dashboard
- Implement exponential backoff
- Consider upgrading plan if needed

### Performance Issues:
- Optimize prompt length and complexity
- Check network connectivity
- Monitor service status page

## 💡 Additional Resources

- [IBM watsonx.ai Documentation](https://www.ibm.com/docs/en/watsonx-as-a-service)
- [IBM Granite Models Guide](https://www.ibm.com/docs/en/watsonx-as-a-service?topic=models-granite)
- [API Reference](https://cloud.ibm.com/apidocs/watsonx-ai)
- [Pricing Information](https://www.ibm.com/products/watsonx-ai/pricing)

Your AnnDataAI platform is now ready to use IBM Granite models exclusively!
