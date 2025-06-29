import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../../data/faq.js";
import { useTranslation } from "react-i18next";

const FAQ = () => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState(null);

	const toggle = (i) => {
		setSelected(selected === i ? null : i);
	};

	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	}, []);

	return (
		<div className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16" data-aos="fade-up">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-6">
						{t("faqheading")}
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Find answers to the most common questions about our AI-powered agriculture platform.
					</p>
				</div>
				
				<div className="space-y-6">
					{data.map((item, i) => (
						<div 
							key={i} 
							className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300"
							data-aos="fade-up"
							data-aos-delay={i * 50}
						>
							<div
								className="cursor-pointer px-8 py-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
								onClick={() => toggle(i)}
								role="button"
								aria-expanded={selected === i}
								aria-controls={`content-${i}`}
							>
								<h2 className="text-lg font-semibold text-gray-900 dark:text-white pr-4 flex-1">
									{t(item.question)}
								</h2>
								<div className={`w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold transition-transform duration-300 ${
									selected === i ? 'rotate-45' : ''
								}`}>
									<span className="text-lg">
										{selected === i ? "×" : "+"}
									</span>
								</div>
							</div>
							<div
								id={`content-${i}`}
								className={`transition-all duration-500 ease-in-out overflow-hidden ${
									selected === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
								}`}
							>
								<div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
										{t(item.answer)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Call to action */}
				<div className="text-center mt-16" data-aos="fade-up">
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						Still have questions? We're here to help!
					</p>
					<button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
						Contact Support
						<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default FAQ;
