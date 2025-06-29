import { useState } from "react";
import { FaExchangeAlt, FaChartLine, FaLeaf, FaCalculator, FaSeedling, FaAward } from "react-icons/fa";
import { MdPrecisionManufacturing, MdTrendingUp } from "react-icons/md";
import { GiPlantSeed } from "react-icons/gi";
import ibmGraniteService from "../../../services/ibmGraniteService";

const CropSwappingStrategy = () => {
    const [formData, setFormData] = useState({
        currentCrop: '',
        currentYield: '',
        farmLocation: '',
        farmSize: '',
        season: '',
        availableBudget: '',
        riskTolerance: 'medium',
        sustainabilityGoals: 'standard',
        soilConditions: {
            nitrogen: '',
            phosphorus: '',
            potassium: '',
            ph: '',
            soilType: ''
        },
        marketConditions: {
            currentPrice: '',
            demandTrend: '',
            competition: ''
        }
    });

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await ibmGraniteService.getCropSwappingStrategy(formData);
            
            if (response.success) {
                setResults(response.data);
            } else {
                setError(response.message || 'Failed to generate crop swapping strategy');
            }
        } catch (err) {
            setError('Error generating strategy: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            currentCrop: '',
            currentYield: '',
            farmLocation: '',
            farmSize: '',
            season: '',
            availableBudget: '',
            riskTolerance: 'medium',
            sustainabilityGoals: 'standard',
            soilConditions: {
                nitrogen: '',
                phosphorus: '',
                potassium: '',
                ph: '',
                soilType: ''
            },
            marketConditions: {
                currentPrice: '',
                demandTrend: '',
                competition: ''
            }
        });
        setResults(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <FaExchangeAlt className="text-4xl text-green-600 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-800">Intelligent Crop Swapping Strategy</h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Powered by IBM Granite AI - Optimize your farming with advanced crop rotation and swapping strategies
                    </p>
                    <div className="flex items-center justify-center mt-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            🧠 IBM Granite AI Powered
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <GiPlantSeed className="mr-3 text-green-600" />
                            Farm Information
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Farm Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Crop *
                                    </label>
                                    <input
                                        type="text"
                                        name="currentCrop"
                                        value={formData.currentCrop}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Rice, Wheat, Cotton"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Yield
                                    </label>
                                    <input
                                        type="text"
                                        name="currentYield"
                                        value={formData.currentYield}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., 2.5 tons/hectare"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Farm Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="farmLocation"
                                        value={formData.farmLocation}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Punjab, Maharashtra"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Farm Size
                                    </label>
                                    <input
                                        type="text"
                                        name="farmSize"
                                        value={formData.farmSize}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., 5 hectares"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Season
                                    </label>
                                    <select
                                        name="season"
                                        value={formData.season}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select Season</option>
                                        <option value="kharif">Kharif (Monsoon)</option>
                                        <option value="rabi">Rabi (Winter)</option>
                                        <option value="zaid">Zaid (Summer)</option>
                                        <option value="year-round">Year Round</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Available Budget
                                    </label>
                                    <input
                                        type="text"
                                        name="availableBudget"
                                        value={formData.availableBudget}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., ₹50,000"
                                    />
                                </div>
                            </div>

                            {/* Risk & Sustainability */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Risk Tolerance
                                    </label>
                                    <select
                                        name="riskTolerance"
                                        value={formData.riskTolerance}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="low">Conservative (Low Risk)</option>
                                        <option value="medium">Balanced (Medium Risk)</option>
                                        <option value="high">Aggressive (High Risk)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sustainability Goals
                                    </label>
                                    <select
                                        name="sustainabilityGoals"
                                        value={formData.sustainabilityGoals}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="standard">Standard Practices</option>
                                        <option value="organic">Organic Focus</option>
                                        <option value="sustainable">Highly Sustainable</option>
                                        <option value="regenerative">Regenerative Agriculture</option>
                                    </select>
                                </div>
                            </div>

                            {/* Soil Conditions */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaLeaf className="mr-2 text-green-600" />
                                    Soil Conditions (Optional)
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <input
                                        type="number"
                                        name="soilConditions.nitrogen"
                                        value={formData.soilConditions.nitrogen}
                                        onChange={handleInputChange}
                                        placeholder="Nitrogen (ppm)"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        name="soilConditions.phosphorus"
                                        value={formData.soilConditions.phosphorus}
                                        onChange={handleInputChange}
                                        placeholder="Phosphorus (ppm)"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="soilConditions.ph"
                                        value={formData.soilConditions.ph}
                                        onChange={handleInputChange}
                                        placeholder="pH Level"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <FaCalculator className="inline mr-2" />
                                            Generate Strategy
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Results Display */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <FaChartLine className="mr-3 text-blue-600" />
                            AI Strategy Recommendations
                        </h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <div className="flex">
                                    <div className="text-red-800">
                                        <strong>Error:</strong> {error}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!results && !loading && !error && (
                            <div className="text-center py-12">
                                <MdPrecisionManufacturing className="text-6xl text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    Fill in your farm details and click "Generate Strategy" to get AI-powered crop swapping recommendations
                                </p>
                            </div>
                        )}

                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-gray-600">IBM Granite AI is analyzing your farm data...</p>
                            </div>
                        )}

                        {results && (
                            <div className="space-y-6">
                                {/* Confidence Score */}
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-gray-800">AI Confidence Score</span>
                                        <span className="text-2xl font-bold text-green-600">
                                            {Math.round(results.confidence * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                            style={{ width: `${results.confidence * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Alternative Crops */}
                                {results.alternativeCrops && results.alternativeCrops.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <FaSeedling className="mr-2 text-green-600" />
                                            Recommended Alternative Crops
                                        </h3>
                                        <div className="grid gap-4">
                                            {results.alternativeCrops.map((crop, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-semibold text-gray-800">{crop.name}</h4>
                                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                                            {crop.profitability} Profit
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                        <div>
                                                            <span className="font-medium">Expected Yield:</span> {crop.expectedYield}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Difficulty:</span> {crop.difficulty}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Economic Analysis */}
                                {results.economicAnalysis && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <MdTrendingUp className="mr-2 text-blue-600" />
                                            Economic Analysis
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <div className="text-sm text-gray-600">Investment Required</div>
                                                <div className="text-lg font-semibold text-blue-800">
                                                    {results.economicAnalysis.investmentRequired}
                                                </div>
                                            </div>
                                            <div className="bg-green-50 rounded-lg p-4">
                                                <div className="text-sm text-gray-600">Expected ROI</div>
                                                <div className="text-lg font-semibold text-green-800">
                                                    {results.economicAnalysis.expectedROI}
                                                </div>
                                            </div>
                                            <div className="bg-yellow-50 rounded-lg p-4">
                                                <div className="text-sm text-gray-600">Break-even Period</div>
                                                <div className="text-lg font-semibold text-yellow-800">
                                                    {results.economicAnalysis.breakEvenPeriod}
                                                </div>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-4">
                                                <div className="text-sm text-gray-600">Profit Improvement</div>
                                                <div className="text-lg font-semibold text-purple-800">
                                                    {results.economicAnalysis.profitImprovement}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Optimization Plan */}
                                {results.optimizationPlan && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <FaAward className="mr-2 text-purple-600" />
                                            Optimization Strategy
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="border-l-4 border-blue-500 pl-4">
                                                <div className="font-medium text-gray-800">Rotation Sequence</div>
                                                <div className="text-gray-600">{results.optimizationPlan.rotationSequence}</div>
                                            </div>
                                            <div className="border-l-4 border-green-500 pl-4">
                                                <div className="font-medium text-gray-800">Intercropping Plan</div>
                                                <div className="text-gray-600">{results.optimizationPlan.intercropping}</div>
                                            </div>
                                            <div className="border-l-4 border-purple-500 pl-4">
                                                <div className="font-medium text-gray-800">Implementation Timeline</div>
                                                <div className="text-gray-600">{results.optimizationPlan.timeline}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Implementation Roadmap */}
                                {results.implementationRoadmap && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Implementation Roadmap</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start">
                                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                                    1
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Phase 1</div>
                                                    <div className="text-gray-600">{results.implementationRoadmap.phase1}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                                    2
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Phase 2</div>
                                                    <div className="text-gray-600">{results.implementationRoadmap.phase2}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                                    3
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">Phase 3</div>
                                                    <div className="text-gray-600">{results.implementationRoadmap.phase3}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Sustainability Metrics */}
                                {results.sustainability && (
                                    <div className="bg-green-50 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <FaLeaf className="mr-2 text-green-600" />
                                            Sustainability Impact
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="font-medium text-gray-800">Soil Health:</span>
                                                <span className="ml-2 text-gray-600">{results.sustainability.soilHealth}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Water Usage:</span>
                                                <span className="ml-2 text-gray-600">{results.sustainability.waterUsage}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-800">Carbon Footprint:</span>
                                                <span className="ml-2 text-gray-600">{results.sustainability.carbonFootprint}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropSwappingStrategy;