import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const CropDisease = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		cropType: '',
		symptoms: '',
		affectedArea: '',
		weatherConditions: ''
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
			const response = await ibmGraniteService.detectDisease(formData);
			setResult(response.data);
		} catch (err) {
			setError(err.message || 'Failed to detect disease');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
					Plant Disease Detection - Powered by IBM Granite AI
				</h2>
				
				<form onSubmit={handleSubmit} className="space-y-6 mb-8">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Crop Type
						</label>
						<select
							name="cropType"
							value={formData.cropType}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							required
						>
							<option value="">Select Crop Type</option>
							<option value="tomato">Tomato</option>
							<option value="potato">Potato</option>
							<option value="wheat">Wheat</option>
							<option value="rice">Rice</option>
							<option value="corn">Corn</option>
							<option value="cotton">Cotton</option>
							<option value="soybean">Soybean</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Symptoms Description
						</label>
						<textarea
							name="symptoms"
							value={formData.symptoms}
							onChange={handleInputChange}
							rows="4"
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Describe the symptoms you observe (e.g., yellow spots on leaves, wilting, brown patches, etc.)"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Affected Area
						</label>
						<select
							name="affectedArea"
							value={formData.affectedArea}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						>
							<option value="">Select Affected Area</option>
							<option value="leaves">Leaves</option>
							<option value="stem">Stem</option>
							<option value="fruit">Fruit/Pods</option>
							<option value="roots">Roots</option>
							<option value="entire_plant">Entire Plant</option>
							<option value="multiple_areas">Multiple Areas</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Weather Conditions
						</label>
						<textarea
							name="weatherConditions"
							value={formData.weatherConditions}
							onChange={handleInputChange}
							rows="2"
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Describe recent weather (e.g., high humidity, heavy rains, drought, temperature extremes)"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
					>
						{loading ? (
							<>
								<LoaderCircle className="animate-spin h-5 w-5 mr-2" />
								Analyzing Disease...
							</>
						) : (
							'Detect Disease'
						)}
					</button>
				</form>

				{error && (
					<div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
						<strong>Error:</strong> {error}
					</div>
				)}

				{result && (
					<div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
						<h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
							Disease Diagnosis from IBM Granite AI
						</h3>
						
						<div className="mb-4">
							<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
								Confidence: {Math.round(result.confidence * 100)}%
							</span>
							<span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
								Source: {result.source}
							</span>
						</div>

						{result.diagnosis && result.diagnosis.diagnosis ? (
							<div className="space-y-4">
								<div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
									<h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
										Diagnosis: {result.diagnosis.diagnosis}
									</h4>
									<p className="text-gray-600 dark:text-gray-300 mb-2">
										<strong>Confidence:</strong> {result.diagnosis.confidence}
									</p>
									<div className="text-gray-700 dark:text-gray-300">
										<h5 className="font-semibold mb-2">Treatment Recommendations:</h5>
										<pre className="whitespace-pre-wrap text-sm">
											{result.diagnosis.treatment}
										</pre>
									</div>
								</div>
							</div>
						) : (
							<div className="text-gray-700 dark:text-gray-300">
								<h4 className="font-semibold mb-2">AI Disease Analysis:</h4>
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

export default CropDisease;
