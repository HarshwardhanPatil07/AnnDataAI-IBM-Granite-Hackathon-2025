import { useState, useRef } from "react";
import { LoaderCircle, Upload, X, Camera, Bug, AlertTriangle } from "lucide-react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const PestOutbreak = () => {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [selectedImages, setSelectedImages] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const fileInputRef = useRef(null);
	const [formData, setFormData] = useState({
		cropType: '',
		pestSymptoms: '',
		affectedArea: '',
		severityLevel: '',
		location: '',
		weatherConditions: '',
		previousTreatments: '',
		pestType: '',
		infestationStage: ''
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		if (files.length === 0) return;

		// Limit to 5 images
		const newFiles = files.slice(0, 5 - selectedImages.length);
		
		// Validate file types and sizes
		const validFiles = newFiles.filter(file => {
			const isValidType = file.type.startsWith('image/');
			const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
			
			if (!isValidType) {
				setError('Please upload only image files');
				return false;
			}
			if (!isValidSize) {
				setError('Image size should be less than 10MB');
				return false;
			}
			return true;
		});

		if (validFiles.length > 0) {
			setError(null);
			setSelectedImages(prev => [...prev, ...validFiles]);
			
			// Create previews
			validFiles.forEach(file => {
				const reader = new FileReader();
				reader.onload = (e) => {
					setImagePreviews(prev => [...prev, {
						file,
						url: e.target.result,
						id: Date.now() + Math.random()
					}]);
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeImage = (indexToRemove) => {
		setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
		setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
	};

	const convertImageToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		
		try {
			// Convert images to base64 if any are selected
			let imageData = [];
			if (selectedImages.length > 0) {
				imageData = await Promise.all(
					selectedImages.map(async (file) => {
						const base64 = await convertImageToBase64(file);
						return {
							data: base64,
							name: file.name,
							size: file.size,
							type: file.type
						};
					})
				);
			}

			// Enhanced form data for pest detection
			const enhancedFormData = {
				cropType: formData.cropType,
				symptoms: formData.pestSymptoms,
				affectedArea: formData.affectedArea,
				weatherConditions: formData.weatherConditions,
				severity: formData.severityLevel,
				location: formData.location,
				previousTreatments: formData.previousTreatments,
				images: imageData,
				hasImages: imageData.length > 0,
				analysisType: imageData.length > 0 ? 'pest_image_and_text' : 'pest_text_only',
				detectionType: 'pest_outbreak',
				pestType: formData.pestType || 'unknown',
				damageLevel: formData.severityLevel,
				infestationStage: formData.infestationStage || 'unknown'
			};

			// Use the dedicated pest outbreak detection endpoint
			const response = await ibmGraniteService.detectPestOutbreak(enhancedFormData);
			setResult(response.data);
		} catch (err) {
			setError(err.message || 'Failed to detect pest outbreak');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
					<Bug className="mr-3 text-red-600" size={28} />
					Pest Outbreak Detection - Powered by IBM Granite AI
				</h2>
				
				<div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
					<div className="flex items-center">
						<AlertTriangle className="text-red-600 dark:text-red-400 mr-2" size={20} />
						<p className="text-red-800 dark:text-red-200 text-sm">
							<strong>Early Detection is Key:</strong> Upload clear images of pest damage and provide detailed symptoms for accurate identification and treatment recommendations.
						</p>
					</div>
				</div>
				
				<form onSubmit={handleSubmit} className="space-y-6 mb-8">
					{/* Image Upload Section */}
					<div className="bg-orange-50 dark:bg-orange-900 p-6 rounded-lg border-2 border-dashed border-orange-300 dark:border-orange-600">
						<h3 className="text-lg font-medium text-orange-800 dark:text-orange-200 mb-4 flex items-center">
							<Camera className="mr-2" size={20} />
							Upload Pest Damage Images (Recommended for Better Analysis)
						</h3>
						
						<input
							ref={fileInputRef}
							type="file"
							multiple
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
						/>
						
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mb-4"
						>
							<Upload className="mr-2" size={18} />
							Select Pest Damage Images (Max 5 images, 10MB each)
						</button>
						
						{imagePreviews.length > 0 && (
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
								{imagePreviews.map((preview, index) => (
									<div key={preview.id} className="relative">
										<img
											src={preview.url}
											alt={`Pest Damage ${index + 1}`}
											className="w-full h-24 object-cover rounded-lg border-2 border-gray-300"
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
										>
											<X size={14} />
										</button>
									</div>
								))}
							</div>
						)}
						
						<p className="text-sm text-orange-600 dark:text-orange-300 mt-2">
							💡 For best results: Upload clear images showing pest damage, insect presence, chewed leaves, or other pest indicators.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Crop Type
							</label>
							<select
								name="cropType"
								value={formData.cropType}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
								<option value="cabbage">Cabbage</option>
								<option value="onion">Onion</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Severity Level
							</label>
							<select
								name="severityLevel"
								value={formData.severityLevel}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								required
							>
								<option value="">Select Severity</option>
								<option value="low">Low (Early signs)</option>
								<option value="moderate">Moderate (Noticeable damage)</option>
								<option value="high">High (Significant damage)</option>
								<option value="severe">Severe (Crop at risk)</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Pest Symptoms & Damage Description
						</label>
						<textarea
							name="pestSymptoms"
							value={formData.pestSymptoms}
							onChange={handleInputChange}
							rows="4"
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Describe pest damage (e.g., holes in leaves, chewed stems, insect presence, white spots, sticky residue, etc.)"
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Affected Area
							</label>
							<select
								name="affectedArea"
								value={formData.affectedArea}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							>
								<option value="">Select Affected Area</option>
								<option value="leaves">Leaves</option>
								<option value="stem">Stem</option>
								<option value="fruit">Fruit/Pods</option>
								<option value="roots">Roots</option>
								<option value="flowers">Flowers</option>
								<option value="entire_plant">Entire Plant</option>
								<option value="multiple_areas">Multiple Areas</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Location/Region
							</label>
							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								placeholder="e.g., Maharashtra, Punjab, etc."
							/>
						</div>
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
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Recent weather patterns (e.g., hot & humid, recent rains, dry spell, temperature changes)"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Suspected Pest Type (if known)
							</label>
							<select
								name="pestType"
								value={formData.pestType}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							>
								<option value="">Select if known</option>
								<option value="aphids">Aphids</option>
								<option value="caterpillars">Caterpillars</option>
								<option value="thrips">Thrips</option>
								<option value="whiteflies">Whiteflies</option>
								<option value="spider_mites">Spider Mites</option>
								<option value="beetles">Beetles</option>
								<option value="leaf_miners">Leaf Miners</option>
								<option value="scale_insects">Scale Insects</option>
								<option value="borers">Borers</option>
								<option value="unknown">Unknown/Not Sure</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Infestation Stage
							</label>
							<select
								name="infestationStage"
								value={formData.infestationStage}
								onChange={handleInputChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							>
								<option value="">Select Stage</option>
								<option value="early">Early (First signs noticed)</option>
								<option value="developing">Developing (Spreading)</option>
								<option value="established">Established (Well spread)</option>
								<option value="severe">Severe (Major infestation)</option>
								<option value="unknown">Unknown</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Previous Treatments (if any)
						</label>
						<textarea
							name="previousTreatments"
							value={formData.previousTreatments}
							onChange={handleInputChange}
							rows="2"
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							placeholder="Any pesticides or treatments already applied"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
					>
						{loading ? (
							<>
								<LoaderCircle className="animate-spin h-5 w-5 mr-2" />
								Analyzing Pest Outbreak...
							</>
						) : (
							<>
								<Bug className="mr-2" size={18} />
								Detect Pest Outbreak
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
					<div className="bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg p-6">
						<h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
							<Bug className="mr-2" size={24} />
							Pest Analysis from IBM Granite AI
						</h3>
						
						<div className="mb-4">
							<span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
								Confidence: {Math.round(result.confidence * 100)}%
							</span>
							<span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full ml-2">
								Source: {result.source}
							</span>
							{result.imageAnalysis && (
								<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2">
									Images Analyzed: {result.imageAnalysis.imagesProcessed}
								</span>
							)}
						</div>

						{result.diagnosis && result.diagnosis.diagnosis ? (
							<div className="space-y-4">
								<div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
									<h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
										Pest Identification: {result.diagnosis.diagnosis}
									</h4>
									<p className="text-gray-600 dark:text-gray-300 mb-2">
										<strong>Confidence:</strong> {result.diagnosis.confidence}
									</p>
									<div className="text-gray-700 dark:text-gray-300">
										<h5 className="font-semibold mb-2">Treatment & Prevention Recommendations:</h5>
										<pre className="whitespace-pre-wrap text-sm">
											{result.diagnosis.treatment}
										</pre>
									</div>
								</div>
							</div>
						) : (
							<div className="text-gray-700 dark:text-gray-300">
								<h4 className="font-semibold mb-2">AI Pest Analysis:</h4>
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

export default PestOutbreak;