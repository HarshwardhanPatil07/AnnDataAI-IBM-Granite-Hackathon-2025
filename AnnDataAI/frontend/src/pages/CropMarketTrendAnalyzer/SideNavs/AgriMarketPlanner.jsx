import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const AgriMarketPlanner = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [formData, setFormData] = useState({
		farmSize: '',
		currentCrops: '',
		targetMarkets: '',
		budget: '',
		planningPeriod: '',
		objectives: '',
		riskTolerance: '',
		location: ''
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
				type: 'market_planning'
			});
			setResult(response);
		} catch (error) {
			console.error('Error getting market planning:', error);
			setResult({
				error: 'Failed to get market planning analysis. Please try again.'
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
						AI-Driven Agricultural Market Planner - Powered by IBM Granite
					</h2>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Farm Size (acres)
								</label>
								<input
									type="number"
									step="0.1"
									name="farmSize"
									value={formData.farmSize}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter farm size"
									required
								/>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Current Crops
								</label>
								<input
									type="text"
									name="currentCrops"
									value={formData.currentCrops}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter current crops (comma separated)"
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Target Markets
								</label>
								<input
									type="text"
									name="targetMarkets"
									value={formData.targetMarkets}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter target markets"
									required
								/>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Budget (₹)
								</label>
								<input
									type="number"
									name="budget"
									value={formData.budget}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter available budget"
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Planning Period
								</label>
								<select
									name="planningPeriod"
									value={formData.planningPeriod}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select planning period</option>
									<option value="1-season">1 Season</option>
									<option value="1-year">1 Year</option>
									<option value="2-years">2 Years</option>
									<option value="3-years">3 Years</option>
									<option value="5-years">5 Years</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Risk Tolerance
								</label>
								<select
									name="riskTolerance"
									value={formData.riskTolerance}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select risk tolerance</option>
									<option value="conservative">Conservative</option>
									<option value="moderate">Moderate</option>
									<option value="aggressive">Aggressive</option>
								</select>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Primary Objectives
							</label>
							<select
								name="objectives"
								value={formData.objectives}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								required
							>
								<option value="">Select primary objective</option>
								<option value="maximize-profit">Maximize Profit</option>
								<option value="diversify-crops">Diversify Crops</option>
								<option value="sustainable-farming">Sustainable Farming</option>
								<option value="risk-mitigation">Risk Mitigation</option>
								<option value="market-expansion">Market Expansion</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Location
							</label>
							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter location (city, state)"
								required
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
									Creating Plan...
								</span>
							) : (
								'Generate Market Plan'
							)}
						</button>
					</form>

					{result && (
						<div className="mt-8 p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								Agricultural Market Plan
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
											<h4 className="font-semibold text-blue-800 mb-2">Strategic Recommendations:</h4>
											<div className="text-blue-700">{result.recommendations}</div>
										</div>
									)}
									{result.marketPlan && (
										<div className="bg-green-50 p-4 rounded-lg">
											<h4 className="font-semibold text-green-800 mb-2">Market Action Plan:</h4>
											<div className="text-green-700">{result.marketPlan}</div>
										</div>
									)}
									{result.metadata && (
										<div className="text-sm text-gray-500 mt-4">
											<p>Plan generated by IBM Granite AI models</p>
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

export default AgriMarketPlanner;
