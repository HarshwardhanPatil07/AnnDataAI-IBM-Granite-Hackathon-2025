import axios from 'axios';

interface CropRecommendationParams {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  state?: string;
  district?: string;
  soilType?: string;
  climate?: string;
  area?: string;
  season?: string;
}

interface DiseaseDetectionParams {
  cropType: string;
  symptoms: string;
  affectedArea: string;
  weatherConditions: string;
}

interface YieldPredictionParams {
  cropType: string;
  area: number;
  season: string;
  soilType: string;
  irrigationType: string;
  rainfall: number;
  temperature: number;
}

interface MarketAnalysisParams {
  cropType: string;
  region: string;
  currentPrice?: number;
  season: string;
}

// IBM Granite Models available on Hugging Face
const GRANITE_MODELS = {
  // For general text generation and analysis
  GRANITE_3_3_8B_INSTRUCT: 'ibm-granite/granite-3.3-8b-instruct',
  GRANITE_3_3_2B_INSTRUCT: 'ibm-granite/granite-3.3-2b-instruct',
  
  // For code generation and technical tasks
  GRANITE_3_0_8B_CODE_INSTRUCT: 'ibm-granite/granite-3.0-8b-code-instruct',
  
  // For specialized tasks
  GRANITE_GUARDIAN: 'ibm-granite/granite-guardian-3b-hap',
  
  // Latest models
  GRANITE_4_0_TINY: 'ibm-granite/granite-4.0-tiny-preview',
  
  // For time series (if needed)
  GRANITE_TIMESERIES: 'ibm-granite/granite-timeseries-tspulse-r1'
};

