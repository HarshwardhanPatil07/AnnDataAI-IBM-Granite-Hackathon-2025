const axios = require('axios');

const BASE_URL = 'http://localhost:3600/api';

async function testAuthenticationFix() {
  console.log('🧪 Testing Authentication Fixes...\n');

  try {
    // Step 1: Login to get token
    console.log('1️⃣ Attempting login...');
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: 'admin@gmail.com',
      password: 'Admin$123'
    });

    const { access_token, user_id, role } = loginResponse.data;
    console.log('✅ Login successful!');
    console.log(`   Token: ${access_token.substring(0, 20)}...`);
    console.log(`   User ID: ${user_id}`);
    console.log(`   Role: ${role}\n`);

    // Step 2: Test getUserOrders endpoint
    console.log('2️⃣ Testing getUserOrders endpoint...');
    const ordersResponse = await axios.get(`${BASE_URL}/orders/user`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ getUserOrders successful!');
    console.log(`   Response: ${JSON.stringify(ordersResponse.data, null, 2)}\n`);

    // Step 3: Test getOrders endpoint
    console.log('3️⃣ Testing getOrders endpoint...');
    const allOrdersResponse = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ getOrders successful!');
    console.log(`   Response: ${JSON.stringify(allOrdersResponse.data, null, 2)}\n`);

    console.log('🎉 All authentication tests passed! The fixes are working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response ? error.response.data : error.message);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
}

testAuthenticationFix();
