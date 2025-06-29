/**
 * Backend Startup Diagnostic
 * 
 * This script checks if the backend can start successfully
 */

const fs = require('fs');
const path = require('path');

function checkBackendSetup() {
  console.log('🔍 AnnDataAI Backend Diagnostic Check');
  console.log('=' .repeat(50));
  
  // Check if package.json exists
  const packagePath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.log('❌ package.json not found');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  console.log('✅ package.json found');
  console.log(`📦 Project: ${packageJson.name}`);
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('❌ node_modules not found. Run: npm install');
    return false;
  }
  console.log('✅ node_modules found');
  
  // Check if main entry point exists
  const serverFiles = ['server.js', 'server.ts', 'app.js', 'app.ts', 'index.js', 'index.ts'];
  let serverFile = null;
  
  for (const file of serverFiles) {
    if (fs.existsSync(path.join(__dirname, file))) {
      serverFile = file;
      break;
    }
    if (fs.existsSync(path.join(__dirname, 'src', file))) {
      serverFile = path.join('src', file);
      break;
    }
  }
  
  if (!serverFile) {
    console.log('❌ Server entry point not found');
    return false;
  }
  console.log(`✅ Server file found: ${serverFile}`);
  
  // Check AI controller and routes
  const aiControllerPath = path.join(__dirname, 'src', 'controllers', 'aiController.ts');
  const aiRoutesPath = path.join(__dirname, 'src', 'routes', 'aiRoutes.ts');
  
  if (fs.existsSync(aiControllerPath)) {
    console.log('✅ AI Controller found');
    
    const controllerContent = fs.readFileSync(aiControllerPath, 'utf-8');
    if (controllerContent.includes('getPricePrediction')) {
      console.log('✅ Price prediction endpoint implemented');
    } else {
      console.log('⚠️  Price prediction endpoint may be missing');
    }
  } else {
    console.log('❌ AI Controller not found');
  }
  
  if (fs.existsSync(aiRoutesPath)) {
    console.log('✅ AI Routes found');
    
    const routesContent = fs.readFileSync(aiRoutesPath, 'utf-8');
    if (routesContent.includes('price-prediction')) {
      console.log('✅ Price prediction route configured');
    } else {
      console.log('⚠️  Price prediction route may be missing');
    }
  } else {
    console.log('❌ AI Routes not found');
  }
  
  // Check environment setup
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    console.log('✅ Environment file found');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const hasWatsonKey = envContent.includes('WATSONX_API_KEY');
    const hasProjectId = envContent.includes('WATSONX_PROJECT_ID');
    
    if (hasWatsonKey && hasProjectId) {
      console.log('✅ IBM Watson credentials configured');
    } else {
      console.log('⚠️  IBM Watson credentials may be incomplete');
      console.log('   Required: WATSONX_API_KEY, WATSONX_PROJECT_ID');
    }
  } else {
    console.log('⚠️  .env file not found (credentials may be in system environment)');
  }
  
  console.log('\n🚀 Startup Commands:');
  console.log('-'.repeat(30));
  
  if (packageJson.scripts) {
    if (packageJson.scripts.start) {
      console.log('✅ npm start available');
    }
    if (packageJson.scripts.dev) {
      console.log('✅ npm run dev available');
    }
    if (packageJson.scripts.build) {
      console.log('✅ npm run build available');
    }
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Set up environment variables (if needed)');
  console.log('3. Start the server: npm start');
  console.log('4. Test price prediction: node test-price-prediction.js');
  
  return true;
}

checkBackendSetup();
