import { Request, Response, NextFunction } from "express";
import IBMWatsonService from "../services/ibmWatsonService";
import { CustomError } from "../utils/error";

// Use IBM Watson Cloud service exclusively for IBM Granite models
// Using real Watson service with your API credentials
const watsonService = new IBMWatsonService();

// @desc    Get crop recommendations using IBM Granite AI via Watson Cloud
// @route   POST /api/ai/crop-recommendation
// @access  Public
export const getCropRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall, state, district, soilType, climate, area, season } = req.body;

    // Validate required fields
    if (!nitrogen || !phosphorus || !potassium || !temperature || !humidity || !ph || !rainfall) {
      throw new CustomError("All soil and environmental parameters are required", 400);
    }

    // Use Watson Cloud service with IBM Granite models
    const recommendations = await watsonService.getCropRecommendation({
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      ph,
      rainfall,
      state,
      district,
      soilType,
      climate,
      area,
      season
    });

    res.status(200).json({
      success: true,
      message: "Crop recommendations generated successfully using IBM Granite models via Watson Cloud",
      data: recommendations,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get disease detection and treatment using IBM Granite AI via Watson Cloud
// @route   POST /api/ai/disease-detection
// @access  Public
export const getDiseaseDetection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropType, symptoms, affectedArea, weatherConditions } = req.body;

    if (!cropType || !symptoms) {
      throw new CustomError("Crop type and symptoms are required", 400);
    }

    const result = await watsonService.getDiseaseDetection({
      cropType,
      symptoms,
      affectedArea,
      weatherConditions
    });

    res.status(200).json({
      success: true,
      message: "Disease detection completed using IBM Granite models via Watson Cloud",
      data: result,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get yield prediction using IBM Granite AI via Watson Cloud
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

    const result = await watsonService.getYieldPrediction({
      cropType,
      area,
      season,
      soilType,
      irrigationType,
      rainfall,
      temperature
    });

    res.status(200).json({
      success: true,
      message: "Yield prediction completed using IBM Granite models via Watson Cloud",
      data: result,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get market analysis using IBM Granite AI via Watson Cloud
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

    const result = await watsonService.getMarketAnalysis({
      cropType,
      region,
      currentPrice,
      season
    });

    res.status(200).json({
      success: true,
      message: "Market analysis completed using IBM Granite models via Watson Cloud",
      data: result,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get fertilizer recommendations using IBM Granite AI via Watson Cloud
// @route   POST /api/ai/fertilizer-recommendation
// @access  Public
export const getFertilizerRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const soilData = req.body;

    if (!soilData || Object.keys(soilData).length === 0) {
      throw new CustomError("Soil data is required", 400);
    }

    const result = await watsonService.getFertilizerRecommendation(soilData);

    res.status(200).json({
      success: true,
      message: "Fertilizer recommendations generated using IBM Granite models via Watson Cloud",
      data: result,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Chat with AgriBot powered by IBM Granite AI via Watson Cloud
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

    // Use Watson Cloud service directly for chatbot with IBM Granite models
    const response = await watsonService.getChatbotResponse(message, context);
    
    res.status(200).json({
      success: true,
      message: "Chat response generated using IBM Granite models via Watson Cloud",
      data: {
        response: response,
        context: context
      },
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get geospatial crop analysis using IBM Granite AI via Watson Cloud
// @route   POST /api/ai/geospatial-analysis
// @access  Public
export const getGeospatialAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { location, cropType } = req.body;

    if (!location || !cropType) {
      throw new CustomError("Location and crop type are required", 400);
    }

    const result = await watsonService.getGeospatialAnalysis({ location, cropType });

    res.status(200).json({
      success: true,
      message: "Geospatial analysis completed using IBM Granite models via Watson Cloud",
      data: result,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get irrigation water requirement using IBM Granite AI via Watson Cloud
// @route   POST /api/ai/irrigation-requirement
// @access  Public
export const getIrrigationRequirement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cropType, soilType, climate, area, season } = req.body;

    if (!cropType) {
      throw new CustomError("Crop type is required", 400);
    }

    // Create a prompt for irrigation requirements since there's no specific method
    const prompt = `Calculate irrigation water requirements for:
    Crop: ${cropType}
    Soil Type: ${soilType || 'Unknown'}
    Climate: ${climate || 'Unknown'}
    Area: ${area || 'Unknown'}
    Season: ${season || 'Unknown'}
    
    Provide detailed irrigation scheduling and water requirements.`;

    const result = await watsonService.generateText(prompt);

    res.status(200).json({
      success: true,
      message: "Irrigation requirements calculated using IBM Granite models via Watson Cloud",
      data: {
        recommendation: result,
        parameters: { cropType, soilType, climate, area, season }
      },
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai"
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Health check for IBM Granite AI services via Watson Cloud
// @route   GET /api/ai/health
// @access  Public
export const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Test the Watson service
    const watsonStatus = {
      available: true,
      service: "IBM Watson Cloud",
      model_family: "IBM Granite",
      error: null as string | null
    };

    try {
      // Try a simple text generation to verify Watson service
      await watsonService.generateText("Health check test");
      watsonStatus.available = true;
    } catch (error) {
      watsonStatus.available = false;
      watsonStatus.error = error instanceof Error ? error.message : "Unknown error";
    }
    
    res.status(200).json({
      success: true,
      message: "Health check completed for IBM Granite AI via Watson Cloud",
      data: {
        status: watsonStatus,
        primaryService: "IBM Watson Cloud",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

export {};