class HuggingFaceGraniteService {
  private apiKey: string;
  private baseURL: string = 'https://api-inference.huggingface.co/models/';

  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('Hugging Face API key is required. Please set HUGGINGFACE_API_KEY environment variable.');
    }
  }

  private async generateText(
    model: string, 
    prompt: string, 
    maxTokens: number = 500,
    temperature: number = 0.7
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseURL}${model}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            do_sample: true,
            top_p: 0.9,
            repetition_penalty: 1.1,
            return_full_text: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
        return response.data[0].generated_text.trim();
      } else if (response.data && response.data.generated_text) {
        return response.data.generated_text.trim();
      } else {
        throw new Error('Unexpected response format from Hugging Face API');
      }
    } catch (error: any) {
      console.error('Hugging Face API error:', error.response?.data || error.message);
      throw new Error(`Failed to generate text with IBM Granite model: ${error.message}`);
    }
  }

  private parseJsonResponse(text: string): any {
    try {
      // Try to find JSON in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON found, try to parse the entire response
      return JSON.parse(text);
    } catch (error) {
      // If parsing fails, return structured data based on text content
      return this.extractStructuredData(text);
    }
  }

  private extractStructuredData(text: string): any {
    // Extract structured information from text response
    const lines = text.split('\n').filter(line => line.trim());
    const result: any = {};

    for (const line of lines) {
      if (line.includes(':')) {
        const [key, value] = line.split(':').map(s => s.trim());
        result[key.toLowerCase().replace(/\s+/g, '_')] = value;
      }
    }

    return result;
  }

  async getCropRecommendation(params: CropRecommendationParams): Promise<any> {
    const prompt = `You are an expert agricultural AI assistant using IBM Granite models. Based on the following soil and environmental conditions, recommend the best crops to grow and provide detailed agricultural guidance.

Soil Conditions:
- Nitrogen: ${params.nitrogen} kg/ha
- Phosphorus: ${params.phosphorus} kg/ha  
- Potassium: ${params.potassium} kg/ha
- pH Level: ${params.ph}

Environmental Conditions:
- Temperature: ${params.temperature}°C
- Humidity: ${params.humidity}%
- Rainfall: ${params.rainfall}mm
${params.state ? `- State: ${params.state}` : ''}
${params.district ? `- District: ${params.district}` : ''}
${params.soilType ? `- Soil Type: ${params.soilType}` : ''}
${params.climate ? `- Climate: ${params.climate}` : ''}
${params.season ? `- Season: ${params.season}` : ''}

Please provide a comprehensive response in JSON format with the following structure:
{
  "recommended_crops": ["crop1", "crop2", "crop3"],
  "primary_recommendation": {
    "crop": "best_crop_name",
    "confidence": 0.95,
    "reasoning": "detailed explanation",
    "expected_yield": "yield estimate",
    "growing_season": "season info"
  },
  "soil_analysis": {
    "fertility_score": 0.85,
    "nutrient_status": "adequate/deficient/excess",
    "recommendations": ["soil improvement suggestions"]
  },
  "farming_tips": ["practical farming advice"],
  "market_potential": "market analysis for recommended crops"
}`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        prompt,
        800,
        0.7
      );

      const parsedResponse = this.parseJsonResponse(response);
      
      return {
        success: true,
        data: parsedResponse,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        confidence: parsedResponse.primary_recommendation?.confidence || 0.8
      };
    } catch (error: any) {
      console.error('Crop recommendation error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT
      };
    }
  }

  async detectPlantDisease(params: DiseaseDetectionParams): Promise<any> {
    const prompt = `You are an expert plant pathologist AI using IBM Granite models. Analyze the following symptoms and provide disease detection and treatment recommendations.

Plant Information:
- Crop Type: ${params.cropType}
- Symptoms: ${params.symptoms}
- Affected Area: ${params.affectedArea}
- Weather Conditions: ${params.weatherConditions}

Please provide a comprehensive disease analysis in JSON format:
{
  "disease_identification": {
    "primary_disease": "disease_name",
    "confidence": 0.90,
    "alternative_diseases": ["disease2", "disease3"],
    "disease_type": "fungal/bacterial/viral/pest/nutrient"
  },
  "symptoms_analysis": {
    "observed_symptoms": ["symptom1", "symptom2"],
    "severity": "mild/moderate/severe",
    "progression_stage": "early/mid/advanced"
  },
  "treatment_recommendations": {
    "immediate_actions": ["urgent steps"],
    "chemical_treatments": ["specific fungicides/pesticides"],
    "organic_treatments": ["natural alternatives"],
    "preventive_measures": ["future prevention"]
  },
  "environmental_factors": {
    "favorable_conditions": "conditions that favor this disease",
    "risk_assessment": "low/medium/high"
  },
  "recovery_timeline": "expected recovery time"
}`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        prompt,
        900,
        0.6
      );

      const parsedResponse = this.parseJsonResponse(response);
      
      return {
        success: true,
        data: parsedResponse,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        confidence: parsedResponse.disease_identification?.confidence || 0.85
      };
    } catch (error: any) {
      console.error('Disease detection error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT
      };
    }
  }

  async predictCropYield(params: YieldPredictionParams): Promise<any> {
    const prompt = `You are an expert agricultural yield prediction AI using IBM Granite models. Analyze the following farming conditions and predict crop yield with detailed insights.

Farming Parameters:
- Crop Type: ${params.cropType}
- Area: ${params.area} hectares
- Season: ${params.season}
- Soil Type: ${params.soilType}
- Irrigation Type: ${params.irrigationType}
- Rainfall: ${params.rainfall}mm
- Temperature: ${params.temperature}°C

Please provide a comprehensive yield prediction in JSON format:
{
  "yield_prediction": {
    "estimated_yield": "quantity per hectare",
    "total_production": "total quantity for given area",
    "confidence": 0.88,
    "yield_quality": "high/medium/low",
    "prediction_range": {
      "minimum": "lower estimate",
      "maximum": "upper estimate"
    }
  },
  "factors_analysis": {
    "positive_factors": ["factors favoring good yield"],
    "risk_factors": ["factors that may reduce yield"],
    "critical_factors": ["most important factors"]
  },
  "optimization_suggestions": {
    "irrigation_advice": "irrigation recommendations",
    "fertilizer_recommendations": ["NPK and other nutrients"],
    "timing_suggestions": ["planting/harvesting timing"],
    "pest_management": ["preventive measures"]
  },
  "market_insights": {
    "expected_price_range": "price per unit",
    "market_demand": "high/medium/low",
    "best_selling_time": "optimal time to sell"
  },
  "sustainability_score": 0.75
}`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        prompt,
        1000,
        0.6
      );

      const parsedResponse = this.parseJsonResponse(response);
      
      return {
        success: true,
        data: parsedResponse,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        confidence: parsedResponse.yield_prediction?.confidence || 0.8
      };
    } catch (error: any) {
      console.error('Yield prediction error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT
      };
    }
  }

  async analyzeCropMarketTrends(params: MarketAnalysisParams): Promise<any> {
    const prompt = `You are an expert agricultural market analyst AI using IBM Granite models. Analyze market trends and provide insights for the specified crop and region.

Market Parameters:
- Crop Type: ${params.cropType}
- Region: ${params.region}
- Season: ${params.season}
${params.currentPrice ? `- Current Price: ${params.currentPrice}` : ''}

Please provide comprehensive market analysis in JSON format:
{
  "market_analysis": {
    "current_market_status": "bullish/bearish/stable",
    "price_trend": "increasing/decreasing/stable",
    "demand_level": "high/medium/low",
    "supply_situation": "surplus/adequate/shortage"
  },
  "price_predictions": {
    "short_term": "next 1-3 months",
    "medium_term": "next 3-6 months",
    "seasonal_pattern": "typical seasonal price changes",
    "confidence": 0.82
  },
  "market_opportunities": {
    "best_selling_months": ["month1", "month2"],
    "target_markets": ["local/regional/export"],
    "value_addition": ["processing opportunities"],
    "competitive_advantages": ["factors favoring this crop"]
  },
  "risk_assessment": {
    "market_risks": ["potential challenges"],
    "mitigation_strategies": ["risk management approaches"],
    "alternative_crops": ["backup options"]
  },
  "recommendations": {
    "selling_strategy": "optimal selling approach",
    "storage_advice": "post-harvest handling",
    "quality_requirements": ["market quality standards"]
  }
}`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        prompt,
        900,
        0.7
      );

      const parsedResponse = this.parseJsonResponse(response);
      
      return {
        success: true,
        data: parsedResponse,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        confidence: parsedResponse.price_predictions?.confidence || 0.8
      };
    } catch (error: any) {
      console.error('Market analysis error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT
      };
    }
  }

  async getFertilizerRecommendation(soilData: any): Promise<any> {
    const prompt = `You are an expert soil scientist and fertilizer specialist AI using IBM Granite models. Based on the soil analysis data, provide detailed fertilizer recommendations.

Soil Analysis Data:
${JSON.stringify(soilData, null, 2)}

Please provide comprehensive fertilizer recommendations in JSON format:
{
  "fertilizer_recommendations": {
    "primary_fertilizers": [
      {
        "type": "NPK/Organic/Specialized",
        "composition": "N-P-K ratios",
        "quantity": "amount per hectare",
        "application_method": "broadcast/drill/foliar",
        "timing": "when to apply"
      }
    ],
    "secondary_nutrients": ["calcium/magnesium/sulfur needs"],
    "micronutrients": ["trace elements needed"]
  },
  "application_schedule": {
    "pre_planting": ["fertilizers to apply before planting"],
    "during_growth": ["side dressing recommendations"],
    "post_harvest": ["soil conditioning"]
  },
  "soil_improvement": {
    "organic_matter": "recommendations for organic content",
    "ph_adjustment": "lime/sulfur requirements",
    "soil_conditioning": ["soil structure improvement"]
  },
  "cost_analysis": {
    "estimated_cost": "total fertilizer cost",
    "cost_effectiveness": "ROI analysis",
    "budget_alternatives": ["lower cost options"]
  },
  "environmental_impact": {
    "sustainability_score": 0.85,
    "eco_friendly_alternatives": ["organic options"],
    "application_best_practices": ["environmental considerations"]
  }
}`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        prompt,
        1000,
        0.6
      );

      const parsedResponse = this.parseJsonResponse(response);
      
      return {
        success: true,
        data: parsedResponse,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        confidence: 0.85
      };
    } catch (error: any) {
      console.error('Fertilizer recommendation error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT
      };
    }
  }

  async getGeospatialAnalysis(location: any, cropType: string): Promise<any> {
    const prompt = `You are an expert geospatial analyst and precision agriculture AI using IBM Granite models. Analyze the geographic and environmental conditions for optimal crop management.

Location Data:
- Coordinates: ${location.lat}, ${location.lng}
- Crop Type: ${cropType}
- Additional Context: ${JSON.stringify(location, null, 2)}

Please provide comprehensive geospatial analysis in JSON format:
{
  "location_analysis": {
    "climate_zone": "climate classification",
    "growing_season": "optimal growing period",
    "environmental_suitability": 0.88,
    "risk_factors": ["geographic/climate risks"]
  },
  "precision_agriculture": {
    "field_mapping": "field characteristics",
    "variable_rate_application": "VRA recommendations",
    "precision_planting": "optimal planting patterns",
    "monitoring_points": ["key areas to monitor"]
  },
  "resource_optimization": {
    "water_management": "irrigation efficiency",
    "nutrient_management": "site-specific fertilization",
    "pest_monitoring": "location-based pest risks",
    "equipment_recommendations": ["suitable machinery"]
  },
  "sustainability_metrics": {
    "carbon_footprint": "environmental impact",
    "biodiversity_impact": "ecosystem considerations",
    "soil_health": "long-term soil sustainability",
    "water_conservation": "water use efficiency"
  },
  "technology_integration": {
    "sensor_recommendations": ["IoT sensors needed"],
    "drone_applications": ["aerial monitoring uses"],
    "satellite_monitoring": ["remote sensing benefits"],
    "data_analytics": ["key metrics to track"]
  }
}`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        prompt,
        1200,
        0.7
      );

      const parsedResponse = this.parseJsonResponse(response);
      
      return {
        success: true,
        data: parsedResponse,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT,
        confidence: 0.85
      };
    } catch (error: any) {
      console.error('Geospatial analysis error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_8B_INSTRUCT
      };
    }
  }

  async getChatbotResponse(message: string, context?: string): Promise<any> {
    const prompt = `You are AgriBot, an expert agricultural AI assistant powered by IBM Granite models. You provide helpful, accurate, and practical farming advice to farmers and agricultural professionals.

${context ? `Context: ${context}` : ''}

User Question: ${message}

Please provide a helpful and informative response about agriculture, farming, crop management, or related topics. Keep your response practical and actionable.

Response:`;

    try {
      const response = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_2B_INSTRUCT, // Using smaller model for faster chatbot responses
        prompt,
        500,
        0.8
      );

      return {
        success: true,
        data: {
          response: response,
          context: "agricultural_assistance",
          model_used: GRANITE_MODELS.GRANITE_3_3_2B_INSTRUCT
        },
        model_used: GRANITE_MODELS.GRANITE_3_3_2B_INSTRUCT,
        confidence: 0.9
      };
    } catch (error: any) {
      console.error('Chatbot response error:', error);
      return {
        success: false,
        error: error.message,
        model_used: GRANITE_MODELS.GRANITE_3_3_2B_INSTRUCT
      };
    }
  }

  // Helper method to get available models
  getAvailableModels(): typeof GRANITE_MODELS {
    return GRANITE_MODELS;
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      const testResponse = await this.generateText(
        GRANITE_MODELS.GRANITE_3_3_2B_INSTRUCT,
        'Test connection to IBM Granite model. Respond with "Connection successful".',
        50,
        0.1
      );
      return testResponse.includes('successful') || testResponse.length > 0;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default HuggingFaceGraniteService;
