import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const CropMarketPriceAnalysis = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [formData, setFormData] = useState({
		cropType: '',
		analysisType: 'price_trends',
		region: '',
		timeRange: '',
		comparisonCrops: ''
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
		setResult(null);

		try {
			const response = await ibmGraniteService.getMarketAnalysis({
				...formData,
				type: 'market_analysis'
			});
			setResult(response);
		} catch (error) {
			console.error('Error getting market analysis:', error);
			setResult({
				error: 'Failed to get market analysis. Please try again.'
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">
						Crop Market Price Analysis - Powered by IBM Granite
					</h2>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Crop Type
								</label>
								<select
									name="cropType"
									value={formData.cropType}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select crop type</option>
									<option value="wheat">Wheat</option>
									<option value="rice">Rice</option>
									<option value="corn">Corn</option>
									<option value="soybeans">Soybeans</option>
									<option value="cotton">Cotton</option>
									<option value="sugarcane">Sugarcane</option>
									<option value="tomato">Tomato</option>
									<option value="potato">Potato</option>
									<option value="onion">Onion</option>
									<option value="pulses">Pulses</option>
									<option value="other">Other</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Analysis Type
								</label>
								<select
									name="analysisType"
									value={formData.analysisType}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="price_trends">Price Trends</option>
									<option value="seasonal_patterns">Seasonal Patterns</option>
									<option value="supply_demand">Supply & Demand</option>
									<option value="market_volatility">Market Volatility</option>
									<option value="comparative_analysis">Comparative Analysis</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Region
								</label>
								<select
									name="region"
									value={formData.region}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select region</option>
									<option value="north-india">North India</option>
									<option value="south-india">South India</option>
									<option value="west-india">West India</option>
									<option value="east-india">East India</option>
									<option value="central-india">Central India</option>
									<option value="national">National</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Time Range
								</label>
								<select
									name="timeRange"
									value={formData.timeRange}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select time range</option>
									<option value="1-month">Last 1 Month</option>
									<option value="3-months">Last 3 Months</option>
									<option value="6-months">Last 6 Months</option>
									<option value="1-year">Last 1 Year</option>
									<option value="2-years">Last 2 Years</option>
								</select>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Comparison Crops (Optional)
							</label>
							<input
								type="text"
								name="comparisonCrops"
								value={formData.comparisonCrops}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter crops to compare (comma separated)"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? (
								<span className="flex items-center justify-center">
									<LoaderCircle className="animate-spin h-5 w-5 mr-2" />
									Analyzing...
								</span>
							) : (
								'Get Market Analysis'
							)}
						</button>
					</form>

					{result && (
						<div className="mt-8 p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								Market Analysis Results
							</h3>
							{result.error ? (
								<div className="text-red-600 p-4 bg-red-50 rounded-lg">
									{result.error}
								</div>
							) : (
								<div className="space-y-4">
									<div className="prose text-gray-700">
										{result.analysis}
									</div>
									{result.recommendations && (
										<div className="bg-blue-50 p-4 rounded-lg">
											<h4 className="font-semibold text-blue-800 mb-2">Market Insights:</h4>
											<div className="text-blue-700">{result.recommendations}</div>
										</div>
									)}
									{result.trends && (
										<div className="bg-green-50 p-4 rounded-lg">
											<h4 className="font-semibold text-green-800 mb-2">Key Trends:</h4>
											<div className="text-green-700">{result.trends}</div>
										</div>
									)}
									{result.metadata && (
										<div className="text-sm text-gray-500 mt-4">
											<p>Analysis powered by IBM Granite AI models</p>
											<p>Generated at: {new Date().toLocaleString()}</p>
										</div>
									)}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CropMarketPriceAnalysis;
