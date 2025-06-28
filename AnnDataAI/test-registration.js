// Test registration functionality
async function testRegistration() {
    const testUser = {
        name: "John Doe",
        email: "john.doe.test@example.com",
        password: "testpassword123"
    };

    try {
        console.log('Testing registration with data:', {
            name: testUser.name,
            email: testUser.email,
            password: '[HIDDEN]'
        });

        const response = await fetch('http://localhost:3600/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testUser)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Registration successful!');
            console.log('Response status:', response.status);
            console.log('Response data:', {
                success: data.success,
                message: data.message,
                user: data.user,
                tokenReceived: !!data.token
            });
        } else {
            console.log('❌ Registration failed!');
            console.log('Error status:', response.status);
            console.log('Error data:', data);
        }

        return data;

    } catch (error) {
        console.log('❌ Registration failed!');
        console.log('Error message:', error.message);
        throw error;
    }
}

async function testLogin() {
    const loginData = {
        email: "john.doe.test@example.com",
        password: "testpassword123"
    };

    try {
        console.log('\nTesting login with email:', loginData.email);

        const response = await fetch('http://localhost:3600/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Login successful!');
            console.log('Response status:', response.status);
            console.log('Response data:', {
                success: data.success,
                message: data.message,
                user: data.user,
                tokenReceived: !!data.token
            });
        } else {
            console.log('❌ Login failed!');
            console.log('Error status:', response.status);
            console.log('Error data:', data);
        }

        return data;

    } catch (error) {
        console.log('❌ Login failed!');
        console.log('Error message:', error.message);
        throw error;
    }
}

async function runTests() {
    console.log('🚀 Starting authentication tests...\n');
    
    try {
        // Test registration
        await testRegistration();
        
        // Test login
        await testLogin();
        
        console.log('\n🎉 All tests passed! Authentication system is working correctly.');
        
    } catch (error) {
        console.log('\n💥 Test failed. Please check the error messages above.');
    }
}

runTests();
