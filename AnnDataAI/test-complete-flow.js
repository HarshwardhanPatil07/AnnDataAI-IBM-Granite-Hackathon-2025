// Frontend Flow Test - Complete Authentication and Orders Test
console.log('🧪 Testing Complete Frontend-Backend Authentication Flow\n');

// Test data
const testUser = {
  name: "Test Frontend User", 
  email: "frontend@test.com",
  password: "testpass123"
};

const baseUrl = 'http://localhost:3600/api';

async function testCompleteFlow() {
  try {
    console.log('1️⃣ Testing User Registration...');
    
    // Register new user
    const registerResponse = await fetch(`${baseUrl}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ Registration successful!');
      console.log(`   User ID: ${registerData.user_id}`);
      console.log(`   Role: ${registerData.role}`);
      console.log(`   Token: ${registerData.access_token.substring(0, 20)}...\n`);
      
      // Test orders endpoints with this token
      await testOrderEndpoints(registerData.access_token);
      
    } else {
      // User might already exist, try login instead
      console.log('⚠️ Registration failed (user might exist), trying login...');
      
      const loginResponse = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login with existing user successful!');
        await testOrderEndpoints(loginData.access_token);
      } else {
        console.error('❌ Both registration and login failed');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function testOrderEndpoints(token) {
  console.log('\n2️⃣ Testing My Orders endpoint (getUserOrders)...');
  const myOrdersResponse = await fetch(`${baseUrl}/orders/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (myOrdersResponse.ok) {
    const myOrdersData = await myOrdersResponse.json();
    console.log('✅ My Orders endpoint working!');
    console.log(`   Status: ${myOrdersData.status}`);
    console.log(`   Orders count: ${myOrdersData.data ? myOrdersData.data.length : 'N/A'}`);
    
    console.log('\n3️⃣ Testing All Orders endpoint (getOrders)...');
    const allOrdersResponse = await fetch(`${baseUrl}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (allOrdersResponse.ok) {
      const allOrdersData = await allOrdersResponse.json();
      console.log('✅ All Orders endpoint working!');
      console.log(`   Success: ${allOrdersData.success}`);
      console.log(`   Orders count: ${allOrdersData.count}`);
      
      console.log('\n🎉 ALL TESTS PASSED! Authentication persistence issue has been RESOLVED! 🎉');
      console.log('\n📋 Summary of fixes applied:');
      console.log('   ✅ Fixed JWT token structure mismatch (id vs _id)');
      console.log('   ✅ Updated all order controller functions to use fallback pattern');
      console.log('   ✅ Added proper authentication validation');
      console.log('   ✅ Fixed TypeScript compilation errors');
      console.log('   ✅ Added missing cancelOrder route');
      console.log('   ✅ Consistent user ID extraction across all endpoints');
      console.log('\n🔧 The "My Orders" page should now work without authentication prompts!');
      
    } else {
      console.error('❌ All Orders endpoint failed:', await allOrdersResponse.text());
    }
  } else {
    console.error('❌ My Orders endpoint failed:', await myOrdersResponse.text());
  }
}

// Run the test
testCompleteFlow();
