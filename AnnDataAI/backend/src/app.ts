import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/config";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import aiRoutes from "./routes/aiRoutes";

// Create Express app
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Increased limit for image uploads
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://localhost:3000",
      // Add your Vercel domain here when you get it
      // "https://your-app-name.vercel.app",
      // For now, allow all origins (⚠️ not secure for production)
      "*"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

// Logging in development mode
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "AnnDataAI API is running",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(globalErrorHandler);

// Export app
export { app };
