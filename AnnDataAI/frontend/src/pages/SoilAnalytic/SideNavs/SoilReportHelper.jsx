import React, { useState } from 'react';
import { MapPinIcon, PhoneIcon, CurrencyRupeeIcon, ClockIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const SoilReportHelper = () => {
  const [selectedRegion, setSelectedRegion] = useState('india');
  const [step, setStep] = useState(1);
  const [soilData, setSoilData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    organicMatter: '',
    calcium: '',
    magnesium: '',
    sulfur: '',
    iron: '',
    zinc: '',
    electricalConductivity: '',
    soilTexture: '',
    cropType: '',
    labName: '',
    reportDate: ''
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setSoilData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit soil data for analysis
  const analyzeSoilData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/analyze-soil-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(soilData)
      });
      
      const result = await response.json();
      if (result.success) {
        setAnalysisResult(result.data);
        setStep(7); // Move to results step
      } else {
        alert('Analysis failed: ' + result.message);
      }
    } catch (error) {
      alert('Error analyzing soil data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const regions = {
    india: {
      name: 'India',
      government: [
        {
          name: 'ICAR Soil Testing Labs',
          locations: 'All States',
          cost: '₹200-500 per sample',
          turnaround: '1-2 weeks',
          contact: 'Visit nearest KVK center',
          accuracy: 'High (Research Grade)',
          parameters: 'N-P-K, pH, Organic Matter, Micronutrients'
        },
        {
          name: 'State Agricultural Universities',
          locations: 'Major cities in each state',
          cost: '₹300-600 per sample',
          turnaround: '7-10 days',
          contact: 'University agriculture dept',
          accuracy: 'Very High',
          parameters: 'Comprehensive analysis'
        },
        {
          name: 'Krishi Vigyan Kendras (KVK)',
          locations: 'District level centers',
          cost: '₹150-400 per sample',
          turnaround: '10-14 days',
          contact: 'Local KVK center',
          accuracy: 'High',
          parameters: 'Basic + Advanced nutrients'
        }
      ],
      private: [
        {
          name: 'SoilTech Labs',
          locations: 'Mumbai, Delhi, Bangalore, Chennai',
          cost: '₹500-1200 per sample',
          turnaround: '3-5 days',
          contact: '1800-XXX-XXXX',
          accuracy: 'Very High',
          parameters: 'Full spectrum analysis'
        },
        {
          name: 'AgroStar Soil Testing',
          locations: 'Pan-India pickup service',
          cost: '₹400-800 per sample',
          turnaround: '5-7 days',
          contact: 'Mobile app booking',
          accuracy: 'High',
          parameters: 'N-P-K + 12 parameters'
        },
        {
          name: 'BigHaat Labs',
          locations: 'Bangalore, Hyderabad + online',
          cost: '₹350-700 per sample',
          turnaround: '4-6 days',
          contact: 'www.bighaat.com',
          accuracy: 'High',
          parameters: 'Comprehensive soil health'
        }
      ]
    },
    usa: {
      name: 'United States',
      government: [
        {
          name: 'USDA NRCS',
          locations: 'All states',
          cost: '$15-25 per sample',
          turnaround: '2-3 weeks',
          contact: 'County extension office',
          accuracy: 'High',
          parameters: 'Standard soil analysis'
        }
      ],
      private: [
        {
          name: 'A&L Laboratories',
          locations: 'Multiple states',
          cost: '$20-50 per sample',
          turnaround: '1-2 weeks',
          contact: '(901) 527-2861',
          accuracy: 'Very High',
          parameters: 'Complete analysis'
        }
      ]
    }
  };

  const steps = [
    {
      title: 'Choose Testing Service',
      description: 'Select government or private lab based on your budget and timeline'
    },
    {
      title: 'Collect Soil Sample',
      description: 'Follow proper sampling techniques for accurate results'
    },
    {
      title: 'Submit & Pay',
      description: 'Send sample to lab with payment and contact details'
    },
    {
      title: 'Receive Report',
      description: 'Get detailed soil analysis report with recommendations'
    },
    {
      title: 'Upload to AnnDataAI',
      description: 'Use our ML system for AI-powered crop and fertilizer recommendations'
    },
    {
      title: 'Enter Soil Data',
      description: 'Manually input soil parameters from your lab report'
    }
  ];

  const samplingInstructions = [
    {
      step: 1,
      title: 'Sample Collection Time',
      description: 'Collect samples 2-3 months before planting season',
      tips: ['Avoid recently fertilized areas', 'Sample when soil is moderately moist']
    },
    {
      step: 2,
      title: 'Sampling Pattern',
      description: 'Use zigzag pattern across the field',
      tips: ['Take 10-15 sub-samples per field', 'Mix all sub-samples thoroughly']
    },
    {
      step: 3,
      title: 'Depth & Quantity',
      description: 'Collect from 0-6 inches depth',
      tips: ['Remove grass and debris', 'Need 500g total sample weight']
    },
    {
      step: 4,
      title: 'Storage & Transport',
      description: 'Use clean plastic bags or containers',
      tips: ['Label clearly with field info', 'Deliver within 24-48 hours']
    }
  ];

  const mlBenefits = [
    {
      parameter: 'N-P-K Values',
      mlBoost: '+15% confidence',
      description: 'Precise fertilizer recommendations using IBM Granite AI'
    },
    {
      parameter: 'pH Level',
      mlBoost: '+10% accuracy',
      description: 'Crop suitability analysis with pH optimization'
    },
    {
      parameter: 'Organic Matter',
      mlBoost: '+8% precision',
      description: 'Soil health scoring and improvement strategies'
    },
    {
      parameter: 'Micronutrients',
      mlBoost: '+12% reliability',
      description: 'Advanced deficiency detection and correction'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">🌱 Soil Report Helper</h1>
        <p className="text-lg opacity-90">Get professional soil testing for AI-powered farming recommendations</p>
      </div>

      {/* Region Selection */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Select Your Region</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(regions).map(([key, region]) => (
            <button
              key={key}
              onClick={() => setSelectedRegion(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedRegion === key
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* Step-by-Step Process */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">5-Step Process</h2>
        <div className="flex flex-wrap justify-between mb-6">
          {steps.map((stepInfo, index) => (
            <div
              key={index}
              onClick={() => setStep(index + 1)}
              className={`cursor-pointer p-4 rounded-lg transition-all ${
                step === index + 1
                  ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                step === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <h3 className="font-semibold text-sm">{stepInfo.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stepInfo.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Government Labs */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-600">🏛️ Government Testing Labs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regions[selectedRegion].government.map((lab, index) => (
                <div key={index} className="border dark:border-gray-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lab.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      <span>{lab.locations}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CurrencyRupeeIcon className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{lab.cost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-blue-500" />
                      <span>{lab.turnaround}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-purple-500" />
                      <span>{lab.contact}</span>
                    </div>
                    <div className="mt-3 p-2 bg-green-50 dark:bg-green-900 rounded">
                      <p className="font-medium text-green-800 dark:text-green-200">Accuracy: {lab.accuracy}</p>
                      <p className="text-xs text-green-600 dark:text-green-300">{lab.parameters}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Private Labs */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">🏢 Private Testing Labs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regions[selectedRegion].private.map((lab, index) => (
                <div key={index} className="border dark:border-gray-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{lab.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      <span>{lab.locations}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CurrencyRupeeIcon className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{lab.cost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-blue-500" />
                      <span>{lab.turnaround}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-purple-500" />
                      <span>{lab.contact}</span>
                    </div>
                    <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900 rounded">
                      <p className="font-medium text-blue-800 dark:text-blue-200">Accuracy: {lab.accuracy}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-300">{lab.parameters}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-orange-600">🔬 Soil Sampling Instructions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {samplingInstructions.map((instruction, index) => (
              <div key={index} className="border dark:border-gray-600 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    {instruction.step}
                  </div>
                  <h4 className="font-semibold">{instruction.title}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{instruction.description}</p>
                <ul className="space-y-1">
                  {instruction.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">🤖 AnnDataAI ML Integration</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">How Our AI Uses Your Soil Data</h4>
              <div className="space-y-3">
                {mlBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900 rounded">
                    <InformationCircleIcon className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium">{benefit.parameter}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      <p className="text-xs text-purple-600 dark:text-purple-300 font-medium">{benefit.mlBoost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Upload Your Soil Report</h4>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Drag & drop your soil report PDF or click to browse</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Choose File
                  </button>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>AI Confidence:</strong> With complete soil data, our ML system achieves 91% accuracy vs 76% without soil reports
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">📝 Enter Your Soil Test Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Nutrients */}
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">Primary Nutrients (Required)</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Nitrogen (ppm)</label>
                <input
                  type="number"
                  value={soilData.nitrogen}
                  onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phosphorus (ppm)</label>
                <input
                  type="number"
                  value={soilData.phosphorus}
                  onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 22"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Potassium (ppm)</label>
                <input
                  type="number"
                  value={soilData.potassium}
                  onChange={(e) => handleInputChange('potassium', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 180"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">pH Level</label>
                <input
                  type="number"
                  step="0.1"
                  value={soilData.ph}
                  onChange={(e) => handleInputChange('ph', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 6.8"
                />
              </div>
            </div>

            {/* Secondary Nutrients */}
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">Secondary Nutrients (Optional)</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Organic Matter (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={soilData.organicMatter}
                  onChange={(e) => handleInputChange('organicMatter', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2.3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Calcium (ppm)</label>
                <input
                  type="number"
                  value={soilData.calcium}
                  onChange={(e) => handleInputChange('calcium', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Magnesium (ppm)</label>
                <input
                  type="number"
                  value={soilData.magnesium}
                  onChange={(e) => handleInputChange('magnesium', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Electrical Conductivity (dS/m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={soilData.electricalConductivity}
                  onChange={(e) => handleInputChange('electricalConductivity', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 0.8"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-600">Additional Information</h4>
              <div>
                <label className="block text-sm font-medium mb-1">Soil Texture</label>
                <select
                  value={soilData.soilTexture}
                  onChange={(e) => handleInputChange('soilTexture', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select texture</option>
                  <option value="clay">Clay</option>
                  <option value="loam">Loam</option>
                  <option value="sand">Sand</option>
                  <option value="silt">Silt</option>
                  <option value="clay-loam">Clay Loam</option>
                  <option value="sandy-loam">Sandy Loam</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Crop</label>
                <input
                  type="text"
                  value={soilData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Wheat, Rice, Cotton"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lab Name</label>
                <input
                  type="text"
                  value={soilData.labName}
                  onChange={(e) => handleInputChange('labName', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ICAR Soil Lab"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Report Date</label>
                <input
                  type="date"
                  value={soilData.reportDate}
                  onChange={(e) => handleInputChange('reportDate', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={analyzeSoilData}
              disabled={loading || !soilData.nitrogen || !soilData.phosphorus || !soilData.potassium || !soilData.ph}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Analyzing with IBM Granite AI...' : '🤖 Analyze Soil with AI'}
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Required: Nitrogen, Phosphorus, Potassium, and pH values
            </p>
          </div>
        </div>
      )}

      {step === 7 && analysisResult && (
        <div className="space-y-6">
          {/* Analysis Results */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">🎉 AI Analysis Complete!</h3>
            <p>Your soil has been analyzed using IBM Granite AI with advanced ML confidence scoring</p>
            <p className="text-sm opacity-90 mt-1">
              Confidence: {(analysisResult.soil_health.ml_confidence * 100).toFixed(1)}% | 
              Data Completeness: {analysisResult.soil_health.data_completeness}
            </p>
          </div>

          {/* Soil Health Score */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-4">🌱 Soil Health Analysis</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    analysisResult.soil_health.overall_score >= 80 ? 'bg-green-100 text-green-600' :
                    analysisResult.soil_health.overall_score >= 60 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {analysisResult.soil_health.overall_score}
                  </div>
                  <div>
                    <h5 className="font-semibold">Overall Soil Health Score</h5>
                    <p className="text-sm text-gray-600">Out of 100 points</p>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Nutrient Status</h5>
                <div className="space-y-2">
                  {Object.entries(analysisResult.soil_health.nutrient_status).map(([nutrient, status]) => (
                    <div key={nutrient} className="flex justify-between items-center">
                      <span className="capitalize">{nutrient.replace('_', ' ')}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        status === 'Adequate' ? 'bg-green-100 text-green-600' :
                        status === 'Moderate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-green-600">🌾 Fertilizer Recommendations</h4>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  <strong>ML Confidence:</strong> {(analysisResult.fertilizer_recommendations.confidence * 100).toFixed(1)}%
                </p>
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: analysisResult.fertilizer_recommendations.recommendations.replace(/\n/g, '<br>') }} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-blue-600">🚜 Crop Recommendations</h4>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  <strong>ML Confidence:</strong> {(analysisResult.crop_recommendations.confidence * 100).toFixed(1)}%
                </p>
                <div className="space-y-2">
                  {analysisResult.crop_recommendations.recommendations.slice(0, 3).map((crop, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900 rounded">
                      <span className="font-medium">{crop.crop || `Crop ${index + 1}`}</span>
                      <span className="text-sm text-blue-600">Recommended</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Economic Analysis */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-purple-600">💰 Economic Impact</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analysisResult.economic_analysis.estimated_fertilizer_cost}</div>
                <p className="text-sm text-gray-600">Fertilizer Cost</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysisResult.economic_analysis.yield_improvement_potential}</div>
                <p className="text-sm text-gray-600">Yield Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analysisResult.economic_analysis.roi_timeline}</div>
                <p className="text-sm text-gray-600">ROI Timeline</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-orange-600">📋 Next Steps</h4>
            <ul className="space-y-2">
              {analysisResult.next_steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Quick Cost Comparison */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">💰 Cost-Benefit Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-600">
                <th className="text-left p-2">Testing Option</th>
                <th className="text-left p-2">Cost Range</th>
                <th className="text-left p-2">Accuracy</th>
                <th className="text-left p-2">ML Confidence Boost</th>
                <th className="text-left p-2">ROI Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-600">
                <td className="p-2">Government Labs</td>
                <td className="p-2">₹200-600</td>
                <td className="p-2">High</td>
                <td className="p-2">+15%</td>
                <td className="p-2">1 season</td>
              </tr>
              <tr className="border-b dark:border-gray-600">
                <td className="p-2">Private Labs</td>
                <td className="p-2">₹400-1200</td>
                <td className="p-2">Very High</td>
                <td className="p-2">+20%</td>
                <td className="p-2">1 season</td>
              </tr>
              <tr className="border-b dark:border-gray-600">
                <td className="p-2">DIY Kits</td>
                <td className="p-2">₹500-2000</td>
                <td className="p-2">Moderate</td>
                <td className="p-2">+10%</td>
                <td className="p-2">2-3 seasons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">🚀 Ready to Get Started?</h3>
        <p className="mb-4">Follow the steps above to get professional soil testing and unlock AI-powered farming insights</p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setStep(1)}
            className="px-6 py-2 bg-white text-blue-600 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            Choose Testing Lab
          </button>
          <button 
            onClick={() => setStep(2)}
            className="px-6 py-2 bg-white text-green-600 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            Learn Sampling
          </button>
          <button 
            onClick={() => setStep(6)}
            className="px-6 py-2 bg-white text-purple-600 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            Enter Soil Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoilReportHelper;
