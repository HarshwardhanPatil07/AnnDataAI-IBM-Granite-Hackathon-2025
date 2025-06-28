import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import ibmGraniteService from "../../services/ibmGraniteService.js";

const GeoSpatialCropAnalysis = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [formData, setFormData] = useState({
		latitude: '',
		longitude: '',
		cropType: '',
		analysisType: 'soil_quality'
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
			const response = await ibmGraniteService.getGeospatialAnalysis(formData);
			setResult(response);
		} catch (error) {
			console.error('Error getting geospatial analysis:', error);
			setResult({
				error: 'Failed to get geospatial analysis. Please try again.'
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
						GeoSpatial Crop Analysis - Powered by IBM Granite
					</h2>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Latitude
								</label>
								<input
									type="number"
									step="any"
									name="latitude"
									value={formData.latitude}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter latitude (e.g., 28.6139)"
									required
								/>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Longitude
								</label>
								<input
									type="number"
									step="any"
									name="longitude"
									value={formData.longitude}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter longitude (e.g., 77.2090)"
									required
								/>
							</div>
						</div>

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
							>
								<option value="soil_quality">Soil Quality Analysis</option>
								<option value="vegetation_index">Vegetation Index</option>
								<option value="crop_health">Crop Health Assessment</option>
								<option value="yield_potential">Yield Potential</option>
								<option value="environmental_factors">Environmental Factors</option>
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
									Analyzing...
								</span>
							) : (
								'Get Geospatial Analysis'
							)}
						</button>
					</form>

					{result && (
						<div className="mt-8 p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								Analysis Results
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
											<h4 className="font-semibold text-blue-800 mb-2">Recommendations:</h4>
											<div className="text-blue-700">{result.recommendations}</div>
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

export default GeoSpatialCropAnalysis;
