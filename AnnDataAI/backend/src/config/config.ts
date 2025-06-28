import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3601", 10),
  mongoURI:
    process.env.MONGO_CONNECTION_URL || "mongodb://localhost:27017/agri-ai",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  
  // IBM Watson AI Configuration
  ibmApiKey: process.env.IBM_CLOUD_API_KEY,
  ibmProjectId: process.env.IBM_WATSONX_PROJECT_ID,
  ibmWatsonUrl: process.env.IBM_WATSONX_URL || "https://us-south.ml.cloud.ibm.com",
};
