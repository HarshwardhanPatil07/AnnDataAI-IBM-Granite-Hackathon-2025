import React, { useState } from "react";
import { Calendar, MapPin, Leaf, TrendingUp, AlertTriangle, DollarSign, Droplets, ThermometerSun } from "lucide-react";
import ibmGraniteService from "../../services/ibmGraniteService";

const OptimalCropSeason = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    region: '',
    soilType: '',
    farmSize: '',
    currentYear: new Date().getFullYear(),
    waterAvailability: '',
    climateConditions: '',
    farmingExperience: '',
    budgetRange: '',
    sustainabilityPreference: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await ibmGraniteService.getOptimalCropSeason(formData);
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.message || 'Failed to get optimal crop season analysis');
      }
    } catch (err) {
      console.error('Error getting optimal crop season:', err);
      setError(err.message || 'An error occurred while analyzing optimal crop season');
    } finally {
      setLoading(false);
    }
  };

  const cropOptions = [
    'Rice', 'Wheat', 'Maize (Corn)', 'Sugarcane', 'Cotton', 'Soybean', 'Chickpea', 
    'Bajra (Pearl Millet)', 'Sorghum', 'Barley', 'Mustard', 'Sunflower', 'Groundnut',
    'Potato', 'Tomato', 'Onion', 'Chili', 'Turmeric', 'Ginger', 'Tea', 'Coffee'
  ];

  const soilTypes = [
    'Alluvial Soil', 'Black Soil (Regur)', 'Red Soil', 'Laterite Soil', 
    'Desert Soil', 'Mountain Soil', 'Saline Soil', 'Peaty Soil'
  ];

  const regions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Optimal Crop Season Predictor
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powered by IBM Granite AI, our advanced system analyzes multiple factors to recommend the best planting seasons for your crops, maximizing yield and profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Leaf className="w-6 h-6 text-green-600 mr-2" />
              Crop & Farm Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Crop Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Crop Type *
                </label>
                <select
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select crop type</option>
                  {cropOptions.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Region/State *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select your state/region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Soil Type
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select soil type (optional)</option>
                  {soilTypes.map(soil => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              {/* Farm Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Farm Size (acres)
                </label>
                <input
                  type="text"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 acres, 2 hectares"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>

              {/* Water Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Water Availability
                </label>
                <select
                  name="waterAvailability"
                  value={formData.waterAvailability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select water availability</option>
                  <option value="Abundant">Abundant (Good irrigation/rainfall)</option>
                  <option value="Moderate">Moderate (Average water sources)</option>
                  <option value="Limited">Limited (Drought-prone area)</option>
                  <option value="Rain-fed">Rain-fed only</option>
                </select>
              </div>

              {/* Farming Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Farming Experience
                </label>
                <select
                  name="farmingExperience"
                  value={formData.farmingExperience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select experience level</option>
                  <option value="Beginner">Beginner (0-2 years)</option>
                  <option value="Intermediate">Intermediate (3-10 years)</option>
                  <option value="Experienced">Experienced (10+ years)</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select budget range</option>
                  <option value="Low">Low (₹10,000-50,000)</option>
                  <option value="Moderate">Moderate (₹50,000-2,00,000)</option>
                  <option value="High">High (₹2,00,000+)</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.cropType || !formData.region}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Optimal Seasons...
                  </div>
                ) : (
                  'Get Optimal Season Recommendations'
                )}
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              Season Recommendations
            </h2>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    IBM Granite AI is analyzing the optimal crop seasons for your farm...
                  </p>
                </div>
              </div>
            )}

            {results && !loading && (
              <div className="space-y-6">
                {/* Optimal Seasons */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recommended Seasons
                  </h3>
                  <div className="space-y-3">
                    {results.optimalSeasons?.map((season, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 dark:text-white">{season.name}</h4>
                          <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">
                            {season.suitability} Suitability
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                          <strong>Timing:</strong> {season.months}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Why:</strong> {season.reasons}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weather Considerations */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                    <ThermometerSun className="w-5 h-5 mr-2" />
                    Weather Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Temperature:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{results.weatherConsiderations?.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Rainfall:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{results.weatherConsiderations?.rainfall}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Humidity:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{results.weatherConsiderations?.humidity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Wind Conditions:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{results.weatherConsiderations?.windConditions}</p>
                    </div>
                  </div>
                </div>

                {/* Economic Analysis */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Economic Outlook
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Profitability:</strong> {results.economicAnalysis?.profitability}</p>
                    <p className="text-sm"><strong>Cost Variation:</strong> {results.economicAnalysis?.costVariation}</p>
                    <p className="text-sm"><strong>Market Pricing:</strong> {results.economicAnalysis?.marketPricing}</p>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Factors
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Weather Risk:</strong> {results.riskAssessment?.weatherRisk}</p>
                    <p className="text-sm"><strong>Pest Risk:</strong> {results.riskAssessment?.pestRisk}</p>
                    <p className="text-sm"><strong>Market Risk:</strong> {results.riskAssessment?.marketRisk}</p>
                  </div>
                </div>

                {/* Action Plan */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Implementation Plan
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Immediate Action:</strong> {results.actionPlan?.immediate}</p>
                    <p className="text-sm"><strong>Short-term (1-3 months):</strong> {results.actionPlan?.shortTerm}</p>
                    <p className="text-sm"><strong>Long-term (6+ months):</strong> {results.actionPlan?.longTerm}</p>
                    <p className="text-sm"><strong>Monitoring:</strong> {results.actionPlan?.monitoring}</p>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confidence Score: {Math.round((results.confidence || 0.88) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!results && !loading && !error && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Fill in the form details and submit to get your optimal crop season recommendations powered by IBM Granite AI.</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Seasonal Planning</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get detailed planting calendars tailored to your specific crop and region for maximum yield potential.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Yield Optimization</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Maximize your crop yield by choosing the optimal planting season based on weather patterns and soil conditions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Profit Maximization</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Increase your farming profits by aligning your crop cycles with market demand and seasonal price trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalCropSeason;
