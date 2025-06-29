import { config } from "../src/config/config";
import { app } from "../src/app";
import connectDB from "../src/config/db";

// Initialize database connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await connectDB();
    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Vercel serverless function handler
export default async (req: any, res: any) => {
  try {
    // Ensure database is connected
    await connectToDatabase();
    
    // Handle the request using your Express app
    return app(req, res);
  } catch (error) {
    console.error("Serverless function error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// For local development
if (process.env.NODE_ENV !== "production") {
  const main = async () => {
    const PORT = config.port || 3600;
    console.log("PORT is this->:", PORT);

    await connectDB();
    console.log(config.mongoURI);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  };

  main();
}
