import { WatsonXAI } from '@ibm-cloud/watsonx-ai';

interface CropRecommendationParams {
  soilType: string;
  climate: string;
  rainfall: number;
  temperature: number;
  area: string;
  season: string;
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

class IBMWatsonService {
  private watsonxAI: WatsonXAI;
  private projectId: string;

  constructor() {
    this.watsonxAI = WatsonXAI.newInstance({
      authenticator: process.env.WATSONX_AUTHENTICATOR || 'iam',
      serviceUrl: process.env.WATSONX_URL || 'https://us-south.ml.cloud.ibm.com'
    });
    this.projectId = process.env.WATSONX_PROJECT_ID || '';
  }

  private async generateText(prompt: string, modelId: string = 'ibm/granite-13b-instruct-v2'): Promise<string> {
    try {
      const params = {
        input: prompt,
        modelId,
        projectId: this.projectId,
        parameters: {
          decoding_method: 'greedy',
          max_new_tokens: 1000,
          min_new_tokens: 1,
          stop_sequences: [],
          repetition_penalty: 1.05
        }
      };

      const response = await this.watsonxAI.generateText(params);
      return response.result?.results?.[0]?.generated_text || 'No response generated';
    } catch (error) {
      console.error('Error generating text from IBM Watson:', error);
      throw new Error('Failed to generate response from IBM Watson AI');
    }
  }

  async getCropRecommendation(params: CropRecommendationParams): Promise<any> {
    const prompt = `As an agricultural expert, recommend the best crops for the following conditions:

Soil Type: ${params.soilType}
Climate: ${params.climate}
Average Rainfall: ${params.rainfall}mm
Temperature: ${params.temperature}°C
Area: ${params.area}
Season: ${params.season}

Please provide:
1. Top 3 recommended crops with reasons
2. Expected yield estimates
3. Water requirements
4. Fertilizer recommendations
5. Best planting and harvesting times
6. Market demand insights

Format the response clearly with numbered sections.`;

    const response = await this.generateText(prompt);
    
    return {
      recommendations: this.parseCropRecommendations(response),
      rawResponse: response,
      confidence: 0.85,
      source: 'IBM Granite AI'
    };
  }

  async getDiseaseDetection(params: DiseaseDetectionParams): Promise<any> {
    const prompt = `As an agricultural expert, analyze the following plant disease symptoms and provide diagnosis and treatment recommendations:

Crop Details:
- Crop Type: ${params.cropType}
- Symptoms: ${params.symptoms}
- Affected Area: ${params.affectedArea}
- Weather Conditions: ${params.weatherConditions}

Please provide:
1. Most likely disease diagnosis
2. Confidence level of diagnosis
3. Immediate treatment steps
4. Preventive measures for future
5. Organic treatment alternatives
6. Expected recovery timeline

Format the response with clear sections for easy understanding.`;

    const response = await this.generateText(prompt);
    
    return {
      diagnosis: this.parseDiseaseDetection(response),
      rawResponse: response,
      confidence: 0.82,
      source: 'IBM Granite AI'
    };
  }

  async getYieldPrediction(params: YieldPredictionParams): Promise<any> {
    const prompt = `Predict the crop yield based on the following agricultural parameters:

Crop Information:
- Crop Type: ${params.cropType}
- Cultivation Area: ${params.area} hectares
- Season: ${params.season}
- Soil Type: ${params.soilType}
- Irrigation: ${params.irrigationType}

Environmental Conditions:
- Rainfall: ${params.rainfall} mm
- Temperature: ${params.temperature}°C

Please provide:
1. Expected yield per hectare
2. Total expected production
3. Quality grade prediction
4. Factors affecting yield
5. Optimization suggestions
6. Risk assessment

Provide numerical estimates where possible.`;

    const response = await this.generateText(prompt);
    
    return {
      prediction: this.parseYieldPrediction(response),
      rawResponse: response,
      confidence: 0.78,
      source: 'IBM Granite AI'
    };
  }

  async getMarketAnalysis(params: any): Promise<any> {
    const prompt = `Analyze the market conditions and provide pricing recommendations for the following:

Market Information:
- Crop: ${params.cropType}
- Region: ${params.region || 'General'}
- Current Price: ${params.currentPrice ? `₹${params.currentPrice} per kg` : 'Market rate'}
- Season: ${params.season || 'Current'}
- Type: ${params.type || 'price_prediction'}

Please provide:
1. Price trend analysis
2. Best selling timing recommendation
3. Market demand forecast
4. Storage vs immediate sale advice
5. Alternative market channels
6. Price risk factors

Include specific recommendations for maximizing farmer profits.`;

    const response = await this.generateText(prompt);
    
    return {
      analysis: response,
      recommendations: this.parseMarketAnalysis(response),
      confidence: 0.75,
      source: 'IBM Granite AI'
    };
  }

