import { API_URL } from "../config/constants";

class IBMGraniteService {
  constructor() {
    this.baseURL = `${API_URL}/ai`;
  }

  async makeRequest(endpoint, data) {
    try {
      console.log(`Making request to: ${this.baseURL}${endpoint}`);
      console.log('Request data:', data);
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Success response:', result);
      
      // Log model information for debugging
      if (result.model_info) {
        console.log(`Using ${result.model_info.model_family} via ${result.model_info.service}:`, result.model_info.source || 'IBM Granite AI');
      }
      
      return result;
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error(`Network error: Unable to connect to the backend server. Please check if the backend is running on ${this.baseURL}.`);
      }
      
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

  // Pest Outbreak Detection using IBM Granite AI
  async detectPestOutbreak(pestData) {
    return this.makeRequest('/pest-outbreak', pestData);
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

  // Crop Swapping Strategy using IBM Granite AI
  async getCropSwappingStrategy(swappingData) {
    return this.makeRequest('/crop-swapping-strategy', swappingData);
  }
}

export default new IBMGraniteService();
