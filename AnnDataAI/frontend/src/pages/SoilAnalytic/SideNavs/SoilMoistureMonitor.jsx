import React, { useState, useEffect } from "react";
import ibmGraniteService from "../../../services/ibmGraniteService";

const SoilMoistureMonitor = () => {
  // Soil Moisture Monitoring States
  const [soilData, setSoilData] = useState({
    moisture: 65,
    temperature: 23.5,
    pH: 6.8,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 78,
    organicMatter: 3.2,
    lastUpdate: new Date()
  });
  
  const [alerts, setAlerts] = useState([
    {
      message: "Optimal moisture level detected",
      status: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    }
  ]);
  
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deviceId] = useState("ANN_DEVICE_001");
  const [isConnected] = useState(true); // Simulated connection

  // Simulate real-time soil data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSoilData(prev => ({
        ...prev,
        moisture: Math.max(0, Math.min(100, prev.moisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(35, prev.temperature + (Math.random() - 0.5) * 2)),
        pH: Math.max(5.5, Math.min(8.5, prev.pH + (Math.random() - 0.5) * 0.2)),
        lastUpdate: new Date()
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Monitor for alerts
  useEffect(() => {
    if (soilData.moisture < 30) {
      const newAlert = {
        message: "Low soil moisture detected - Consider irrigation",
        status: "warning",
        timestamp: new Date()
      };
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    } else if (soilData.moisture > 85) {
      const newAlert = {
        message: "High soil moisture - Risk of waterlogging",
        status: "warning",
        timestamp: new Date()
      };
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    }
  }, [soilData.moisture]);

  // Fetch AI analysis for soil conditions
  const getAIAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ibmGraniteService.getGeospatialAnalysis({
        soilMoisture: soilData.moisture,
        temperature: soilData.temperature,
        pH: soilData.pH,
        nutrients: {
          nitrogen: soilData.nitrogen,
          phosphorus: soilData.phosphorus,
          potassium: soilData.potassium
        },
        organicMatter: soilData.organicMatter,
        location: "Sample Farm Location",
        cropType: "Mixed Crops"
      });
      
      setAiAnalysis(response.data);
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to determine moisture status and color
  const getMoistureStatus = (level) => {
    if (level < 30) return { status: "Low", color: "red", bgColor: "bg-red-100 dark:bg-red-900/20" };
    if (level < 70) return { status: "Optimal", color: "green", bgColor: "bg-green-100 dark:bg-green-900/20" };
    return { status: "High", color: "blue", bgColor: "bg-blue-100 dark:bg-blue-900/20" };
  };

  const { status, color, bgColor } = getMoistureStatus(soilData.moisture);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Soil Moisture Monitor</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Real-time soil analysis powered by IBM Granite AI</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center px-3 py-2 rounded-full ${isConnected ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
            <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'} ${isConnected ? 'animate-pulse' : ''}`}></div>
            <span className="text-sm font-medium">{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Device: {deviceId}
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Readings */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Current Soil Conditions</h3>
          
          {/* Moisture Gauge */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(soilData.moisture / 100) * 314} 314`}
                  className={`text-${color}-500 transition-all duration-1000`}
                  stroke="currentColor"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-gray-800 dark:text-white">{soilData.moisture.toFixed(0)}%</div>
                <div className={`text-sm font-medium text-${color}-600 dark:text-${color}-400`}>Soil Moisture</div>
                <div className={`text-xs px-2 py-1 rounded-full mt-1 text-${color}-800 dark:text-${color}-200 ${bgColor}`}>
                  {status}
                </div>
              </div>
            </div>
          </div>

          {/* Other Readings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Temperature</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{soilData.temperature.toFixed(1)}°C</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">pH Level</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{soilData.pH.toFixed(1)}</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">NPK Avg</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{((soilData.nitrogen + soilData.phosphorus + soilData.potassium) / 3).toFixed(0)}</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Organic Matter</div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">{soilData.organicMatter.toFixed(1)}%</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Last Update</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              {soilData.lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Alerts & AI Analysis */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.status === "warning"
                        ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600"
                        : "bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-600"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {alert.status === "warning" ? (
                          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className={`text-sm font-medium ${
                          alert.status === "warning"
                            ? "text-yellow-800 dark:text-yellow-200"
                            : "text-blue-800 dark:text-blue-200"
                        }`}>
                          {alert.message}
                        </h4>
                        <p className={`text-xs mt-1 ${
                          alert.status === "warning"
                            ? "text-yellow-600 dark:text-yellow-300"
                            : "text-blue-600 dark:text-blue-300"
                        }`}>
                          {alert.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent alerts</p>
              )}
            </div>
          </div>

          {/* AI Analysis Button */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">AI Soil Analysis</h3>
            <button
              onClick={getAIAnalysis}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get IBM Granite AI Analysis
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm">
                  <span className="font-semibold">Error:</span> {error}
                </p>
              </div>
            )}

            {aiAnalysis && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">IBM Granite AI Insights:</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {aiAnalysis.analysis || aiAnalysis.recommendation || "Analysis in progress..."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Nutrient Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Detailed Nutrient Analysis</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nitrogen (N)</span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">{soilData.nitrogen} ppm</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(soilData.nitrogen, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {soilData.nitrogen > 60 ? 'High' : soilData.nitrogen > 30 ? 'Optimal' : 'Low'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phosphorus (P)</span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">{soilData.phosphorus} ppm</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(soilData.phosphorus, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {soilData.phosphorus > 50 ? 'High' : soilData.phosphorus > 25 ? 'Optimal' : 'Low'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potassium (K)</span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">{soilData.potassium} ppm</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(soilData.potassium, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {soilData.potassium > 70 ? 'High' : soilData.potassium > 40 ? 'Optimal' : 'Low'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMoistureMonitor;
