import express from "express";
import {
  getCropRecommendation,
  getDiseaseDetection,
  getPestOutbreakDetection,
  getYieldPrediction,
  getMarketAnalysis,
  getFertilizerRecommendation,
  chatWithAgriBot,
  getGeospatialAnalysis,
  getIrrigationRequirement,
  analyzeSoilReport,
  getCropSwappingStrategy,
  getLoanRecommendation,
  getGovernmentSchemes,
  getFarmerEducation,
  healthCheck
} from "../controllers/aiController";

const router = express.Router();

// Crop recommendation endpoint
router.post("/crop-recommendation", getCropRecommendation);

// Disease detection endpoint
router.post("/disease-detection", getDiseaseDetection);

// Pest outbreak detection endpoint
router.post("/pest-outbreak", getPestOutbreakDetection);

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

// Soil report analysis endpoint
router.post("/analyze-soil-report", analyzeSoilReport);

// Crop swapping strategy endpoint
router.post("/crop-swapping-strategy", getCropSwappingStrategy);

// Loan recommendation endpoint
router.post("/loan-recommendation", getLoanRecommendation);

// Government schemes recommendation endpoint
router.post("/government-schemes", getGovernmentSchemes);

// Farmer education endpoint
router.post("/farmer-education", getFarmerEducation);

// Health check endpoint
router.get("/health", healthCheck);

export default router;
