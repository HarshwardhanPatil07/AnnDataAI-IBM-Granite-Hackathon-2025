import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
	FaChartLine,
	FaRobot,
	FaHeartbeat,
	FaRegLightbulb,
	FaWater,
	FaCloudSun,
} from "react-icons/fa";
import { MdComputer, MdSensors } from "react-icons/md";

// import { BsGraphUp } from "react-icons/bs";
// import { GiWaterDrop, GiGeothermal } from "react-icons/gi";
// import { FaRegChartBar } from "react-icons/fa";

const features = [
	{
	  icon: <MdSensors className="text-emerald-600" />,
	  title: "feature1title",
	  description:
		"feature1description",
	},
	{
	  icon: <FaRobot className="text-emerald-600" />,
	  title: "feature2title",
	  description:
		"feature2description",
	},
	{
	  icon: <FaWater className="text-emerald-600" />,
	  title: "feature3title",
	  description:
		"feature3description",
	},
	{
	  icon: <FaCloudSun className="text-emerald-600" />,
	  title: "feature4title",
	  description:
		"feature4description",
	},
  ];
  

  const FeatureCard = () => {
	const {t} = useTranslation();
	useEffect(() => {
	  Aos.init({
		duration: 1000,
	  });
	}, []);
  	return (
	  <section className="services-section py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		  <div className="mb-16" data-aos="fade-up">
			<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
			  {t("featureheading")}
			</h2>
			<p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
			  {t("featuredescription")}
			</p>
		  </div>

		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{features.map((feature, index) => (
			  <div
				key={index}
				data-aos="fade-up"
				data-aos-delay={index * 100}
				className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 border border-gray-100 dark:border-gray-700 overflow-hidden"
			  >
				{/* Background gradient on hover */}
				<div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				
				{/* Content */}
				<div className="relative z-10">
				  <div className="icon-container mb-6 flex justify-center items-center">
					<div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
					  <div className="text-emerald-600 dark:text-emerald-400 text-3xl">
						{feature.icon}
					  </div>
					</div>
				  </div>
				  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
					{t(feature.title)}
				  </h3>
				  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
					{t(feature.description)}
				  </p>
				</div>

				{/* Decorative corner accent */}
				<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 opacity-10 rounded-bl-3xl"></div>
			  </div>
			))}
		  </div>
		</div>
	  </section>
	);
  };
  
  export default FeatureCard;
  