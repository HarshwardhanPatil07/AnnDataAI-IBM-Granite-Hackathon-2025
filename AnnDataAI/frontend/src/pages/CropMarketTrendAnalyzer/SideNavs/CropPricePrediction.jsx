import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const CropPricePrediction = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [formData, setFormData] = useState({
		cropType: '',
		market: '',
		state: '',
		quantity: '',
		quality: '',
		timeFrame: '',
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
		setResult(null);

		try {
			const response = await ibmGraniteService.getMarketAnalysis(formData);
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
						Crop Price Prediction - Powered by IBM Granite
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
									<option value="other">Other</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Market/Mandi
								</label>
								<input
									type="text"
									name="market"
									value={formData.market}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter market name"
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									State
								</label>
								<select
									name="state"
									value={formData.state}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select state</option>
									<option value="andhra-pradesh">Andhra Pradesh</option>
									<option value="bihar">Bihar</option>
									<option value="gujarat">Gujarat</option>
									<option value="haryana">Haryana</option>
									<option value="karnataka">Karnataka</option>
									<option value="madhya-pradesh">Madhya Pradesh</option>
									<option value="maharashtra">Maharashtra</option>
									<option value="punjab">Punjab</option>
									<option value="rajasthan">Rajasthan</option>
									<option value="tamil-nadu">Tamil Nadu</option>
									<option value="uttar-pradesh">Uttar Pradesh</option>
									<option value="west-bengal">West Bengal</option>
									<option value="other">Other</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Quantity (quintals)
								</label>
								<input
									type="number"
									step="0.1"
									name="quantity"
									value={formData.quantity}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter quantity"
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Quality Grade
								</label>
								<select
									name="quality"
									value={formData.quality}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select quality</option>
									<option value="premium">Premium</option>
									<option value="good">Good</option>
									<option value="average">Average</option>
									<option value="below-average">Below Average</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Time Frame
								</label>
								<select
									name="timeFrame"
									value={formData.timeFrame}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select time frame</option>
									<option value="1-week">1 Week</option>
									<option value="1-month">1 Month</option>
									<option value="3-months">3 Months</option>
									<option value="6-months">6 Months</option>
								</select>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Season
							</label>
							<select
								name="season"
								value={formData.season}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								required
							>
								<option value="">Select season</option>
								<option value="kharif">Kharif (Monsoon)</option>
								<option value="rabi">Rabi (Winter)</option>
								<option value="zaid">Zaid (Summer)</option>
							</select>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? (
								<span className="flex items-center justify-center">
									<LoaderCircle className="animate-spin h-5 w-5 mr-2" />
									Predicting...
								</span>
							) : (
								'Get Price Prediction'
							)}
						</button>
					</form>

					{result && (
						<div className="mt-8 p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								Price Prediction Results
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
											<h4 className="font-semibold text-blue-800 mb-2">Market Recommendations:</h4>
											<div className="text-blue-700">{result.recommendations}</div>
										</div>
									)}
									{result.priceRange && (
										<div className="bg-green-50 p-4 rounded-lg">
											<h4 className="font-semibold text-green-800 mb-2">Predicted Price Range:</h4>
											<div className="text-green-700">{result.priceRange}</div>
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

export default CropPricePrediction;
