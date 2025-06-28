import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const Fertilizer = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        ph: '',
        organicMatter: '',
        soilType: '',
        cropType: '',
        season: ''
    });

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
        
        try {
            const requestData = {
                nitrogen: parseFloat(formData.nitrogen),
                phosphorus: parseFloat(formData.phosphorus),
                potassium: parseFloat(formData.potassium),
                ph: parseFloat(formData.ph),
                organicMatter: parseFloat(formData.organicMatter) || 2.5,
                soilType: formData.soilType,
                cropType: formData.cropType,
                season: formData.season
            };

            const response = await ibmGraniteService.getFertilizerRecommendation(requestData);
            setResult(response.data);
        } catch (err) {
            setError(err.message || 'Failed to get fertilizer recommendations');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Fertilizer Recommendation - Powered by IBM Granite AI
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nitrogen (N) - ppm
                        </label>
                        <input
                            type="number"
                            name="nitrogen"
                            value={formData.nitrogen}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter nitrogen content"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phosphorus (P) - ppm
                        </label>
                        <input
                            type="number"
                            name="phosphorus"
                            value={formData.phosphorus}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter phosphorus content"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Potassium (K) - ppm
                        </label>
                        <input
                            type="number"
                            name="potassium"
                            value={formData.potassium}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter potassium content"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            pH Level
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="ph"
                            value={formData.ph}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter soil pH"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Organic Matter (%)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="organicMatter"
                            value={formData.organicMatter}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter organic matter percentage"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Soil Type
                        </label>
                        <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Soil Type</option>
                            <option value="clay">Clay</option>
                            <option value="loam">Loam</option>
                            <option value="sandy">Sandy</option>
                            <option value="silt">Silt</option>
                            <option value="black">Black</option>
                            <option value="red">Red</option>
                            <option value="alluvial">Alluvial</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Crop Type (Optional)
                        </label>
                        <select
                            name="cropType"
                            value={formData.cropType}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Crop Type</option>
                            <option value="rice">Rice</option>
                            <option value="wheat">Wheat</option>
                            <option value="corn">Corn</option>
                            <option value="tomato">Tomato</option>
                            <option value="potato">Potato</option>
                            <option value="cotton">Cotton</option>
                            <option value="soybean">Soybean</option>
                            <option value="vegetables">Mixed Vegetables</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Season (Optional)
                        </label>
                        <select
                            name="season"
                            value={formData.season}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="">Select Season</option>
                            <option value="kharif">Kharif (Monsoon)</option>
                            <option value="rabi">Rabi (Winter)</option>
                            <option value="zaid">Zaid (Summer)</option>
                            <option value="year-round">Year Round</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
                                    Getting Recommendations...
                                </>
                            ) : (
                                'Get Fertilizer Recommendations'
                            )}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {result && (
                    <div className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4">
                            Fertilizer Recommendations from IBM Granite AI
                        </h3>
                        
                        <div className="mb-4">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Confidence: {Math.round(result.confidence * 100)}%
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
                                Source: {result.source}
                            </span>
                        </div>

                        <div className="text-gray-700 dark:text-gray-300">
                            <h4 className="font-semibold mb-2">Fertilizer Analysis & Recommendations:</h4>
                            <pre className="whitespace-pre-wrap text-sm bg-white dark:bg-gray-800 p-4 rounded border">
                                {result.recommendations}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fertilizer;
