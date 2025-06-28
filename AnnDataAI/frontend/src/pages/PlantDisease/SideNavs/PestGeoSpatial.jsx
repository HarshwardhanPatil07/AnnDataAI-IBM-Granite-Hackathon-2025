import { useState } from "react";
import { LoaderCircle, MapPin, Bug, BarChart3, AlertTriangle, TrendingUp } from "lucide-react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const PestGeoSpatial = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		crop: '',
		pest: '',
		year: '',
		week: '',
		parameter: '',
		location: '',
		region: ''
	});

	const cropOptions = [
		{ value: 'rice', label: 'Rice' },
		{ value: 'wheat', label: 'Wheat' },
		{ value: 'corn', label: 'Corn/Maize' },
		{ value: 'cotton', label: 'Cotton' },
		{ value: 'soybean', label: 'Soybean' },
		{ value: 'tomato', label: 'Tomato' },
		{ value: 'potato', label: 'Potato' },
		{ value: 'sugarcane', label: 'Sugarcane' },
		{ value: 'onion', label: 'Onion' },
		{ value: 'cabbage', label: 'Cabbage' }
	];

	const pestOptions = [
		{ value: 'aphids', label: 'Aphids' },
		{ value: 'thrips', label: 'Thrips' },
		{ value: 'whiteflies', label: 'Whiteflies' },
		{ value: 'caterpillars', label: 'Caterpillars' },
		{ value: 'bollworm', label: 'Bollworm' },
		{ value: 'stem_borer', label: 'Stem Borer' },
		{ value: 'leaf_miner', label: 'Leaf Miner' },
		{ value: 'spider_mites', label: 'Spider Mites' },
		{ value: 'scale_insects', label: 'Scale Insects' },
		{ value: 'cutworms', label: 'Cutworms' },
		{ value: 'armyworms', label: 'Armyworms' }
	];

	const yearOptions = [
		{ value: '2024', label: '2024' },
		{ value: '2023', label: '2023' },
		{ value: '2022', label: '2022' },
		{ value: '2021', label: '2021' },
		{ value: '2020', label: '2020' }
	];

	const weekOptions = Array.from({ length: 52 }, (_, i) => ({
		value: (i + 1).toString(),
		label: `Week ${i + 1}`
	}));

	const parameterOptions = [
		{ value: 'population_density', label: 'Population Density' },
		{ value: 'infestation_rate', label: 'Infestation Rate' },
		{ value: 'damage_severity', label: 'Damage Severity' },
		{ value: 'spread_velocity', label: 'Spread Velocity' },
		{ value: 'economic_threshold', label: 'Economic Threshold' },
		{ value: 'migration_patterns', label: 'Migration Patterns' },
		{ value: 'seasonal_occurrence', label: 'Seasonal Occurrence' },
		{ value: 'weather_correlation', label: 'Weather Correlation' }
	];

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
			// Create enhanced geospatial analysis request for pest analytics
			const geoAnalysisData = {
				cropType: formData.crop,
				location: formData.location || 'India',
				region: formData.region || 'General',
				analysisType: 'pest_geospatial_analytics',
				pestType: formData.pest,
				timeframe: {
					year: formData.year,
					week: formData.week
				},
				parameter: formData.parameter,
				context: `Geospatial pest analysis for ${formData.pest} in ${formData.crop} crops during ${formData.year} week ${formData.week}. Focus on ${formData.parameter} analysis with spatial distribution patterns.`
			};

			// Use the geospatial analysis endpoint with pest-specific context
			const response = await ibmGraniteService.getGeospatialAnalysis(geoAnalysisData);
			setResult(response.data);
		} catch (err) {
			setError(err.message || 'Failed to perform pest geospatial analysis');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
					<MapPin className="mr-3 text-blue-600" size={28} />
					Pest GeoSpatial Analytics - Powered by IBM Granite AI
				</h2>
				
				<div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
					<div className="flex items-center">
						<BarChart3 className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
						<p className="text-blue-800 dark:text-blue-200 text-sm">
							<strong>Spatial Intelligence:</strong> Analyze pest distribution patterns, migration routes, and regional infestation trends for informed decision making.
						</p>
					</div>
				</div>
				
				<form onSubmit={handleSubmit} className="space-y-6 mb-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Crop
							</label>
							<select
								name="crop"
								value={formData.crop}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								required
							>
								<option value="">--Select Crop--</option>
								{cropOptions.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Pest
							</label>
							<select
								name="pest"
								value={formData.pest}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								required
							>
								<option value="">--Select Pest--</option>
								{pestOptions.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Year
							</label>
							<select
								name="year"
								value={formData.year}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								required
							>
								<option value="">--Select Year--</option>
								{yearOptions.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Week
							</label>
							<select
								name="week"
								value={formData.week}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								required
							>
								<option value="">--Select Week--</option>
								{weekOptions.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Parameter
						</label>
						<select
							name="parameter"
							value={formData.parameter}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							required
						>
							<option value="">--Select Parameter--</option>
							{parameterOptions.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Location/State
							</label>
							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								placeholder="e.g., Maharashtra, Punjab, Karnataka"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Region/District
							</label>
							<input
								type="text"
								name="region"
								value={formData.region}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								placeholder="e.g., Nashik, Ludhiana, Bangalore Rural"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
					>
						{loading ? (
							<>
								<LoaderCircle className="animate-spin h-5 w-5 mr-2" />
								Analyzing Geospatial Data...
							</>
						) : (
							<>
								<BarChart3 className="mr-2" size={18} />
								Generate Pest Geospatial Analytics
							</>
						)}
					</button>
				</form>

				{error && (
					<div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
						<strong>Error:</strong> {error}
					</div>
				)}

				{result && (
					<div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
						<h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
							<TrendingUp className="mr-2" size={24} />
							Pest Geospatial Analysis from IBM Granite AI
						</h3>
						
						<div className="mb-4">
							<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
								Confidence: {Math.round(result.confidence * 100)}%
							</span>
							<span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
								Source: {result.source}
							</span>
							<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2">
								Analysis Type: Geospatial Intelligence
							</span>
						</div>

						<div className="text-gray-700 dark:text-gray-300">
							<h4 className="font-semibold mb-2">Geospatial Analysis Results:</h4>
							<pre className="whitespace-pre-wrap text-sm bg-white dark:bg-gray-800 p-4 rounded border">
								{typeof result === 'string' ? result : result.analysis || result.rawResponse || JSON.stringify(result, null, 2)}
							</pre>
						</div>

						{formData.crop && formData.pest && (
							<div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
								<h5 className="font-semibold text-gray-800 dark:text-white mb-2">Analysis Parameters:</h5>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
									<div><strong>Crop:</strong> {formData.crop}</div>
									<div><strong>Pest:</strong> {formData.pest}</div>
									<div><strong>Time:</strong> {formData.year} Week {formData.week}</div>
									<div><strong>Parameter:</strong> {formData.parameter}</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default PestGeoSpatial;
