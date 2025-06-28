import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img from "../../assets/image/Header.gif";
import { FaRegChartBar, FaMapMarkerAlt, FaWater } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function MapCardContainer() {
	const { t } = useTranslation();
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	}, []);

	return (
		<div className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
					<div className="flex flex-col lg:flex-row items-center">
						{/* Image Section */}
						<div className="w-full lg:w-2/5 relative p-8 lg:p-12">
							<div className="relative">
								{/* Decorative background */}
								<div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-2xl transform rotate-3"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-2xl transform -rotate-3"></div>
								
								{/* Main image */}
								<div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
									<img
										src={img}
										alt="AnnDataAI Analytics System"
										className="w-full max-w-sm mx-auto rounded-xl"
										data-aos="fade-right"
									/>
								</div>
								
								{/* Floating badges */}
								<div className="absolute -top-4 -right-4 z-20 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float">
									AI Powered
								</div>
								<div className="absolute -bottom-4 -left-4 z-20 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float animation-delay-2000">
									Real-time
								</div>
							</div>
						</div>

						{/* Content Section */}
						<div className="w-full lg:w-3/5 p-8 lg:p-12">
							<div className="max-w-2xl">
								<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent" data-aos="fade-left">
									{t("mapCardheading")}
									<FaWater className="inline-block ml-3 text-emerald-600 animate-pulse" />
								</h1>

								<div className="space-y-6">
									<div 
										className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
										data-aos="fade-left"
										data-aos-delay="100"
									>
										<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<FaRegChartBar className="text-white text-xl" />
										</div>
										<div className="flex-1">
											<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
												{t("mapCarddescription1")}
											</p>
										</div>
									</div>

									<div 
										className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
										data-aos="fade-left"
										data-aos-delay="200"
									>
										<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<FaMapMarkerAlt className="text-white text-xl" />
										</div>
										<div className="flex-1">
											<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
												{t("mapCarddescription2")}
											</p>
										</div>
									</div>

									<div 
										className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
										data-aos="fade-left"
										data-aos-delay="300"
									>
										<div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<FaWater className="text-white text-xl" />
										</div>
										<div className="flex-1">
											<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
												{t("mapCarddescription3")}
											</p>
										</div>
									</div>
								</div>

								{/* CTA Button */}
								<div className="mt-8" data-aos="fade-left" data-aos-delay="400">
									<button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-gradient-hover">
										Explore Analytics
										<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MapCardContainer;
