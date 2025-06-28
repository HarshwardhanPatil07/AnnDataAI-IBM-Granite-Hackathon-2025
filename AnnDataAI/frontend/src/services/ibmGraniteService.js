import { API_URL } from "../config/constants";

class IBMGraniteService {
  constructor() {
    this.baseURL = `${API_URL}/ai`;
  }

  async makeRequest(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Log model information for debugging
      if (result.model_info) {
        console.log(`Using ${result.model_info.model_family} via ${result.model_info.primary_service}:`, result.model_info.specific_model);
      }
      
      return result;
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      throw error;
    }
  }

  // Crop Recommendation using IBM Granite on Hugging Face
  async getCropRecommendation(soilData) {
    return this.makeRequest('/crop-recommendation', soilData);
  }

  // Disease Detection using IBM Granite on Hugging Face
  async detectDisease(diseaseData) {
    return this.makeRequest('/disease-detection', diseaseData);
  }

  // Yield Prediction using IBM Granite on Hugging Face
  async predictYield(yieldData) {
    return this.makeRequest('/yield-prediction', yieldData);
  }

  // Market Analysis using IBM Granite on Hugging Face
  async analyzeMarket(marketData) {
    return this.makeRequest('/market-analysis', marketData);
  }

  // Fertilizer Recommendation using IBM Granite on Hugging Face
  async getFertilizerRecommendation(soilData) {
    return this.makeRequest('/fertilizer-recommendation', soilData);
  }

  // Chat with AgriBot powered by IBM Granite
  async chatWithBot(message, context = null) {
    return this.makeRequest('/chat', { message, context });
  }

  // Geospatial Analysis using IBM Granite
  async getGeospatialAnalysis(geoData) {
    return this.makeRequest('/geospatial-analysis', geoData);
  }

  // Irrigation Requirement using IBM Granite
  async getIrrigationRequirement(irrigationData) {
    return this.makeRequest('/irrigation-requirement', irrigationData);
  }
}

export default new IBMGraniteService();
