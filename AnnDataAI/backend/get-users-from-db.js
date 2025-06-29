const mongoose = require('mongoose');
const User = require('./models/userModel');
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_URL || 'mongodb://localhost:27017/anndataai', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Function to get all users from database
const getAllUsers = async () => {
  try {
    await connectDB();
    
    console.log('\n🔍 Fetching all users from database...\n');
    
    // Get all users (without password for security)
    const users = await User.find({}).select('-password');
    
    if (users.length === 0) {
      console.log('❌ No users found in the database.');
      console.log('\n💡 You may need to:');
      console.log('   1. Register some users through the frontend');
      console.log('   2. Check if the database connection URL is correct');
      console.log('   3. Verify the database name');
    } else {
      console.log(`✅ Found ${users.length} users in the database:\n`);
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. User Details:`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   👤 Name: ${user.name}`);
        console.log(`   🔐 Role: ${user.role}`);
        console.log(`   📅 Created: ${user.createdAt ? user.createdAt.toISOString().split('T')[0] : 'N/A'}`);
        console.log(`   🆔 ID: ${user._id}`);
        console.log('   ⚠️  Password: [HASHED - Cannot be retrieved]');
        console.log('   ---');
      });
      
      console.log('\n📝 Notes:');
      console.log('   • Passwords are hashed and cannot be retrieved');
      console.log('   • To test login, use known credentials or register new users');
      console.log('   • Admin users have role "admin", regular users have role "farmer"');
    }
    
    // Check for the hardcoded admin account
    const adminUser = await User.findOne({ email: 'admin@gmail.com' });
    if (adminUser) {
      console.log('\n🔧 Hardcoded Admin Account Found:');
      console.log('   📧 Email: admin@gmail.com');
      console.log('   🔑 Password: Admin$123');
      console.log('   👤 Role: admin');
      console.log('   ⚠️  This is a development/testing account');
    } else {
      console.log('\n🔧 Hardcoded Admin Account Status:');
      console.log('   📧 Email: admin@gmail.com (not in database yet)');
      console.log('   🔑 Password: Admin$123');
      console.log('   👤 Role: admin (will be created on first login)');
      console.log('   ⚠️  This is a development/testing account');
    }
    
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
};

// Function to create a test user for demonstration
const createTestUser = async () => {
  try {
    await connectDB();
    
    console.log('\n🛠️  Creating a test user...\n');
    
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!',
      role: 'farmer'
    };
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('⚠️  Test user already exists:');
      console.log(`   📧 Email: ${testUser.email}`);
      console.log(`   🔑 Password: ${testUser.password}`);
      console.log(`   👤 Role: ${existingUser.role}`);
    } else {
      const newUser = await User.create(testUser);
      console.log('✅ Test user created successfully:');
      console.log(`   📧 Email: ${testUser.email}`);
      console.log(`   🔑 Password: ${testUser.password}`);
      console.log(`   👤 Role: ${newUser.role}`);
      console.log(`   🆔 ID: ${newUser._id}`);
    }
    
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Main function
const main = async () => {
  console.log('🚀 AnnDataAI User Database Inspector\n');
  console.log('====================================\n');
  
  const action = process.argv[2];
  
  if (action === 'create-test') {
    await createTestUser();
  } else {
    await getAllUsers();
  }
};

// Run the script
main();
