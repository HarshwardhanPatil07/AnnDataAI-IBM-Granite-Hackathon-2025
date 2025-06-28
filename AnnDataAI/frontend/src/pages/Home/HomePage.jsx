import { useEffect } from "react";
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
import useTokenStore from "../../store/useTokenStore";

const HomePage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { token } = useTokenStore((state) => state);

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
							<div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 mb-6">
								<span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
								AI-Powered Agriculture Platform
							</div>

							{/* Main Heading */}
							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight mb-6">
								{t("homepage.title")}
							</h1>

							{/* Subheading */}
							<p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
								{t("homepage.description")}
							</p>

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
								<div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
									<p className="text-sm text-amber-800 dark:text-amber-200 text-center">
										<span className="font-semibold">🔒 Sign in required:</span> Access advanced agricultural analysis tools and features
									</p>
								</div>
							)}

							{/* Stats Section */}
							<div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
								<div className="text-center">
									<div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">50K+</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
								</div>
								<div className="text-center">
									<div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">98%</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
								</div>
								<div className="text-center">
									<div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
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
				<Features/>
				<GeospatialAnalysis/>
				<Testimonial />
				<FAQ />
			</div>
		</>
	);
};

export default HomePage;
