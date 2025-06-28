const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    message: 'AnnDataAI Backend is running!',
    timestamp: new Date().toISOString(),
    watsonxConfigured: !!(process.env.WATSONX_API_KEY && process.env.WATSONX_PROJECT_ID)
  });
});

// Test IBM Watson connection
app.get('/api/watson-test', async (req, res) => {
  try {
    const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');
    const { IamAuthenticator } = require('ibm-cloud-sdk-core');
    
    const watsonxAI = WatsonXAI.newInstance({
      version: '2024-05-31',
      authenticator: new IamAuthenticator({
        apikey: process.env.WATSONX_API_KEY
      }),
      serviceUrl: process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com'
    });

    const params = {
      input: 'Hello, this is a test from AnnDataAI backend!',
      modelId: 'ibm/granite-13b-instruct-v2',
      projectId: process.env.WATSONX_PROJECT_ID,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 50,
        min_new_tokens: 1,
        repetition_penalty: 1.05
      }
    };

    const response = await watsonxAI.generateText(params);
    
    res.json({
      success: true,
      message: 'IBM Watson connection successful!',
      response: response.result?.results?.[0]?.generated_text || 'No response'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'IBM Watson connection failed',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3600;

app.listen(PORT, () => {
  console.log(`🚀 AnnDataAI Backend Server running on port ${PORT}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🧪 Watson test: http://localhost:${PORT}/api/watson-test`);
});
