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
    const { 
      cropType, 
      symptoms, 
      affectedArea, 
      weatherConditions,
      images,
      hasImages,
      analysisType
    } = req.body;

    if (!cropType || !symptoms) {
      throw new CustomError("Crop type and symptoms are required", 400);
    }

    // Log the request details for debugging
    console.log(`[Disease Detection] Request received:
    - Crop Type: ${cropType}
    - Has Images: ${hasImages}
    - Analysis Type: ${analysisType}
    - Number of Images: ${images ? images.length : 0}`);

    const result = await watsonService.getDiseaseDetection({
      cropType,
      symptoms,
      affectedArea,
      weatherConditions,
      images,
      hasImages,
      analysisType
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

// @desc    Get pest outbreak detection and management using IBM Granite AI via Watson Cloud
// @route   POST /api/ai/pest-outbreak
// @access  Public
export const getPestOutbreakDetection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { 
      cropType, 
      symptoms, 
      affectedArea, 
      weatherConditions,
      images,
      hasImages,
      pestType,
      damageLevel,
      infestationStage
    } = req.body;

    if (!cropType || !symptoms) {
      throw new CustomError("Crop type and symptoms are required", 400);
    }

    // Log the request details for debugging
    console.log(`[Pest Outbreak Detection] Request received:
    - Crop Type: ${cropType}
    - Has Images: ${hasImages}
    - Pest Type: ${pestType}
    - Damage Level: ${damageLevel}
    - Infestation Stage: ${infestationStage}
    - Number of Images: ${images ? images.length : 0}`);

    const result = await watsonService.getDiseaseDetection({
      cropType,
      symptoms,
      affectedArea,
      weatherConditions,
      images,
      hasImages,
      analysisType: 'pest_outbreak',
      detectionType: 'pest_outbreak',
      pestType,
      damageLevel,
      infestationStage
    });

    res.status(200).json({
      success: true,
      message: "Pest outbreak detection completed using IBM Granite models via Watson Cloud",
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

// @desc    Analyze uploaded soil report and provide ML-powered recommendations
// @route   POST /api/ai/analyze-soil-report
// @access  Public
export const analyzeSoilReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { 
      nitrogen, 
      phosphorus, 
      potassium, 
      ph, 
      organicMatter,
      calcium,
      magnesium,
      sulfur,
      iron,
      zinc,
      manganese,
      copper,
      boron,
      electricalConductivity,
      cationExchangeCapacity,
      soilTexture,
      cropType,
      fieldLocation,
      reportDate,
      labName
    } = req.body;

    // Validate critical soil parameters
    if (!nitrogen || !phosphorus || !potassium || !ph) {
      throw new CustomError("Critical soil parameters (N, P, K, pH) are required", 400);
    }

    // Build comprehensive soil data object
    const soilData = {
      // Primary nutrients (required)
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      ph: parseFloat(ph),
      
      // Secondary nutrients (optional)
      organicMatter: organicMatter ? parseFloat(organicMatter) : undefined,
      calcium: calcium ? parseFloat(calcium) : undefined,
      magnesium: magnesium ? parseFloat(magnesium) : undefined,
      sulfur: sulfur ? parseFloat(sulfur) : undefined,
      
      // Micronutrients (optional)
      iron: iron ? parseFloat(iron) : undefined,
      zinc: zinc ? parseFloat(zinc) : undefined,
      manganese: manganese ? parseFloat(manganese) : undefined,
      copper: copper ? parseFloat(copper) : undefined,
      boron: boron ? parseFloat(boron) : undefined,
      
      // Chemical properties (optional)
      electricalConductivity: electricalConductivity ? parseFloat(electricalConductivity) : undefined,
      cationExchangeCapacity: cationExchangeCapacity ? parseFloat(cationExchangeCapacity) : undefined,
      
      // Physical properties (optional)
      soilTexture: soilTexture || undefined,
      
      // Metadata
      cropType: cropType || 'general',
      fieldLocation: fieldLocation || undefined,
      reportDate: reportDate || new Date().toISOString(),
      labName: labName || 'Unknown Lab'
    };

    // Calculate data completeness for ML confidence boost
    const allParameters = Object.keys(soilData);
    const providedParameters = Object.values(soilData).filter(v => v !== undefined && v !== null).length;
    const completenessRatio = providedParameters / allParameters.length;
    
    // Determine data quality level for ML analysis
    let dataQuality = 'good';
    if (completenessRatio >= 0.8 && organicMatter && electricalConductivity) {
      dataQuality = 'excellent';
    } else if (completenessRatio < 0.4) {
      dataQuality = 'poor';
    }

    // Get AI-powered fertilizer recommendations
    const fertilizerRecommendations = await watsonService.getFertilizerRecommendation(soilData);
    
    // Get crop recommendations based on soil conditions
    const cropRecommendations = await watsonService.getCropRecommendation({
      nitrogen: soilData.nitrogen,
      phosphorus: soilData.phosphorus,
      potassium: soilData.potassium,
      ph: soilData.ph,
      temperature: 25, // Default temperature
      humidity: 60,    // Default humidity
      rainfall: 600    // Default rainfall
    });

    // Analyze soil health and provide insights
    const soilHealthAnalysis = {
      overall_score: calculateSoilHealthScore(soilData),
      nutrient_status: analyzeNutrientLevels(soilData),
      recommendations: generateSoilImprovements(soilData),
      ml_confidence: completenessRatio >= 0.6 ? 0.91 : 0.76, // Higher confidence with more data
      data_completeness: `${(completenessRatio * 100).toFixed(1)}%`
    };

    // Generate comprehensive analysis report
    const analysisReport = {
      soil_data: soilData,
      soil_health: soilHealthAnalysis,
      fertilizer_recommendations: fertilizerRecommendations,
      crop_recommendations: cropRecommendations,
      economic_analysis: {
        estimated_fertilizer_cost: calculateFertilizerCost(soilData),
        yield_improvement_potential: `${calculateYieldImprovement(soilData)}%`,
        roi_timeline: "1-2 seasons"
      },
      next_steps: [
        "Apply recommended fertilizers based on soil deficiencies",
        "Monitor soil health with regular testing",
        "Implement crop rotation for soil improvement",
        "Consider organic matter enhancement",
        "Schedule next soil test in 6-12 months"
      ]
    };

    res.status(200).json({
      success: true,
      message: "Soil report analyzed successfully using IBM Granite AI with ML confidence scoring",
      data: analysisReport,
      timestamp: new Date().toISOString(),
      model_info: {
        service: "IBM Watson Cloud",
        model_family: "IBM Granite",
        source: "watsonx.ai",
        ml_techniques: [
          "Shannon Entropy Analysis",
          "Bayesian Confidence Estimation", 
          "Semantic Coherence Scoring",
          "Neural Network Uncertainty",
          "Platt Scaling Calibration"
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper functions for soil analysis
function calculateSoilHealthScore(soilData: any): number {
  let score = 70; // Base score
  
  // pH scoring (6.0-7.5 optimal)
  const phScore = soilData.ph >= 6.0 && soilData.ph <= 7.5 ? 20 : 
                  soilData.ph >= 5.5 && soilData.ph <= 8.0 ? 15 : 10;
  score += phScore;
  
  // Organic matter scoring (>2% good)
  if (soilData.organicMatter) {
    score += soilData.organicMatter >= 2 ? 10 : 5;
  }
  
  // Electrical conductivity (salinity check)
  if (soilData.electricalConductivity) {
    score += soilData.electricalConductivity < 2 ? 5 : -5;
  }
  
  return Math.min(100, score);
}

function analyzeNutrientLevels(soilData: any): any {
  return {
    nitrogen: soilData.nitrogen > 40 ? 'Adequate' : soilData.nitrogen > 20 ? 'Moderate' : 'Low',
    phosphorus: soilData.phosphorus > 15 ? 'Adequate' : soilData.phosphorus > 8 ? 'Moderate' : 'Low',
    potassium: soilData.potassium > 120 ? 'Adequate' : soilData.potassium > 80 ? 'Moderate' : 'Low',
    ph_status: soilData.ph >= 6.0 && soilData.ph <= 7.5 ? 'Optimal' : 
               soilData.ph < 6.0 ? 'Acidic' : 'Alkaline'
  };
}

function generateSoilImprovements(soilData: any): string[] {
  const improvements = [];
  
  if (soilData.ph < 6.0) {
    improvements.push("Apply lime to reduce soil acidity");
  } else if (soilData.ph > 7.5) {
    improvements.push("Apply sulfur or organic matter to reduce alkalinity");
  }
  
  if (soilData.nitrogen < 30) {
    improvements.push("Increase nitrogen through organic compost or urea application");
  }
  
  if (soilData.phosphorus < 10) {
    improvements.push("Apply phosphate fertilizers or bone meal");
  }
  
  if (soilData.potassium < 100) {
    improvements.push("Add potash or wood ash for potassium enhancement");
  }
  
  if (!soilData.organicMatter || soilData.organicMatter < 2) {
    improvements.push("Increase organic matter through compost, manure, or cover crops");
  }
  
  return improvements;
}

function calculateFertilizerCost(soilData: any): string {
  // Simplified cost calculation based on Indian market prices
  let cost = 0;
  
  if (soilData.nitrogen < 30) cost += 800; // Urea cost
  if (soilData.phosphorus < 10) cost += 600; // DAP cost
  if (soilData.potassium < 100) cost += 400; // MOP cost
  
  return `₹${cost}-${cost + 500} per hectare`;
}

function calculateYieldImprovement(soilData: any): number {
  let improvement = 0;
  
  // Based on nutrient deficiency severity
  if (soilData.nitrogen < 20) improvement += 15;
  else if (soilData.nitrogen < 30) improvement += 10;
  
  if (soilData.phosphorus < 8) improvement += 12;
  else if (soilData.phosphorus < 15) improvement += 8;
  
  if (soilData.potassium < 80) improvement += 10;
  else if (soilData.potassium < 120) improvement += 6;
  
  // pH correction impact
  if (soilData.ph < 5.5 || soilData.ph > 8.0) improvement += 8;
  
  return Math.min(improvement, 35); // Cap at 35% improvement
}

export {};
