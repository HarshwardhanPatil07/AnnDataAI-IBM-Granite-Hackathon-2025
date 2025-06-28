import express from "express";
import {
  getCropRecommendation,
  getDiseaseDetection,
  getYieldPrediction,
  getMarketAnalysis,
  getFertilizerRecommendation,
  chatWithAgriBot,
  getGeospatialAnalysis,
  getIrrigationRequirement,
  healthCheck
} from "../controllers/aiController";

const router = express.Router();

// Crop recommendation endpoint
router.post("/crop-recommendation", getCropRecommendation);

// Disease detection endpoint
router.post("/disease-detection", getDiseaseDetection);

// Yield prediction endpoint
router.post("/yield-prediction", getYieldPrediction);

// Market analysis endpoint
router.post("/market-analysis", getMarketAnalysis);

// Fertilizer recommendation endpoint
router.post("/fertilizer-recommendation", getFertilizerRecommendation);

// Chatbot endpoint
router.post("/chat", chatWithAgriBot);

// Geospatial analysis endpoint
router.post("/geospatial-analysis", getGeospatialAnalysis);

// Irrigation requirement endpoint
router.post("/irrigation-requirement", getIrrigationRequirement);

// Health check endpoint
router.get("/health", healthCheck);

export default router;
