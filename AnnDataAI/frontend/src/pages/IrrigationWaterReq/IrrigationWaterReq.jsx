import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import ibmGraniteService from "../../services/ibmGraniteService";

const IrrigationWaterReq = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [formData, setFormData] = useState({
		cropType: '',
		soilType: '',
		area: '',
		season: '',
		temperature: '',
		humidity: '',
		rainfall: '',
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
			const response = await ibmGraniteService.getIrrigationRequirement(formData);
			setResult(response);
		} catch (error) {
			console.error('Error getting irrigation requirement:', error);
			setResult({
				error: 'Failed to get irrigation requirement. Please try again.'
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
						Irrigation Water Requirement - Powered by IBM Granite
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
									<option value="other">Other</option>
								</select>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Soil Type
								</label>
								<select
									name="soilType"
									value={formData.soilType}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									required
								>
									<option value="">Select soil type</option>
									<option value="clay">Clay</option>
									<option value="loam">Loam</option>
									<option value="sandy">Sandy</option>
									<option value="silt">Silt</option>
									<option value="sandy-loam">Sandy Loam</option>
									<option value="clay-loam">Clay Loam</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Area (hectares)
								</label>
								<input
									type="number"
									step="0.1"
									name="area"
									value={formData.area}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter area in hectares"
									required
								/>
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
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Temperature (°C)
								</label>
								<input
									type="number"
									name="temperature"
									value={formData.temperature}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Average temperature"
									required
								/>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Humidity (%)
								</label>
								<input
									type="number"
									name="humidity"
									value={formData.humidity}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Relative humidity"
									required
								/>
							</div>
							
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Annual Rainfall (mm)
								</label>
								<input
									type="number"
									name="rainfall"
									value={formData.rainfall}
									onChange={handleInputChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Annual rainfall"
									required
								/>
							</div>
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
									Calculating...
								</span>
							) : (
								'Calculate Irrigation Requirement'
							)}
						</button>
					</form>

					{result && (
						<div className="mt-8 p-6 bg-gray-50 rounded-lg">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								Irrigation Analysis
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
									{result.waterRequirement && (
										<div className="bg-green-50 p-4 rounded-lg">
											<h4 className="font-semibold text-green-800 mb-2">Water Requirement:</h4>
											<div className="text-green-700">{result.waterRequirement}</div>
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

export default IrrigationWaterReq;
