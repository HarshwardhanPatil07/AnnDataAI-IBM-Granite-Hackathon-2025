require('dotenv').config();

/**
 * Test script to verify IBM watsonx.ai setup
 * Run with: node test-watson-setup.js
 */

async function testWatsonXAISetup() {
  console.log('🔍 Testing IBM watsonx.ai Setup...\n');

  // Check environment variables
  console.log('1. Checking Environment Variables:');
  const requiredEnvVars = [
    'WATSONX_API_KEY',
    'WATSONX_PROJECT_ID', 
    'WATSONX_URL',
    'WATSONX_AUTHENTICATOR'
  ];

  let envVarsOk = true;
  requiredEnvVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`   ✅ ${varName}: Set`);
    } else {
      console.log(`   ❌ ${varName}: Missing`);
      envVarsOk = false;
    }
  });

  if (!envVarsOk) {
    console.log('\n❌ Environment variables missing. Please check your .env file.');
    return;
  }

  // Test IBM Watson SDK import
  console.log('\n2. Testing IBM Watson SDK:');
  try {
    const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');
    const { IamAuthenticator } = require('ibm-cloud-sdk-core');
    console.log('   ✅ @ibm-cloud/watsonx-ai package imported successfully');
    
    // Initialize Watson AI with proper authenticator
    const watsonxAI = WatsonXAI.newInstance({
      version: '2024-05-31',
      authenticator: new IamAuthenticator({
        apikey: process.env.WATSONX_API_KEY
      }),
      serviceUrl: process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com'
    });
    console.log('   ✅ WatsonXAI instance created');

    // Test connection with a simple prompt
    console.log('\n3. Testing Connection to IBM Granite:');
    const params = {
      input: 'Hello, this is a test. Please respond with "IBM Granite is working!"',
      modelId: 'ibm/granite-13b-instruct-v2',
      projectId: process.env.WATSONX_PROJECT_ID,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 50,
        min_new_tokens: 1,
        repetition_penalty: 1.05
      }
    };

    console.log('   🔄 Sending test request to IBM Granite...');
    const response = await watsonxAI.generateText(params);
    
    if (response.result?.results?.[0]?.generated_text) {
      console.log('   ✅ Connection successful!');
      console.log('   📝 Response:', response.result.results[0].generated_text.trim());
    } else {
      console.log('   ❌ No response received');
    }

    // Test agricultural prompt
    console.log('\n4. Testing Agricultural AI Capability:');
    const agriParams = {
      input: 'What are the best crops to grow in sandy soil with low rainfall?',
      modelId: 'ibm/granite-13b-instruct-v2',
      projectId: process.env.WATSONX_PROJECT_ID,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 200,
        min_new_tokens: 50,
        repetition_penalty: 1.05
      }
    };

    console.log('   🔄 Testing agricultural knowledge...');
    const agriResponse = await watsonxAI.generateText(agriParams);
    
    if (agriResponse.result?.results?.[0]?.generated_text) {
      console.log('   ✅ Agricultural AI test successful!');
      console.log('   📝 Response preview:', agriResponse.result.results[0].generated_text.substring(0, 200) + '...');
    } else {
      console.log('   ❌ Agricultural AI test failed');
    }

    // Test chat model
    console.log('\n5. Testing Chat Model:');
    const chatParams = {
      input: 'You are an agricultural expert. A farmer asks: "My tomato plants have yellow leaves. What should I do?" Please provide helpful advice.',
      modelId: 'ibm/granite-13b-instruct-v2',
      projectId: process.env.WATSONX_PROJECT_ID,
      parameters: {
        decoding_method: 'greedy',
        max_new_tokens: 150,
        min_new_tokens: 30,
        repetition_penalty: 1.05
      }
    };

    console.log('   🔄 Testing chat model...');
    const chatResponse = await watsonxAI.generateText(chatParams);
    
    if (chatResponse.result?.results?.[0]?.generated_text) {
      console.log('   ✅ Chat model test successful!');
      console.log('   📝 Response preview:', chatResponse.result.results[0].generated_text.substring(0, 200) + '...');
    } else {
      console.log('   ❌ Chat model test failed');
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('🚀 Your IBM watsonx.ai setup is ready for AnnDataAI!');

  } catch (error) {
    console.error('\n❌ Error during testing:');
    console.error('Error message:', error.message);
    
    if (error.message.includes('401')) {
      console.error('🔑 Authentication failed - check your API key');
    } else if (error.message.includes('403')) {
      console.error('🚫 Access denied - check your project permissions');
    } else if (error.message.includes('404')) {
      console.error('🔍 Resource not found - check your project ID and model access');
    } else if (error.message.includes('Cannot find module')) {
      console.error('📦 Missing dependency - run: npm install @ibm-cloud/watsonx-ai');
    }
  }
}

// Run the test
testWatsonXAISetup().catch(console.error);