  async getFertilizerRecommendation(soilData: any): Promise<any> {
    const prompt = `Based on the soil analysis, recommend appropriate fertilizers:

Soil Analysis:
- N (Nitrogen): ${soilData.nitrogen} ppm
- P (Phosphorus): ${soilData.phosphorus} ppm
- K (Potassium): ${soilData.potassium} ppm
- pH: ${soilData.ph}
- Organic Matter: ${soilData.organicMatter}%
- Soil Type: ${soilData.soilType}

Please recommend:
1. NPK ratio needed
2. Organic fertilizer options
3. Application timing and methods
4. Dosage per hectare
5. Cost-effective alternatives
6. Soil improvement suggestions`;

    const response = await this.generateText(prompt);
    
    return {
      recommendations: response,
      confidence: 0.88,
      source: 'IBM Granite AI'
    };
  }

  async getGeospatialAnalysis(params: any): Promise<any> {
    const prompt = `Perform geospatial crop analysis for the given location and crop parameters:

Location Details:
- Latitude: ${params.latitude}
- Longitude: ${params.longitude}
- Crop Type: ${params.cropType}
- Analysis Type: ${params.analysisType}

Please analyze and provide:
1. Soil quality assessment for the coordinates
2. Climate suitability for the crop
3. Topographical factors affecting growth
4. Water availability assessment
5. Risk factors (flooding, drought, pests)
6. Recommendations for optimal cultivation
7. Yield potential for the location

Provide specific insights based on the geographic location and crop type.`;

    const response = await this.generateText(prompt);
    
    return {
      analysis: response,
      recommendations: response,
      confidence: 0.80,
      source: 'IBM Granite AI'
    };
  }

  async getIrrigationRequirement(params: any): Promise<any> {
    const prompt = `Calculate irrigation water requirements based on the following parameters:

Crop Information:
- Crop Type: ${params.cropType}
- Area: ${params.area} hectares
- Growth Stage: Current season (${params.season})
- Soil Type: ${params.soilType}

Environmental Conditions:
- Temperature: ${params.temperature}°C
- Humidity: ${params.humidity}%
- Annual Rainfall: ${params.rainfall}mm
- Location: ${params.location}

Please provide:
1. Daily water requirement per hectare
2. Total water requirement for the season
3. Irrigation scheduling recommendations
4. Water conservation techniques
5. Efficient irrigation methods
6. Cost analysis for different irrigation systems
7. Seasonal water management plan

Include specific calculations and practical recommendations.`;

    const response = await this.generateText(prompt);
    
    return {
      analysis: response,
      waterRequirement: response,
      recommendations: response,
      confidence: 0.85,
      source: 'IBM Granite AI'
    };
  }

  async getChatbotResponse(message: string, context?: any): Promise<string> {
    const systemPrompt = `You are AgriBot, an AI-powered farming assistant powered by IBM Granite. Your job is to provide accurate, context-aware, and professional responses to user queries related to agriculture, crop management, soil health, pest control, weather impact, and sustainable farming practices. Align your responses with modern agricultural guidelines and best practices.

Current Context: ${context ? JSON.stringify(context) : 'No specific context provided'}

User Question: ${message}

Provide a helpful, informative response in a conversational tone. Focus on practical advice that farmers can implement.`;

    return await this.generateText(systemPrompt, 'ibm/granite-13b-chat-v2');
  }

  // Helper methods to parse responses
  private parseCropRecommendations(response: string): any {
    const lines = response.split('\n').filter(line => line.trim());
    const recommendations: any[] = [];
    
    let currentCrop: any = null;
    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        if (currentCrop) recommendations.push(currentCrop);
        currentCrop = { crop: line.replace(/^\d+\./, '').trim(), details: [] };
      } else if (currentCrop && line.trim()) {
        currentCrop.details.push(line.trim());
      }
    }
    if (currentCrop) recommendations.push(currentCrop);
    
    return recommendations;
  }

  private parseDiseaseDetection(response: string): any {
    return {
      diagnosis: response.split('\n')[0] || 'Analysis provided',
      treatment: response,
      confidence: 'High'
    };
  }

  private parseYieldPrediction(response: string): any {
    return {
      estimatedYield: 'As per analysis',
      prediction: response,
      factors: ['Weather', 'Soil', 'Cultivation practices']
    };
  }

  private parseMarketAnalysis(response: string): any {
    return {
      recommendation: response,
      timing: 'Based on market analysis',
      expectedPrice: 'Variable based on conditions'
    };
  }
}

export default IBMWatsonService;
