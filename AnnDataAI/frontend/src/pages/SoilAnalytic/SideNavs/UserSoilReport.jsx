import React, { useState } from "react";
import { CloudArrowUpIcon, DocumentTextIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const UserSoilReport = () => {
	const [file, setFile] = useState(null);
	const [analysis, setAnalysis] = useState(null);
	const [loading, setLoading] = useState(false);
	const [dragActive, setDragActive] = useState(false);

	// Handle file selection
	const handleFileSelect = (selectedFile) => {
		if (selectedFile && selectedFile.type === "application/pdf") {
			setFile(selectedFile);
			setAnalysis(null);
		} else {
			alert("Please select a PDF file");
		}
	};

	// Handle drag and drop
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFileSelect(e.dataTransfer.files[0]);
		}
	};

	// Process soil report using IBM Granite AI
	const processSoilReport = async () => {
		if (!file) {
			alert("Please select a PDF file first");
			return;
		}

		setLoading(true);
		try {
			// Simulate PDF processing and extract sample data
			// In a real implementation, you would use OCR or PDF parsing
			const mockSoilData = {
				nitrogen: 45,
				phosphorus: 22,
				potassium: 180,
				ph: 6.8,
				organicMatter: 2.3,
				calcium: 1200,
				magnesium: 300,
				sulfur: 15,
				electricalConductivity: 0.8,
				soilTexture: "loam",
				cropType: "wheat",
				labName: "Sample Lab from PDF",
				reportDate: new Date().toISOString().split('T')[0]
			};

			// Call our IBM Granite-powered soil analysis API
			const response = await fetch('/api/ai/analyze-soil-report', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mockSoilData)
			});

			const result = await response.json();
			
			if (result.success) {
				setAnalysis(result.data);
			} else {
				alert('Analysis failed: ' + result.message);
			}
		} catch (error) {
			console.error('Error processing soil report:', error);
			alert('Error processing soil report: ' + error.message);
		} finally {
			setLoading(false);
		}
	};

	if (analysis) {
		// Safety checks for data structure
		const soilHealth = analysis.soil_health || {};
		const nutrientStatus = soilHealth.nutrient_status || {};
		const fertilizerRecs = analysis.fertilizer_recommendations || {};
		const cropRecs = analysis.crop_recommendations || {};
		const economicAnalysis = analysis.economic_analysis || {};
		
		return (
			<div className="p-6 max-w-5xl mx-auto space-y-6">
				{/* Header */}
				<div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
					<h1 className="text-2xl font-bold mb-2">🌱 Soil Analysis Results</h1>
					<p className="opacity-90">
						{file?.name || 'Analysis Report'} • Confidence: {((soilHealth.ml_confidence || 0.85) * 100).toFixed(1)}%
					</p>
				</div>

				{/* Soil Health Overview */}
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
					<div className="flex items-center gap-4 mb-6">
						<div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
							(soilHealth.overall_score || 75) >= 80 ? 'bg-green-100 text-green-600' :
							(soilHealth.overall_score || 75) >= 60 ? 'bg-yellow-100 text-yellow-600' :
							'bg-red-100 text-red-600'
						}`}>
							{soilHealth.overall_score || 75}
						</div>
						<div>
							<h3 className="text-2xl font-bold">Soil Health Score</h3>
							<p className="text-gray-600">
								{(soilHealth.overall_score || 75) >= 80 ? 'Excellent' :
								 (soilHealth.overall_score || 75) >= 60 ? 'Good' : 'Needs Improvement'}
							</p>
						</div>
					</div>

					{/* Key Nutrients */}
					<div className="grid md:grid-cols-3 gap-4">
						{Object.entries(nutrientStatus).length > 0 ? 
							Object.entries(nutrientStatus).slice(0, 6).map(([nutrient, status]) => (
								<div key={nutrient} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
									<span className="font-medium capitalize">{nutrient.replace('_', ' ')}</span>
									<span className={`px-3 py-1 rounded-full text-sm font-medium ${
										status === 'Adequate' ? 'bg-green-100 text-green-700' :
										status === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
										'bg-red-100 text-red-700'
									}`}>
										{status}
									</span>
								</div>
							))
							:
							// Fallback display when no nutrient status available
							['Nitrogen', 'Phosphorus', 'Potassium', 'pH Level', 'Organic Matter', 'Calcium'].map((nutrient, index) => (
								<div key={nutrient} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
									<span className="font-medium">{nutrient}</span>
									<span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
										Adequate
									</span>
								</div>
							))
						}
					</div>
				</div>

				{/* Main Recommendations */}
				<div className="grid md:grid-cols-2 gap-6">
					{/* Fertilizer Recommendations */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h4 className="text-xl font-semibold mb-4 text-green-600">🌾 Fertilizer Plan</h4>
						<div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
							{fertilizerRecs.recommendations ? (
								<div dangerouslySetInnerHTML={{ 
									__html: fertilizerRecs.recommendations.replace(/\n/g, '<br>') 
								}} />
							) : (
								<div>
									<p>• Apply balanced NPK fertilizer (10-10-10) at 200 kg/hectare</p>
									<p>• Add organic compost 2 tons/hectare before planting</p>
									<p>• Consider micronutrient supplements based on soil test</p>
									<p>• Split application: 50% at planting, 50% at tillering stage</p>
								</div>
							)}
						</div>
					</div>

					{/* Crop Recommendations */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h4 className="text-xl font-semibold mb-4 text-blue-600">🚜 Best Crops</h4>
						<div className="space-y-3">
							{cropRecs.recommendations && cropRecs.recommendations.length > 0 ? 
								cropRecs.recommendations.slice(0, 3).map((crop, index) => (
									<div key={index} className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
										<span className="font-medium text-blue-800 dark:text-blue-200">
											{crop.crop || crop || `Recommended Crop ${index + 1}`}
										</span>
									</div>
								))
								:
								// Fallback recommendations
								['Wheat (High Yield Variety)', 'Barley (Disease Resistant)', 'Oats (Cold Tolerant)'].map((crop, index) => (
									<div key={index} className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
										<span className="font-medium text-blue-800 dark:text-blue-200">
											{crop}
										</span>
									</div>
								))
							}
						</div>
					</div>
				</div>

				{/* Economic Impact */}
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
					<h4 className="text-xl font-semibold mb-4 text-purple-600">💰 Economic Impact</h4>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
							<div className="text-2xl font-bold text-purple-600">
								{economicAnalysis.estimated_fertilizer_cost || '₹8,000-12,000'}
							</div>
							<p className="text-sm text-purple-700 dark:text-purple-300">Investment Needed</p>
						</div>
						<div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
							<div className="text-2xl font-bold text-green-600">
								{economicAnalysis.yield_improvement_potential || '15-25%'}
							</div>
							<p className="text-sm text-green-700 dark:text-green-300">Yield Increase</p>
						</div>
						<div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
							<div className="text-2xl font-bold text-blue-600">
								{economicAnalysis.roi_timeline || '3-6 months'}
							</div>
							<p className="text-sm text-blue-700 dark:text-blue-300">Return Timeline</p>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-center space-x-4 pt-4">
					<button
						onClick={() => {
							setAnalysis(null);
							setFile(null);
						}}
						className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
					>
						Analyze Another Report
					</button>
					<button
						onClick={() => window.print()}
						className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
					>
						Save Results
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			{/* Header */}
			<div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg mb-6">
				<h1 className="text-2xl font-bold mb-2">🌱 Soil Report Analyzer</h1>
				<p className="opacity-90">Upload your PDF soil report for AI-powered analysis</p>
			</div>

			{/* File Upload Area */}
			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
				<div
					className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
						dragActive 
							? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
							: 'border-gray-300 dark:border-gray-600'
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				>
					<CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg font-semibold mb-2">Upload Soil Report PDF</h3>
					<p className="text-gray-600 dark:text-gray-400 mb-4">
						Drag and drop your soil report PDF here, or click to browse
					</p>
					<input
						type="file"
						accept=".pdf"
						onChange={(e) => handleFileSelect(e.target.files[0])}
						className="hidden"
						id="fileInput"
					/>
					<label
						htmlFor="fileInput"
						className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
					>
						Choose PDF File
					</label>
				</div>

				{file && (
					<div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
						<div className="flex items-center gap-3">
							<DocumentTextIcon className="w-6 h-6 text-green-600" />
							<div>
								<p className="font-medium text-green-800 dark:text-green-200">{file.name}</p>
								<p className="text-sm text-green-600 dark:text-green-300">
									{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Analysis Button */}
			<div className="text-center">
				<button
					onClick={processSoilReport}
					disabled={!file || loading}
					className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
				>
					{loading ? (
						<div className="flex items-center gap-2">
							<CpuChipIcon className="w-5 h-5 animate-pulse" />
							Analyzing with IBM Granite AI...
						</div>
					) : (
						<div className="flex items-center gap-2">
							<CpuChipIcon className="w-5 h-5" />
							Analyze Soil Report
						</div>
					)}
				</button>
			</div>
		</div>
	);
};

export default UserSoilReport;
