import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const CropRecommendationOne = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		nitrogen: '',
		phosphorus: '',
		potassium: '',
		temperature: '',
		humidity: '',
		ph: '',
		rainfall: '',
		state: '',
		district: ''
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
		console.log('Form submitted!'); // Debug log
		setLoading(true);
		setError(null);
		
		try {
			// Convert string values to numbers for required fields
			const requestData = {
				nitrogen: parseFloat(formData.nitrogen),
				phosphorus: parseFloat(formData.phosphorus),
				potassium: parseFloat(formData.potassium),
				temperature: parseFloat(formData.temperature),
				humidity: parseFloat(formData.humidity),
				ph: parseFloat(formData.ph),
				rainfall: parseFloat(formData.rainfall),
				state: formData.state,
				district: formData.district
			};

			console.log('Submitting data:', requestData);
			const response = await ibmGraniteService.getCropRecommendation(requestData);
			console.log('Received response:', response);
			
			// Extract the actual data from the response
			const extractedData = {
				...response.data, // This contains the Watson service response
				timestamp: response.timestamp,
				model_info: response.model_info
			};
			
			setResult(extractedData);
		} catch (err) {
			console.error('Error in crop recommendation:', err);
			setError(err.message || 'Failed to get crop recommendations');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
					Crop Recommendation System - Powered by IBM Granite AI
				</h2>
				
				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Nitrogen (kg/ha)
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
							Phosphorus (kg/ha)
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
							Potassium (kg/ha)
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
							Temperature (°C)
						</label>
						<input
							type="number"
							name="temperature"
							value={formData.temperature}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Enter temperature"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Humidity (%)
						</label>
						<input
							type="number"
							name="humidity"
							value={formData.humidity}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Enter humidity"
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
							placeholder="Enter pH level"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Rainfall (mm)
						</label>
						<input
							type="number"
							name="rainfall"
							value={formData.rainfall}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Enter rainfall"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							State (Optional)
						</label>
						<input
							type="text"
							name="state"
							value={formData.state}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Enter state"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							District (Optional)
						</label>
						<input
							type="text"
							name="district"
							value={formData.district}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Enter district"
						/>
					</div>

					<div className="md:col-span-2">
						<button
							type="submit"
							disabled={loading}
							onClick={() => console.log('Button clicked!')}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
						>
							{loading ? (
								<>
									<LoaderCircle className="animate-spin h-5 w-5 mr-2" />
									Getting Recommendations...
								</>
							) : (
								'Get Crop Recommendations'
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
					<div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
						<h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
							Crop Recommendations from IBM Granite AI
						</h3>
						
						<div className="mb-4">
							<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
								Confidence: {Math.round(result.confidence * 100)}%
							</span>
							<span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
								Source: {result.source}
							</span>
						</div>

						{result.recommendations && result.recommendations.length > 0 ? (
							<div className="space-y-4">
								{result.recommendations.map((rec, index) => (
									<div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
										<h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
											{rec.crop}
										</h4>
										<ul className="text-gray-600 dark:text-gray-300 space-y-1">
											{rec.details.map((detail, idx) => (
												<li key={idx} className="text-sm">• {detail}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						) : (
							<div className="text-gray-700 dark:text-gray-300">
								<h4 className="font-semibold mb-2">AI Analysis:</h4>
								<pre className="whitespace-pre-wrap text-sm bg-white dark:bg-gray-800 p-4 rounded border">
									{result.rawResponse}
								</pre>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CropRecommendationOne;
