import mongoose from 'mongoose';
import User, { IUser } from './models/userModel';
import { config } from './config/config';
import colors from 'colors';

// Enable colors
colors.enable();

// Function to connect to database
const connectDB = async (): Promise<boolean> => {
  try {
    const conn = await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    return true;
  } catch (error) {
    const err = error as Error;
    console.error(`Error connecting to MongoDB: ${err.message}`.red.bold);
    return false;
  }
};

// Function to get all users from database
const getAllUsers = async (): Promise<void> => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.log('❌ Failed to connect to database'.red);
      return;
    }
    
    console.log('\n🔍 Fetching all users from database...\n'.yellow);
    
    // Get all users (without password for security)
    const users: IUser[] = await User.find({}).select('-password');
    
    if (users.length === 0) {
      console.log('❌ No users found in the database.'.red);
      console.log('\n💡 You may need to:'.yellow);
      console.log('   1. Register some users through the frontend');
      console.log('   2. Check if the database connection URL is correct');
      console.log('   3. Verify the database name');
      console.log(`   4. Current MongoDB URI: ${config.mongoURI}`.gray);
    } else {
      console.log(`✅ Found ${users.length} users in the database:\n`.green);
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. User Details:`.cyan);
        console.log(`   📧 Email: ${user.email}`.white);
        console.log(`   👤 Name: ${user.name}`.white);
        console.log(`   🔐 Role: ${user.role}`.white);
        console.log(`   📅 Created: ${user.createdAt ? user.createdAt.toISOString().split('T')[0] : 'N/A'}`.white);
        console.log(`   🆔 ID: ${user._id}`.white);
        console.log('   ⚠️  Password: [HASHED - Cannot be retrieved]'.yellow);
        console.log('   ---'.gray);
      });
      
      console.log('\n📝 Notes:'.yellow);
      console.log('   • Passwords are hashed and cannot be retrieved');
      console.log('   • To test login, use known credentials or register new users');
      console.log('   • Admin users have role "admin", regular users have role "farmer"');
    }
    
    // Check for the hardcoded admin account
    const adminUser = await User.findOne({ email: 'admin@gmail.com' });
    if (adminUser) {
      console.log('\n🔧 Hardcoded Admin Account Found:'.green);
      console.log('   📧 Email: admin@gmail.com'.white);
      console.log('   🔑 Password: Admin$123'.white);
      console.log(`   👤 Role: ${adminUser.role}`.white);
      console.log('   ⚠️  This is a development/testing account'.yellow);
    } else {
      console.log('\n🔧 Hardcoded Admin Account Status:'.yellow);
      console.log('   📧 Email: admin@gmail.com (not in database yet)'.white);
      console.log('   🔑 Password: Admin$123'.white);
      console.log('   👤 Role: admin (will be created on first login)'.white);
      console.log('   ⚠️  This is a development/testing account'.yellow);
    }
    
    // Show test users that might exist from test scripts
    console.log('\n🧪 Common Test Accounts:'.cyan);
    const testEmails = [
      'test@example.com',
      'john.doe.test@example.com', 
      'frontend@test.com',
      'john.doe@example.com',
      'jane.smith@example.com'
    ];
    
    for (const email of testEmails) {
      const testUser = await User.findOne({ email });
      if (testUser) {
        console.log(`   ✅ ${email} (Role: ${testUser.role})`.green);
      } else {
        console.log(`   ❌ ${email} (Not found)`.gray);
      }
    }
    
  } catch (error) {
    const err = error as Error;
    console.error(`❌ Error fetching users: ${err.message}`.red);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.'.gray);
  }
};

// Function to create a test user for demonstration
const createTestUser = async (): Promise<void> => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.log('❌ Failed to connect to database'.red);
      return;
    }
    
    console.log('\n🛠️  Creating a test user...\n'.yellow);
    
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!',
      role: 'farmer'
    };
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('⚠️  Test user already exists:'.yellow);
      console.log(`   📧 Email: ${testUser.email}`.white);
      console.log(`   🔑 Password: ${testUser.password}`.white);
      console.log(`   👤 Role: ${existingUser.role}`.white);
    } else {
      const newUser = await User.create(testUser);
      console.log('✅ Test user created successfully:'.green);
      console.log(`   📧 Email: ${testUser.email}`.white);
      console.log(`   🔑 Password: ${testUser.password}`.white);
      console.log(`   👤 Role: ${newUser.role}`.white);
      console.log(`   🆔 ID: ${newUser._id}`.white);
    }
    
  } catch (error) {
    const err = error as Error;
    console.error(`❌ Error creating test user: ${err.message}`.red);
  } finally {
    await mongoose.connection.close();
  }
};

// Function to reset admin password (create admin if doesn't exist)
const resetAdminPassword = async (): Promise<void> => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.log('❌ Failed to connect to database'.red);
      return;
    }
    
    console.log('\n🔧 Setting up admin account...\n'.yellow);
    
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Admin$123';
    
    // Check if admin user exists
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (adminUser) {
      // Update existing admin
      adminUser.password = adminPassword;
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('✅ Admin account updated:'.green);
    } else {
      // Create new admin
      adminUser = await User.create({
        name: 'System Administrator',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('✅ Admin account created:'.green);
    }
    
    console.log(`   📧 Email: ${adminEmail}`.white);
    console.log(`   🔑 Password: ${adminPassword}`.white);
    console.log(`   👤 Role: ${adminUser.role}`.white);
    console.log(`   🆔 ID: ${adminUser._id}`.white);
    
  } catch (error) {
    const err = error as Error;
    console.error(`❌ Error setting up admin: ${err.message}`.red);
  } finally {
    await mongoose.connection.close();
  }
};

// Main function
const main = async (): Promise<void> => {
  console.log('🚀 AnnDataAI User Database Inspector'.cyan.bold);
  console.log('====================================\n'.cyan);
  
  const action = process.argv[2];
  
  switch (action) {
    case 'create-test':
      await createTestUser();
      break;
    case 'reset-admin':
      await resetAdminPassword();
      break;
    case 'help':
      console.log('Available commands:'.yellow);
      console.log('  npm run db:users           - List all users');
      console.log('  npm run db:users create-test - Create test user');
      console.log('  npm run db:users reset-admin - Reset admin account');
      console.log('  npm run db:users help        - Show this help');
      break;
    default:
      await getAllUsers();
  }
};

// Run the script
main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});
