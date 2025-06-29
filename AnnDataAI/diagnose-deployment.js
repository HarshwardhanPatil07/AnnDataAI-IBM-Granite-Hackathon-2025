#!/usr/bin/env node

/**
 * Quick Deployment Diagnostic Script
 * Run this to check if your backend is properly deployed and accessible
 */

const https = require('https');
const http = require('http');

// Configuration - UPDATE THESE WITH YOUR ACTUAL URLS
const CONFIG = {
  localApi: 'http://localhost:3600/api',
  deployedApi: 'YOUR_VERCEL_URL_HERE/api', // e.g., https://your-app.vercel.app/api
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data.substring(0, 500) // Limit response size
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testEndpoint(name, baseUrl) {
  console.log(`\n🔍 Testing ${name}: ${baseUrl}`);
  console.log('─'.repeat(50));
  
  const endpoints = ['/', '/health', '/users', '/products'];
  
  for (const endpoint of endpoints) {
    const url = baseUrl + endpoint;
    try {
      console.log(`  Testing: ${endpoint}`);
      const result = await makeRequest(url);
      
      if (result.statusCode >= 200 && result.statusCode < 300) {
        console.log(`  ✅ ${endpoint}: SUCCESS (${result.statusCode})`);
      } else if (result.statusCode >= 400 && result.statusCode < 500) {
        console.log(`  ⚠️  ${endpoint}: CLIENT ERROR (${result.statusCode})`);
      } else if (result.statusCode >= 500) {
        console.log(`  ❌ ${endpoint}: SERVER ERROR (${result.statusCode})`);
      }
      
      // Show response preview
      if (result.data && result.data.trim()) {
        const preview = result.data.substring(0, 100);
        console.log(`     Response preview: ${preview}${result.data.length > 100 ? '...' : ''}`);
      }
      
    } catch (error) {
      console.log(`  ❌ ${endpoint}: ERROR - ${error.message}`);
      
      if (error.code === 'ECONNREFUSED') {
        console.log(`     → Server is not running or not accessible`);
      } else if (error.code === 'ENOTFOUND') {
        console.log(`     → DNS lookup failed - check your URL`);
      } else if (error.message.includes('timeout')) {
        console.log(`     → Request timed out - server might be slow or down`);
      }
    }
  }
}

async function checkEnvironment() {
  console.log('\n🔧 Environment Check');
  console.log('─'.repeat(50));
  
  // Check if we're in the right directory
  const fs = require('fs');
  const path = require('path');
  
  const expectedFiles = [
    'backend/package.json',
    'frontend/package.json',
    'vercel.json'
  ];
  
  for (const file of expectedFiles) {
    if (fs.existsSync(path.join(process.cwd(), file))) {
      console.log(`  ✅ Found: ${file}`);
    } else {
      console.log(`  ❌ Missing: ${file}`);
    }
  }
  
  // Check package.json for scripts
  try {
    const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
    console.log(`  📦 Backend dependencies: ${Object.keys(backendPkg.dependencies || {}).length}`);
    
    const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
    console.log(`  📦 Frontend dependencies: ${Object.keys(frontendPkg.dependencies || {}).length}`);
  } catch (error) {
    console.log(`  ⚠️  Could not read package.json files`);
  }
}

function showTroubleshootingTips() {
  console.log('\n🛠️  Troubleshooting Tips');
  console.log('─'.repeat(50));
  console.log('  If your deployment is not working:');
  console.log('');
  console.log('  1. 📋 Check Vercel Dashboard:');
  console.log('     - Go to https://vercel.com/dashboard');
  console.log('     - Check if deployment succeeded');
  console.log('     - Look at the function logs for errors');
  console.log('');
  console.log('  2. 🔗 Verify API URL in frontend:');
  console.log('     - Check frontend/src/config/constants.js');
  console.log('     - Make sure VITE_BACKEND_URL points to your Vercel URL');
  console.log('');
  console.log('  3. 🔐 Environment Variables:');
  console.log('     - Set MONGO_CONNECTION_URL in Vercel dashboard');
  console.log('     - Set JWT_SECRET in Vercel dashboard');
  console.log('     - Set any other required environment variables');
  console.log('');
  console.log('  4. 🗄️  Database Connection:');
  console.log('     - Ensure MongoDB Atlas allows connections from 0.0.0.0/0');
  console.log('     - Verify your connection string is correct');
  console.log('');
  console.log('  5. 📡 CORS Issues:');
  console.log('     - Check if your backend has proper CORS configuration');
  console.log('     - Verify allowed origins include your frontend domain');
  console.log('');
  console.log('  🔗 Update your deployed URL above and run this script again!');
}

async function main() {
  console.log('🚀 AnnDataAI Deployment Health Check');
  console.log('═'.repeat(50));
  
  // Environment check
  await checkEnvironment();
  
  // Test local backend
  await testEndpoint('LOCAL BACKEND', CONFIG.localApi);
  
  // Test deployed backend
  if (CONFIG.deployedApi !== 'YOUR_VERCEL_URL_HERE/api') {
    await testEndpoint('DEPLOYED BACKEND', CONFIG.deployedApi);
  } else {
    console.log('\n⚠️  Please update the deployedApi URL in this script with your actual Vercel URL');
  }
  
  // Show troubleshooting tips
  showTroubleshootingTips();
  
  console.log('\n✅ Diagnostic complete!');
}

main().catch(error => {
  console.error('💥 Diagnostic failed:', error.message);
  process.exit(1);
});
