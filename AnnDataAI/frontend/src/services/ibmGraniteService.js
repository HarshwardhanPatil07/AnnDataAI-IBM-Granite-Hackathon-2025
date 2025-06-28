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
      return result;
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      throw error;
    }
  }

  // Crop Recommendation using IBM Granite
  async getCropRecommendation(soilData) {
    return this.makeRequest('/crop-recommendation', soilData);
  }

  // Disease Detection using IBM Granite
  async detectDisease(diseaseData) {
    return this.makeRequest('/disease-detection', diseaseData);
  }

  // Yield Prediction using IBM Granite
  async predictYield(yieldData) {
    return this.makeRequest('/yield-prediction', yieldData);
  }

  // Market Analysis using IBM Granite
  async analyzeMarket(marketData) {
    return this.makeRequest('/market-analysis', marketData);
  }

  // Fertilizer Recommendation using IBM Granite
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
