import { Request, Response, NextFunction } from "express";
import IBMWatsonService from "../services/ibmWatsonService";
import { CustomError } from "../utils/error";

const watsonService = new IBMWatsonService();

// @desc    Get crop recommendations using IBM Granite AI
// @route   POST /api/ai/crop-recommendation
// @access  Public
export const getCropRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall, state, district } = req.body;

    // Validate required fields
    if (!nitrogen || !phosphorus || !potassium || !temperature || !humidity || !ph || !rainfall) {
      throw new CustomError("All soil and environmental parameters are required", 400);
    }

    const recommendations = await watsonService.getCropRecommendation({
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
      state,
      district
    });

    res.status(200).json({
      success: true,
      message: "Crop recommendations generated successfully",
      data: recommendations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get disease detection and treatment using IBM Granite AI
// @route   POST /api/ai/disease-detection
// @access  Public
export const getDiseaseDetection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { symptoms, cropType, affectedArea, weatherConditions } = req.body;

    if (!symptoms || !cropType) {
      throw new CustomError("Symptoms and crop type are required", 400);
    }

    const diagnosis = await watsonService.getDiseaseDetection({
      symptoms,
      cropType,
      affectedArea: affectedArea || "Not specified",
      weatherConditions: weatherConditions || "Not specified"
    });

    res.status(200).json({
      success: true,
      message: "Disease diagnosis completed successfully",
      data: diagnosis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get yield prediction using IBM Granite AI
// @route   POST /api/ai/yield-prediction
// @access  Public
export const getYieldPrediction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropType, area, season, soilType, irrigationType, rainfall, temperature } = req.body;

    if (!cropType || !area || !season) {
      throw new CustomError("Crop type, area, and season are required", 400);
    }

    const prediction = await watsonService.getYieldPrediction({
      cropType,
      area,
      season,
      soilType: soilType || "Mixed",
      irrigationType: irrigationType || "Rain-fed",
      rainfall: rainfall || 0,
      temperature: temperature || 25
    });

    res.status(200).json({
      success: true,
      message: "Yield prediction completed successfully",
      data: prediction,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get market analysis using IBM Granite AI
// @route   POST /api/ai/market-analysis
// @access  Public
export const getMarketAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropType, region, currentPrice, season } = req.body;

    if (!cropType || !region) {
      throw new CustomError("Crop type and region are required", 400);
    }

    const analysis = await watsonService.getMarketAnalysis({
      cropType,
      region,
      currentPrice: currentPrice || 0,
      season: season || "Current"
    });

    res.status(200).json({
      success: true,
      message: "Market analysis completed successfully",
      data: analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get fertilizer recommendations using IBM Granite AI
// @route   POST /api/ai/fertilizer-recommendation
// @access  Public
export const getFertilizerRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const soilData = req.body;

    if (!soilData.nitrogen || !soilData.phosphorus || !soilData.potassium || !soilData.ph) {
      throw new CustomError("Complete soil analysis data is required", 400);
    }

    const recommendations = await watsonService.getFertilizerRecommendation(soilData);

    res.status(200).json({
      success: true,
      message: "Fertilizer recommendations generated successfully",
      data: recommendations,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Chat with AgriBot powered by IBM Granite AI
// @route   POST /api/ai/chat
// @access  Public
export const chatWithAgriBot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      throw new CustomError("Message is required", 400);
    }

    const response = await watsonService.getChatbotResponse(message, context);

    res.status(200).json({
      success: true,
      message: "Chat response generated successfully",
      data: {
        response,
        source: "IBM Granite AI",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get geospatial crop analysis using IBM Granite AI
// @route   POST /api/ai/geospatial-analysis
// @access  Public
export const getGeospatialAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropType, district, state, season, year } = req.body;

    if (!cropType || !district || !state) {
      throw new CustomError("Crop type, district, and state are required", 400);
    }

    const prompt = `Analyze the geospatial crop patterns for the following parameters:

Crop: ${cropType}
District: ${district}
State: ${state}
Season: ${season || 'Current'}
Year: ${year || 'Current'}

Please provide:
1. Historical crop production trends
2. Area under cultivation analysis
3. Yield patterns over time
4. Seasonal variations
5. Comparison with neighboring districts
6. Recommendations for optimization

Format as a comprehensive geospatial analysis report.`;

    const analysis = await watsonService.generateText(prompt);

    res.status(200).json({
      success: true,
      message: "Geospatial analysis completed successfully",
      data: {
        analysis,
        parameters: { cropType, district, state, season, year },
        source: "IBM Granite AI",
        confidence: 0.80
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get irrigation water requirement using IBM Granite AI
// @route   POST /api/ai/irrigation-requirement
// @access  Public
export const getIrrigationRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropType, growthStage, soilType, weather, area } = req.body;

    if (!cropType || !growthStage) {
      throw new CustomError("Crop type and growth stage are required", 400);
    }

    const prompt = `Calculate irrigation water requirements for the following crop:

Crop: ${cropType}
Growth Stage: ${growthStage}
Soil Type: ${soilType || 'Mixed'}
Weather: ${JSON.stringify(weather || {})}
Area: ${area || 1} hectares

Please provide:
1. Daily water requirement (liters/day)
2. Total irrigation schedule
3. Frequency of irrigation
4. Best irrigation timing
5. Water conservation methods
6. Efficiency optimization tips

Calculate specific water quantities and schedules.`;

    const analysis = await watsonService.generateText(prompt);

    res.status(200).json({
      success: true,
      message: "Irrigation requirement analysis completed successfully",
      data: {
        analysis,
        parameters: { cropType, growthStage, soilType, area },
        source: "IBM Granite AI"
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
