import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import FeatureCard from "./FeatureCard";
import MapCardContainer from "./MapCardContainer";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQ from "./FAQ";
import { useNavigate } from "react-router-dom";
// import OptimalGWCardContainer from "./OptimalCropSeasonCardContainer";
import Testimonial from "./Testimonial";
import Features from "./Features";
import OptimalCropSeasonCardContainer from "./OptimalCropSeasonCardContainer";
import GeospatialAnalysis from "./GeoSpatialAnalysis";
import { useTranslation } from "react-i18next";
import useTokenStore from "../../store/useTokenStore.js";
import ibmGraniteService from "../../services/ibmGraniteService.js";

const HomePage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { token } = useTokenStore((state) => state);

	// Financial Support Section States
	const [activeFinancialTab, setActiveFinancialTab] = useState('schemes');
	const [loanFormData, setLoanFormData] = useState({
		age: '',
		interestRate: 'Less than 8.5%',
		loanAmount: '',
		farmingYears: '',
		annualIncome: '',
		loanDefault: 'No',
		debtPercentage: '',
		ownLand: 'Yes',
		totalAssets: '',
		transactionYears: '',
		repaymentHistory: 'Always',
		incomeFluctuations: 'Minimal fluctuations'
	});
	const [loanRecommendation, setLoanRecommendation] = useState(null);
	const [showSchemeDetails, setShowSchemeDetails] = useState(null);
	
	// IBM Granite AI Integration States
	const [aiGovernmentSchemes, setAiGovernmentSchemes] = useState(null);
	const [aiLoanRecommendation, setAiLoanRecommendation] = useState(null);
	const [aiEducationContent, setAiEducationContent] = useState(null);
	const [loadingAI, setLoadingAI] = useState({
		schemes: false,
		loans: false,
		education: false
	});
	const [errorAI, setErrorAI] = useState({
		schemes: null,
		loans: null,
		education: null
	});

	// Video Modal State for YouTube Integration
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [showVideoModal, setShowVideoModal] = useState(false);

	// Scroll to Financial Support section
	const scrollToFinancialSupport = () => {
		const element = document.getElementById('financial-support');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	// IBM Granite AI Functions for Financial Support
	const fetchAIGovernmentSchemes = async (farmerData = {}) => {
		setLoadingAI(prev => ({ ...prev, schemes: true }));
		setErrorAI(prev => ({ ...prev, schemes: null }));
		
		try {
			const response = await ibmGraniteService.getGovernmentSchemes({
				landSize: farmerData.landSize || '2-5 acres',
				cropTypes: farmerData.cropTypes || 'Rice, Wheat',
				annualIncome: farmerData.annualIncome || '₹2-3 lakhs',
				location: farmerData.location || 'Maharashtra, India',
				farmCategory: farmerData.farmCategory || 'Small farmer',
				specialNeeds: farmerData.specialNeeds || 'Crop insurance, Credit access'
			});
			
			setAiGovernmentSchemes(response.data);
		} catch (error) {
			console.error('Error fetching AI government schemes:', error);
			setErrorAI(prev => ({ ...prev, schemes: error.message }));
		} finally {
			setLoadingAI(prev => ({ ...prev, schemes: false }));
		}
	};

	const fetchAILoanRecommendation = async (loanData) => {
		setLoadingAI(prev => ({ ...prev, loans: true }));
		setErrorAI(prev => ({ ...prev, loans: null }));
		
		try {
			// Transform frontend form data to backend expected format
			const transformedData = {
				farmSize: loanData.totalAssets || '10', // Use totalAssets as farmSize approximation
				income: loanData.annualIncome || '50000',
				creditScore: '700', // Default credit score since we don't collect this
				loanPurpose: 'Agriculture and farming operations',
				collateral: loanData.ownLand === 'Yes' ? 'Land ownership' : 'No collateral',
				farmingExperience: loanData.farmingYears || '5',
				cropType: 'Mixed farming',
				location: 'India'
			};
			
			const response = await ibmGraniteService.getLoanRecommendation(transformedData);
			setAiLoanRecommendation(response.data);
			setLoanRecommendation(response.data); // Also set the local state for display
		} catch (error) {
			console.error('Error fetching AI loan recommendation:', error);
			setErrorAI(prev => ({ ...prev, loans: error.message }));
		} finally {
			setLoadingAI(prev => ({ ...prev, loans: false }));
		}
	};

	const fetchAIEducationContent = async (educationData = {}) => {
		setLoadingAI(prev => ({ ...prev, education: true }));
		setErrorAI(prev => ({ ...prev, education: null }));
		
		try {
			const response = await ibmGraniteService.getFarmerEducation({
				experience: educationData.experience || '5-10 years',
				crops: educationData.crops || 'Rice, Wheat, Vegetables',
				goals: educationData.goals || 'Increase productivity, Learn modern techniques',
				techLevel: educationData.techLevel || 'Intermediate',
				language: educationData.language || 'Hindi/English',
				location: educationData.location || 'India',
				farmSize: educationData.farmSize || '2-5 acres'
			});
			
			setAiEducationContent(response.data);
		} catch (error) {
			console.error('Error fetching AI education content:', error);
			setErrorAI(prev => ({ ...prev, education: error.message }));
		} finally {
			setLoadingAI(prev => ({ ...prev, education: false }));
		}
	};

	// Government Schemes Data
	const governmentSchemes = [
		{
			id: 1,
			name: "PM-KISAN Scheme",
			description: "₹6,000 annual income support to farmers",
			benefits: "Direct cash transfer of ₹2,000 every 4 months",
			eligibility: "All landholding farmers (subject to certain exclusions)",
			howToApply: "Apply online at pmkisan.gov.in or visit nearest CSC/Bank",
			documents: "Aadhaar, Bank Account, Land Records",
			category: "Income Support"
		},
		{
			id: 2,
			name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
			description: "Crop insurance with premium subsidy",
			benefits: "Up to 2% premium for Kharif, 1.5% for Rabi crops",
			eligibility: "All farmers including sharecroppers and tenant farmers",
			howToApply: "Through banks, insurance companies, or online portal",
			documents: "Aadhaar, Bank Account, Land Records, Sowing Certificate",
			category: "Insurance"
		},
		{
			id: 3,
			name: "Kisan Credit Card (KCC)",
			description: "Easy credit access for farmers",
			benefits: "Credit up to ₹3 lakh at 7% interest rate",
			eligibility: "All farmers with cultivable land",
			howToApply: "Apply at any bank branch",
			documents: "Land Documents, Identity Proof, Address Proof",
			category: "Credit"
		},
		{
			id: 4,
			name: "Soil Health Card Scheme",
			description: "Free soil testing and recommendations",
			benefits: "Reduce fertilizer costs by 8-10%",
			eligibility: "All farmers",
			howToApply: "Contact local agriculture department",
			documents: "Land Records, Farmer ID",
			category: "Soil Health"
		},
		{
			id: 5,
			name: "Pradhan Mantri Krishi Sinchai Yojana",
			description: "Irrigation support and water conservation",
			benefits: "90% subsidy for drip/sprinkler irrigation",
			eligibility: "Individual farmers, SHGs, FPOs",
			howToApply: "Through state agriculture departments",
			documents: "Land Records, Project Proposal, Bank Account",
			category: "Irrigation"
		}
	];

	// Educational Videos Data with YouTube Integration
	const educationalVideos = [
		{
			id: 1,
			title: "Modern Irrigation Techniques",
			duration: "15 min",
			channel: "Agriculture Today",
			thumbnail: "🌱",
			youtubeId: "2PlrjyBJWCE", // Actual agriculture irrigation video
			youtubeUrl: "https://www.youtube.com/watch?v=2PlrjyBJWCE",
			description: "Learn about drip irrigation, sprinkler systems, and water conservation methods to maximize crop yield while reducing water usage.",
			topics: ["Drip Irrigation", "Sprinkler Systems", "Water Conservation"],
			views: "125K",
			rating: 4.8
		},
		{
			id: 2,
			title: "Organic Fertilizer Methods",
			duration: "22 min",
			channel: "Krishi Vigyan",
			thumbnail: "🌿",
			youtubeId: "fC2AiZdBivY", // Actual organic farming video
			youtubeUrl: "https://www.youtube.com/watch?v=fC2AiZdBivY",
			description: "Discover how to create and use organic fertilizers, compost, and bio-fertilizers to improve soil health naturally.",
			topics: ["Composting", "Bio-fertilizers", "Soil Health"],
			views: "89K",
			rating: 4.7
		},
		{
			id: 3,
			title: "Crop Disease Prevention",
			duration: "18 min",
			channel: "ICAR Channel",
			thumbnail: "🔬",
			youtubeId: "YQs0ic2wJvs", // Actual crop disease management video
			youtubeUrl: "https://www.youtube.com/watch?v=YQs0ic2wJvs",
			description: "Identify early signs of crop diseases and learn integrated pest management techniques for healthy crops.",
			topics: ["Disease Identification", "IPM", "Prevention Methods"],
			views: "156K",
			rating: 4.9
		},
		{
			id: 4,
			title: "Smart Farming with Technology",
			duration: "25 min",
			channel: "Digital Agriculture",
			thumbnail: "📱",
			youtubeId: "XcK52y7InwQ", // Actual smart farming technology video
			youtubeUrl: "https://www.youtube.com/watch?v=XcK52y7InwQ",
			description: "Explore how IoT sensors, drones, and mobile apps can revolutionize your farming practices.",
			topics: ["IoT Sensors", "Drone Technology", "Farm Apps"],
			views: "203K",
			rating: 4.6
		},
		{
			id: 5,
			title: "Post-Harvest Management",
			duration: "20 min",
			channel: "Agri Business",
			thumbnail: "📦",
			youtubeId: "JtQNXjJu8YQ", // Actual post-harvest management video
			youtubeUrl: "https://www.youtube.com/watch?v=JtQNXjJu8YQ",
			description: "Learn proper storage, processing, and marketing techniques to reduce losses and increase profits.",
			topics: ["Storage Techniques", "Value Addition", "Marketing"],
			views: "167K",
			rating: 4.8
		},
		{
			id: 6,
			title: "Sustainable Water Management",
			duration: "19 min",
			channel: "Green Agriculture",
			thumbnail: "💧",
			youtubeId: "3mGX9aUjLbQ", // Actual water management in agriculture video
			youtubeUrl: "https://www.youtube.com/watch?v=3mGX9aUjLbQ",
			description: "Master water-efficient farming techniques and rainwater harvesting for sustainable agriculture.",
			topics: ["Water Harvesting", "Efficient Irrigation", "Conservation"],
			views: "92K",
			rating: 4.7
		}
	];

	const handleLoanFormChange = (field, value) => {
		setLoanFormData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const calculateLoanRecommendation = () => {
		// Simple loan recommendation algorithm
		const age = parseInt(loanFormData.age);
		const farmingYears = parseInt(loanFormData.farmingYears);
		const loanAmount = parseInt(loanFormData.loanAmount.replace(/[^0-9]/g, ''));
		
		let score = 70; // Base score
		
		// Age factor
		if (age >= 25 && age <= 55) score += 10;
		else if (age > 55) score -= 5;
		
		// Experience factor
		if (farmingYears >= 5) score += 15;
		else if (farmingYears >= 2) score += 10;
		
		// Land ownership
		if (loanFormData.ownLand === 'Yes') score += 10;
		
		// Repayment history
		if (loanFormData.repaymentHistory === 'Always') score += 15;
		else if (loanFormData.repaymentHistory === 'Mostly') score += 10;
		
		// Default history
		if (loanFormData.loanDefault === 'No') score += 10;
		
		// Income stability
		if (loanFormData.incomeFluctuations === 'Minimal fluctuations') score += 10;
		
		let recommendation = {
			score: Math.min(score, 95),
			status: score >= 80 ? 'Highly Eligible' : score >= 60 ? 'Eligible' : 'Needs Improvement',
			schemes: [],
			interestRate: '',
			tips: []
		};
		
		if (score >= 80) {
			recommendation.schemes = ['Kisan Credit Card', 'NABARD Loans', 'SBI Agri Loans'];
			recommendation.interestRate = '7-9%';
			recommendation.tips = ['You qualify for the best rates!', 'Consider multiple loan options'];
		} else if (score >= 60) {
			recommendation.schemes = ['Cooperative Bank Loans', 'Regional Rural Bank Loans'];
			recommendation.interestRate = '9-12%';
			recommendation.tips = ['Improve credit score for better rates', 'Consider collateral options'];
		} else {
			recommendation.schemes = ['Self Help Group Loans', 'Microfinance Loans'];
			recommendation.interestRate = '12-15%';
			recommendation.tips = ['Build credit history', 'Consider guarantor options', 'Start with smaller amounts'];
		}
		
		setLoanRecommendation(recommendation);
	};

	const handleOnClick = () => {
		return navigate("/info");
	};

	const handleViewMore = () => {
		return navigate("/shop");
	};

	const handleGetStarted = () => {
		if (token) {
			return navigate("/plant-disease-detector");
		} else {
			return navigate("/auth/login");
		}
	};

	const handleSignIn = () => {
		return navigate("/auth/login");
	};

	const handleSignUp = () => {
		return navigate("/auth/register");
	};

	// Video Modal Functions
	const openVideoModal = (video) => {
		setSelectedVideo(video);
		setShowVideoModal(true);
	};

	const closeVideoModal = () => {
		setSelectedVideo(null);
		setShowVideoModal(false);
	};

	const getYouTubeThumbnail = (youtubeId) => {
		return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
	};

	const openYouTubeVideo = (video) => {
		// Open YouTube video in new tab
		window.open(video.youtubeUrl, '_blank');
	};

	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	}, []);

	return (
		<>
			{/* Hero Section with Modern Gradient Background */}
			<div className="w-full relative overflow-hidden">
				{/* Gradient Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900"></div>
				
				{/* Animated Background Shapes */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
					<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
				</div>

				{/* Main Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
					<div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
						{/* Left Section - Text Content */}
						<div className="flex-1 text-center lg:text-left" data-aos="fade-right">
							{/* Badge */}
							<div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-200 mb-6 border border-blue-200 dark:border-blue-800">
								<span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-3 animate-pulse"></span>
								<span className="font-semibold">Powered by IBM Granite AI</span>
							</div>

							{/* Main Heading - Action-Focused */}
							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight mb-6">
								Transform Your Farm with IBM Granite AI
							</h1>

							{/* Subheading - Impact-Oriented */}
							<div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed space-y-3">
								<div className="flex items-center justify-center lg:justify-start">
									<span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
									<span><strong>Increase yields by 35%</strong> with AI-powered crop recommendations</span>
								</div>
								<div className="flex items-center justify-center lg:justify-start">
									<span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
									<span><strong>Save ₹2+ lakhs annually</strong> through optimized resource management</span>
								</div>
								<div className="flex items-center justify-center lg:justify-start">
									<span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
									<span><strong>Access 15+ AI tools</strong> for complete farm intelligence</span>
								</div>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								{token ? (
									// Authenticated user buttons
									<>
										<button
											onClick={handleGetStarted}
											className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 overflow-hidden"
										>
											<span className="relative z-10 flex items-center justify-center">
												Start Analyzing
												<svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
												</svg>
											</span>
											<div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
										</button>
										
										<button
											onClick={handleViewMore}
											className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
										>
											Visit Shop
										</button>
									</>
								) : (
									// Non-authenticated user buttons
									<>
										<button
											onClick={handleSignIn}
											className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 overflow-hidden"
										>
											<span className="relative z-10 flex items-center justify-center">
												Sign In to Start
												<svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
												</svg>
											</span>
											<div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
										</button>
										
										<button
											onClick={handleSignUp}
											className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
										>
											Create Account
										</button>
									</>
								)}
							</div>

							{!token && (
								<div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
									<p className="text-sm text-blue-800 dark:text-blue-200 text-center">
										<span className="font-semibold">🔒 Sign in required:</span> Access advanced IBM Granite AI agricultural analysis tools and features
									</p>
								</div>
							)}

							{/* Action-Scope-Impact Stats Section */}
							<div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
								<div className="text-center">
									<div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">+35%</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Crop Yield Increase</div>
								</div>
								<div className="text-center">
									<div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">15+</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">AI Analysis Tools</div>
								</div>
								<div className="text-center">
									<div className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹2L+</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</div>
								</div>
							</div>
						</div>

						{/* Right Section - Enhanced Carousel */}
						<div className="flex-1 max-w-lg lg:max-w-none" data-aos="fade-left">
							<div className="relative">
								{/* Decorative Elements */}
								<div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-3xl transform rotate-6 opacity-20"></div>
								<div className="absolute -bottom-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl transform -rotate-6 opacity-20"></div>
								
								{/* Carousel Container */}
								<div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
									<Carousel />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Rest of the page content */}
			<div className="bg-white dark:bg-gray-900">
				<FeatureCard />
				<MapCardContainer />
				<OptimalCropSeasonCardContainer />
				
				{/* Financial Support Section */}
				<div id="financial-support" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-green-900 dark:to-blue-900">
					<div className="max-w-7xl mx-auto px-6">
						{/* Section Header */}
						<div className="text-center mb-16" data-aos="fade-up">
							<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
								Financial Support for Farmers
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
								Access government schemes, smart loan recommendations, and educational resources to grow your farming business
							</p>
						</div>

						{/* Tab Navigation */}
						<div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
							<div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
								<div className="flex space-x-2">
									<button
										onClick={() => setActiveFinancialTab('schemes')}
										className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
											activeFinancialTab === 'schemes'
												? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
												: 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
										}`}
									>
										Government Schemes
									</button>
									<button
										onClick={() => setActiveFinancialTab('loans')}
										className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
											activeFinancialTab === 'loans'
												? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
												: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
										}`}
									>
										Smart Loan Finder
									</button>
									<button
										onClick={() => setActiveFinancialTab('education')}
										className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
											activeFinancialTab === 'education'
												? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
												: 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
										}`}
									>
										Farmer Education
									</button>
								</div>
							</div>
						</div>

						{/* Dynamic Content Based on Active Tab */}
						{activeFinancialTab === 'schemes' && (
							<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8" data-aos="fade-up">
								<div className="flex items-center mb-8">
									<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Government Schemes</h3>
										<p className="text-gray-600 dark:text-gray-300">Find government schemes tailored to your farming needs</p>
									</div>
									<button
										onClick={() => fetchAIGovernmentSchemes()}
										disabled={loadingAI.schemes}
										className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
									>
										{loadingAI.schemes ? (
											<>
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
												Analyzing...
											</>
										) : (
											<>
												<svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												Get AI Recommendations
											</>
										)}
									</button>
								</div>

								{errorAI.schemes && (
									<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
										<p className="text-red-800 dark:text-red-200">
											<span className="font-semibold">Error:</span> {errorAI.schemes}
										</p>
									</div>
								)}

								{aiGovernmentSchemes ? (
									<div className="space-y-6">
										{/* AI-Generated Schemes */}
										<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
											<div className="flex items-center mb-4">
												<svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												<h4 className="text-xl font-bold text-blue-800 dark:text-blue-200">IBM Granite AI Recommendations</h4>
											</div>
											<p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
												Personalized government schemes based on your farming profile analysis
											</p>
										</div>

										{aiGovernmentSchemes.prioritySchemes && aiGovernmentSchemes.prioritySchemes.length > 0 && (
											<div>
												<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Priority Schemes for You</h4>
												<div className="grid md:grid-cols-2 gap-6">
													{aiGovernmentSchemes.prioritySchemes.map((scheme, index) => (
														<div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
															<div className="flex items-start justify-between mb-4">
																<div className="flex-1">
																	<h5 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{scheme.name}</h5>
																	<span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
																		{scheme.eligibility} Match
																	</span>
																</div>
															</div>
															<p className="text-gray-600 dark:text-gray-300 mb-4">{scheme.description}</p>
															<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
																<p className="text-sm text-green-800 dark:text-green-200">
																	<span className="font-semibold">Expected Benefits:</span> {scheme.benefits}
																</p>
															</div>
														</div>
													))}
												</div>
											</div>
										)}

										{aiGovernmentSchemes.totalBenefits && (
											<div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
												<h4 className="text-xl font-bold mb-2">Total Potential Benefits</h4>
												<p className="text-2xl font-bold">{aiGovernmentSchemes.totalBenefits} annually</p>
												<p className="text-green-100 text-sm mt-2">Based on your eligibility profile</p>
											</div>
										)}
									</div>
								) : (
									<div className="grid md:grid-cols-2 gap-6">
										{governmentSchemes.map((scheme) => (
											<div key={scheme.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
												<div className="flex items-start justify-between mb-4">
													<div className="flex-1">
														<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{scheme.name}</h4>
														<span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
															{scheme.category}
														</span>
													</div>
												</div>
												<p className="text-gray-600 dark:text-gray-300 mb-4">{scheme.description}</p>
												<div className="space-y-3">
													<div>
														<span className="font-semibold text-gray-800 dark:text-white">Benefits: </span>
														<span className="text-gray-600 dark:text-gray-300">{scheme.benefits}</span>
													</div>
													<div>
														<span className="font-semibold text-gray-800 dark:text-white">Eligibility: </span>
														<span className="text-gray-600 dark:text-gray-300">{scheme.eligibility}</span>
													</div>
													<div>
														<span className="font-semibold text-gray-800 dark:text-white">How to Apply: </span>
														<span className="text-gray-600 dark:text-gray-300">{scheme.howToApply}</span>
													</div>
													<div>
														<span className="font-semibold text-gray-800 dark:text-white">Documents: </span>
														<span className="text-gray-600 dark:text-gray-300">{scheme.documents}</span>
													</div>
												</div>
												<button className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
													Apply Now
												</button>
											</div>
										))}
									</div>
								)}
							</div>
						)}

						{activeFinancialTab === 'loans' && (
							<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8" data-aos="fade-up">
								<div className="flex items-center mb-8">
									<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
										</svg>
									</div>
									<div>
										<h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Farmer Loan Lending Recommendation System</h3>
										<p className="text-gray-600 dark:text-gray-300">Find the perfect loan scheme for your agricultural needs</p>
									</div>
								</div>

								{!loanRecommendation ? (
									<div className="grid md:grid-cols-2 gap-8">
										{/* Loan Form */}
										<div>
											<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Share Your Details</h4>
											<div className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
														<input
															type="number"
															placeholder="Enter your age"
															value={loanFormData.age}
															onChange={(e) => handleLoanFormChange('age', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate Range</label>
														<select
															value={loanFormData.interestRate}
															onChange={(e) => handleLoanFormChange('interestRate', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														>
															<option>Less than 8.5%</option>
															<option>8.5% - 10%</option>
															<option>10% - 12%</option>
															<option>Above 12%</option>
														</select>
													</div>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Amount Required (INR)</label>
													<input
														type="text"
														placeholder="₹5,00,000"
														value={loanFormData.loanAmount}
														onChange={(e) => handleLoanFormChange('loanAmount', e.target.value)}
														className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													/>
												</div>

												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years in Farming</label>
														<input
															type="number"
															placeholder="10"
															value={loanFormData.farmingYears}
															onChange={(e) => handleLoanFormChange('farmingYears', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual Farming Income (INR)</label>
														<input
															type="text"
															placeholder="₹3,00,000"
															value={loanFormData.annualIncome}
															onChange={(e) => handleLoanFormChange('annualIncome', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														/>
													</div>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ever not paid on a Loan?</label>
													<select
														value={loanFormData.loanDefault}
														onChange={(e) => handleLoanFormChange('loanDefault', e.target.value)}
														className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
													>
														<option>No</option>
														<option>Yes</option>
													</select>
												</div>

												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Percentage of Income goes in Debt</label>
														<input
															type="text"
															placeholder="20%"
															value={loanFormData.debtPercentage}
															onChange={(e) => handleLoanFormChange('debtPercentage', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Self-Own a Land or Farm?</label>
														<select
															value={loanFormData.ownLand}
															onChange={(e) => handleLoanFormChange('ownLand', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														>
															<option>Yes</option>
															<option>No</option>
														</select>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total assets (Gold, Jewellery etc) (INR)</label>
														<input
															type="text"
															placeholder="₹2,00,000"
															value={loanFormData.totalAssets}
															onChange={(e) => handleLoanFormChange('totalAssets', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Years involved in transactions</label>
														<input
															type="number"
															placeholder="15"
															value={loanFormData.transactionYears}
															onChange={(e) => handleLoanFormChange('transactionYears', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														/>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-4">
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timely Repayment History</label>
														<select
															value={loanFormData.repaymentHistory}
															onChange={(e) => handleLoanFormChange('repaymentHistory', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														>
															<option>Always</option>
															<option>Mostly</option>
															<option>Sometimes</option>
															<option>Rarely</option>
														</select>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seasonal Income Fluctuations</label>
														<select
															value={loanFormData.incomeFluctuations}
															onChange={(e) => handleLoanFormChange('incomeFluctuations', e.target.value)}
															className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
														>
															<option>Minimal fluctuations</option>
															<option>Moderate fluctuations</option>
															<option>High fluctuations</option>
														</select>
													</div>
												</div>
											</div>

											<button
												onClick={() => fetchAILoanRecommendation(loanFormData)}
												disabled={loadingAI.loans}
												className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
											>
												{loadingAI.loans ? (
													<>
														<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
														Analyzing with IBM Granite AI...
													</>
												) : (
													<>
														<svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
														</svg>
														Get AI Loan Recommendations
													</>
												)}
											</button>
										</div>

										{/* Info Panel */}
										{errorAI.loans && (
											<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
												<p className="text-red-800 dark:text-red-200">
													<span className="font-semibold">Error:</span> {errorAI.loans}
												</p>
											</div>
										)}

										<div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
											<h4 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4">How It Works</h4>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
														<span className="text-white font-bold text-sm">1</span>
													</div>
													<div>
														<h5 className="font-semibold text-blue-800 dark:text-blue-200">Share Your Details</h5>
														<p className="text-blue-600 dark:text-blue-300 text-sm">Provide your farming and financial information</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
														<span className="text-white font-bold text-sm">2</span>
													</div>
													<div>
														<h5 className="font-semibold text-blue-800 dark:text-blue-200">AI Analysis</h5>
														<p className="text-blue-600 dark:text-blue-300 text-sm">Our IBM Granite AI analyzes 12+ factors</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
														<span className="text-white font-bold text-sm">3</span>
													</div>
													<div>
														<h5 className="font-semibold text-blue-800 dark:text-blue-200">Get Recommendations</h5>
														<p className="text-blue-600 dark:text-blue-300 text-sm">Receive personalized loan options</p>
													</div>
												</div>
											</div>

											<div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
												<div className="flex items-center mb-2">
													<svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													<span className="font-semibold text-blue-800 dark:text-blue-200">Pro Tip</span>
												</div>
												<p className="text-blue-700 dark:text-blue-300 text-sm">
													Higher farming experience and good repayment history significantly improve your loan eligibility and interest rates.
												</p>
											</div>
										</div>
									</div>
								) : (
									<div className="space-y-6">
										{/* Display AI-generated loan recommendations if available */}
										{aiLoanRecommendation && aiLoanRecommendation.aiAnalysis && (
											<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
												<div className="flex items-center mb-4">
													<svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
													</svg>
													<h4 className="text-xl font-bold text-blue-800 dark:text-blue-200">IBM Granite AI Analysis</h4>
												</div>
												<p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
													Advanced AI analysis based on {aiLoanRecommendation.factorsConsidered || '12+'} factors including farming experience, financial history, and risk assessment
												</p>
												{aiLoanRecommendation.aiAnalysis && (
													<div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
														<p className="text-blue-800 dark:text-blue-200 text-sm">
															<span className="font-semibold">AI Insight:</span> {aiLoanRecommendation.aiAnalysis}
														</p>
													</div>
												)}
											</div>
										)}

										{/* Loan Recommendation Results */}
										<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
											<div className="flex items-center justify-between mb-4">
												<h4 className="text-2xl font-bold">Your Loan Eligibility Score</h4>
												<div className="text-right">
													<div className="text-4xl font-bold">{loanRecommendation?.score || 0}/100</div>
													<div className="text-blue-200">{loanRecommendation?.status || 'Calculating...'}</div>
												</div>
											</div>
											<div className="w-full bg-blue-800 rounded-full h-3">
												<div 
													className="bg-gradient-to-r from-green-400 to-blue-300 h-3 rounded-full transition-all duration-1000"
													style={{ width: `${loanRecommendation?.score || 0}%` }}
												></div>
											</div>
										</div>

										{/* AI-Enhanced Loan Options */}
										{aiLoanRecommendation && aiLoanRecommendation.recommendedLoans && aiLoanRecommendation.recommendedLoans.length > 0 && (
											<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
												<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">AI-Recommended Loan Options</h4>
												<div className="space-y-4">
													{aiLoanRecommendation.recommendedLoans.map((loan, index) => (
														<div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
															<div className="flex items-center justify-between mb-2">
																<h5 className="text-lg font-semibold text-gray-800 dark:text-white">{loan.name}</h5>
																<span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
																	{loan.eligibility || 'Eligible'}
																</span>
															</div>
															<p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{loan.description}</p>
															<div className="grid grid-cols-2 gap-4 mb-3">
																<div>
																	<span className="text-xs text-gray-500 dark:text-gray-400">Interest Rate</span>
																	<p className="font-semibold text-green-600 dark:text-green-400">{loan.interestRate}</p>
																</div>
																<div>
																	<span className="text-xs text-gray-500 dark:text-gray-400">Max Amount</span>
																	<p className="font-semibold text-blue-600 dark:text-blue-400">{loan.maxAmount}</p>
																</div>
															</div>
															{loan.benefits && (
																<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
																	<p className="text-sm text-green-800 dark:text-green-200">
																		<span className="font-semibold">Key Benefits:</span> {loan.benefits}
																	</p>
																</div>
															)}
														</div>
													))}
												</div>
											</div>
										)}

										{/* Recommended Schemes */}
										<div className="grid md:grid-cols-2 gap-6">
											<div>
												<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recommended Loan Schemes</h4>
												<div className="space-y-3">
													{loanRecommendation?.schemes?.map((scheme, index) => (
														<div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
															<div className="flex items-center justify-between">
																<span className="font-semibold text-gray-800 dark:text-white">{scheme}</span>
																<span className="text-sm text-green-600 dark:text-green-400">Eligible</span>
															</div>
														</div>
													)) || []}
												</div>
												{loanRecommendation?.interestRate && (
													<div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
														<div className="flex items-center mb-2">
															<span className="font-semibold text-green-800 dark:text-green-200">Expected Interest Rate: </span>
															<span className="ml-2 text-green-600 dark:text-green-400 font-bold">{loanRecommendation.interestRate}</span>
														</div>
													</div>
												)}
											</div>

											<div>
												<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
													{aiLoanRecommendation?.improvementTips ? 'AI-Powered Tips to Improve' : 'Tips to Improve'}
												</h4>
												<div className="space-y-3">
													{(aiLoanRecommendation?.improvementTips || loanRecommendation?.tips || []).map((tip, index) => (
														<div key={index} className="flex items-start">
															<div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
															<span className="text-gray-600 dark:text-gray-300">{tip}</span>
														</div>
													))}
												</div>
											</div>
										</div>

										<div className="flex justify-center space-x-4">
											<button
												onClick={() => {
													setLoanRecommendation(null);
													setAiLoanRecommendation(null);
													setLoanFormData({
														age: '',
														interestRate: 'Less than 8.5%',
														loanAmount: '',
														farmingYears: '',
														annualIncome: '',
														loanDefault: 'No',
														debtPercentage: '',
														ownLand: 'Yes',
														totalAssets: '',
														transactionYears: '',
														repaymentHistory: 'Always',
														incomeFluctuations: 'Minimal fluctuations'
													});
												}}
												className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
											>
												Calculate Again
											</button>
											{aiLoanRecommendation && (
												<button
													onClick={() => fetchAILoanRecommendation(loanFormData)}
													disabled={loadingAI.loans}
													className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
												>
													{loadingAI.loans ? 'Refreshing...' : 'Refresh AI Analysis'}
												</button>
											)}
										</div>
									</div>
								)}
							</div>
						)}

						{activeFinancialTab === 'education' && (
							<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8" data-aos="fade-up">
								<div className="flex items-center mb-8">
									<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-6">
										<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Farmer Education</h3>
										<p className="text-gray-600 dark:text-gray-300">Get personalized learning content powered by IBM Granite AI</p>
									</div>
									<button
										onClick={() => fetchAIEducationContent()}
										disabled={loadingAI.education}
										className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
									>
										{loadingAI.education ? (
											<>
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
												Generating...
											</>
										) : (
											<>
												<svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												Get AI Learning Plan
											</>
										)}
									</button>
								</div>

								{errorAI.education && (
									<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
										<p className="text-red-800 dark:text-red-200">
											<span className="font-semibold">Error:</span> {errorAI.education}
										</p>
									</div>
								)}

								{aiEducationContent ? (
									<div className="space-y-6">
										{/* AI-Generated Learning Path */}
										<div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
											<div className="flex items-center mb-4">
												<svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												<h4 className="text-xl font-bold text-purple-800 dark:text-purple-200">Personalized Learning Path by IBM Granite AI</h4>
											</div>
											<p className="text-purple-700 dark:text-purple-300 text-sm mb-4">
												Customized educational content based on your farming experience, crops, and learning goals
											</p>
											{aiEducationContent.learningPath && (
												<div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4">
													<p className="text-purple-800 dark:text-purple-200 text-sm">
														<span className="font-semibold">AI Recommendation:</span> {aiEducationContent.learningPath}
													</p>
												</div>
											)}
										</div>

										{/* AI-Generated Educational Topics */}
										{aiEducationContent.topics && aiEducationContent.topics.length > 0 && (
											<div>
												<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recommended Learning Topics</h4>
												<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
													{aiEducationContent.topics.map((topic, index) => (
														<div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
															{/* Topic Icon */}
															<div className="bg-gradient-to-br from-purple-500 to-pink-600 h-32 flex items-center justify-center relative">
																<div className="text-4xl">{topic.icon || '📚'}</div>
																<div className="absolute top-3 right-3">
																	<span className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full">
																		{topic.difficulty || 'Intermediate'}
																	</span>
																</div>
															</div>
															
															{/* Topic Info */}
															<div className="p-4">
																<h5 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{topic.title}</h5>
																<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
																	{topic.duration || '15-20 min'} • {topic.type || 'Interactive Guide'}
																</p>
																<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{topic.description}</p>
																
																{/* Key Points */}
																{topic.keyPoints && topic.keyPoints.length > 0 && (
																	<div className="mb-4">
																		<p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Learning Points:</p>
																		<div className="space-y-1">
																			{topic.keyPoints.slice(0, 3).map((point, pointIndex) => (
																				<div key={pointIndex} className="flex items-start">
																					<div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-2"></div>
																					<span className="text-xs text-gray-600 dark:text-gray-400">{point}</span>
																				</div>
																			))}
																		</div>
																	</div>
																)}
																
																<button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
																	Start Learning
																</button>
															</div>
														</div>
													))}
												</div>
											</div>
										)}

										{/* AI-Generated Best Practices */}
										{aiEducationContent.bestPractices && aiEducationContent.bestPractices.length > 0 && (
											<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
												<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">AI-Recommended Best Practices</h4>
												<div className="grid md:grid-cols-2 gap-4">
													{aiEducationContent.bestPractices.map((practice, index) => (
														<div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
															<h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">{practice.title}</h5>
															<p className="text-sm text-green-700 dark:text-green-300">{practice.description}</p>
															{practice.benefit && (
																<div className="mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
																	<span className="text-xs text-green-800 dark:text-green-200 font-medium">
																		💡 {practice.benefit}
																	</span>
																</div>
															)}
														</div>
													))}
												</div>
											</div>
										)}

										{/* Weekly Learning Schedule */}
										{aiEducationContent.weeklySchedule && (
											<div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
												<h4 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">AI-Generated Weekly Learning Schedule</h4>
												<p className="text-indigo-700 dark:text-indigo-300 text-sm mb-4">{aiEducationContent.weeklySchedule}</p>
												<div className="flex items-center space-x-4">
													<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
														Start This Week
													</button>
													<button className="px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
														Customize Schedule
													</button>
												</div>
											</div>
										)}
									</div>
								) : (
									<div className="space-y-6">
										{/* Default Educational Videos with YouTube Integration */}
										<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
											{educationalVideos.map((video) => (
												<div key={video.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
													{/* YouTube Video Thumbnail */}
													<div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => openYouTubeVideo(video)}>
														<img 
															src={getYouTubeThumbnail(video.youtubeId)}
															alt={video.title}
															className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
															onError={(e) => {
																// Fallback to emoji thumbnail if YouTube thumbnail fails
																e.target.style.display = 'none';
																e.target.nextElementSibling.style.display = 'flex';
															}}
														/>
														{/* Fallback emoji thumbnail */}
														<div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 hidden items-center justify-center">
															<div className="text-6xl">{video.thumbnail}</div>
														</div>
														
														{/* Play overlay */}
														<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
															<div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
																<svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
																	<path d="M8 5v14l11-7z"/>
																</svg>
															</div>
														</div>
														
														{/* Video duration */}
														<div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
															{video.duration}
														</div>
														
														{/* Views and rating */}
														<div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
															{video.views} views
														</div>
														<div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center">
															<span className="text-yellow-400 mr-1">★</span>
															{video.rating}
														</div>
													</div>
													
													{/* Video Info */}
													<div className="p-4">
														<h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{video.title}</h4>
														<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center">
															<span className="bg-red-600 text-white px-2 py-1 rounded text-xs mr-2">YouTube</span>
															{video.channel}
														</p>
														<p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{video.description}</p>
														
														{/* Topics */}
														<div className="flex flex-wrap gap-2 mb-4">
															{video.topics.map((topic, index) => (
																<span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
																	{topic}
																</span>
															))}
														</div>
														
														{/* Action buttons */}
														<div className="flex space-x-2">
															<button 
																onClick={() => openYouTubeVideo(video)}
																className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
															>
																<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
																	<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
																</svg>
																Watch on YouTube
															</button>
															<button 
																onClick={() => openVideoModal(video)}
																className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
																title="More Info"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
																</svg>
															</button>
														</div>
													</div>
												</div>
											))}
										</div>

										{/* Get AI Learning Plan CTA */}
										<div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8">
											<h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Want Personalized Learning Content?</h4>
											<p className="text-purple-600 dark:text-purple-300 mb-6">
												Get AI-generated learning topics, best practices, and weekly schedules tailored to your farming needs
											</p>
											<button
												onClick={() => fetchAIEducationContent()}
												disabled={loadingAI.education}
												className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
											>
												{loadingAI.education ? 'Generating...' : 'Get AI Learning Plan'}
											</button>
										</div>
									</div>
								)}

								{/* Additional Resources */}
								<div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
									<h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Additional Learning Resources</h4>
									<div className="grid md:grid-cols-3 gap-4">
										<div className="text-center">
											<div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
												<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
												</svg>
											</div>
											<h5 className="font-semibold text-purple-800 dark:text-purple-200">AI-Generated Guides</h5>
											<p className="text-sm text-purple-600 dark:text-purple-300">Download personalized PDF farming guides</p>
										</div>
										<div className="text-center">
											<div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
												<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
												</svg>
											</div>
											<h5 className="font-semibold text-purple-800 dark:text-purple-200">Expert Webinars</h5>
											<p className="text-sm text-purple-600 dark:text-purple-300">Join live sessions with agriculture experts</p>
										</div>
										<div className="text-center">
											<div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
												<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
												</svg>
											</div>
											<h5 className="font-semibold text-purple-800 dark:text-purple-200">AI Chat Support</h5>
											<p className="text-sm text-purple-600 dark:text-purple-300">Get instant answers with our AI assistant</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Bottom CTA Section */}
						<div className="mt-16 text-center" data-aos="fade-up">
							<div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
								<h3 className="text-2xl md:text-3xl font-bold mb-4">
									Need Personalized Financial Guidance?
								</h3>
								<p className="text-lg mb-6 opacity-90">
									Our IBM Granite AI can analyze your farm profile and recommend the best financial solutions
								</p>
								<button 
									onClick={token ? handleGetStarted : handleSignIn}
									className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
								>
									Get AI Financial Analysis
								</button>
							</div>
						</div>
					</div>
				</div>

				<Features/>
				<GeospatialAnalysis/>
				<Testimonial />
				<FAQ />
			</div>

			{/* Video Modal */}
			{showVideoModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
					<div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
						{/* Close Button */}
						<button
							onClick={closeVideoModal}
							className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						{/* Video Content */}
						<div className="relative pt-[56.25%]">
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								src={`https://www.youtube.com/embed/${selectedVideo?.youtubeId}?autoplay=1&rel=0&showinfo=0`}
								title={selectedVideo?.title}
								frameBorder="0"
								allow="autoplay; encrypted-media"
								allowFullScreen
							></iframe>
						</div>

						{/* Video Info */}
						<div className="p-4">
							<h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{selectedVideo?.title}</h4>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{selectedVideo?.description}</p>
							
							{/* Video Topics */}
							{selectedVideo?.topics && selectedVideo.topics.length > 0 && (
								<div className="mb-4">
									<p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Topics Covered:</p>
									<div className="flex flex-wrap gap-2">
										{selectedVideo.topics.map((topic, index) => (
											<span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
												{topic}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Video Actions */}
							<div className="flex flex-col sm:flex-row gap-4">
								<button
									onClick={() => openYouTubeVideo(selectedVideo)}
									className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
								>
									<svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2 2 4-4m0 0l-4-4-2 2 4 4z" />
									</svg>
									Watch on YouTube
								</button>
								<button
									onClick={closeVideoModal}
									className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Video Information Modal */}
			{showVideoModal && selectedVideo && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						{/* Modal Header */}
						<div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
							<h3 className="text-2xl font-bold text-gray-800 dark:text-white">Video Details</h3>
							<button
								onClick={closeVideoModal}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						{/* Modal Content */}
						<div className="p-6">
							<div className="grid md:grid-cols-2 gap-6">
								{/* Video Preview */}
								<div>
									<div className="relative rounded-lg overflow-hidden mb-4">
										<img 
											src={getYouTubeThumbnail(selectedVideo.youtubeId)}
											alt={selectedVideo.title}
											className="w-full h-48 object-cover"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
											<button
												onClick={() => openYouTubeVideo(selectedVideo)}
												className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
											>
												<svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
													<path d="M8 5v14l11-7z"/>
												</svg>
											</button>
										</div>
									</div>
									
									{/* Video Stats */}
									<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
										<span>{selectedVideo.views} views</span>
										<span className="flex items-center">
											<span className="text-yellow-400 mr-1">★</span>
											{selectedVideo.rating}/5
										</span>
									</div>

									{/* Action Buttons */}
									<div className="space-y-3">
										<button
											onClick={() => openYouTubeVideo(selectedVideo)}
											className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
										>
											<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
												<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
											</svg>
											Watch on YouTube
										</button>
										<button
											onClick={() => navigator.clipboard.writeText(selectedVideo.youtubeUrl)}
											className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
										>
											<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
											</svg>
											Copy Link
										</button>
									</div>
								</div>

								{/* Video Information */}
								<div>
									<h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{selectedVideo.title}</h4>
									<div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
										<span className="bg-red-600 text-white px-2 py-1 rounded text-xs mr-3">YouTube</span>
										<span>{selectedVideo.channel}</span>
										<span className="mx-2">•</span>
										<span>{selectedVideo.duration}</span>
									</div>
									
									<p className="text-gray-600 dark:text-gray-300 mb-6">{selectedVideo.description}</p>
									
									{/* Learning Topics */}
									<div className="mb-6">
										<h5 className="font-semibold text-gray-800 dark:text-white mb-3">What You'll Learn:</h5>
										<div className="flex flex-wrap gap-2">
											{selectedVideo.topics.map((topic, index) => (
												<span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
													{topic}
												</span>
											))}
										</div>
									</div>

									{/* Additional Info */}
									<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
										<h5 className="font-semibold text-gray-800 dark:text-white mb-2">About this Video</h5>
										<ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
											<li>• Expert-curated content for modern farmers</li>
											<li>• Practical techniques you can implement today</li>
											<li>• Based on latest agricultural research</li>
											<li>• Available with subtitles in multiple languages</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HomePage;
