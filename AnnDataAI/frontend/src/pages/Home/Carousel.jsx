import { useState, useEffect } from "react";
import img1 from "../../assets/image/hero-img-1.jpeg";
import img2 from "../../assets/image/hero-img-2.jpg";
import img3 from "../../assets/image/hero-img-3.jpeg";
import img4 from "../../assets/image/hero-img-4.jpeg";
import img5 from "../../assets/image/hero-img-5.jpeg";

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = [img1, img2,img3,img4,img5];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
		}, 4000);
		console.log(`I run.`);
		

		return () => {
			console.log(`I clean up.`);
			clearInterval(interval)
		};
	}, []);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + slides.length) % slides.length
		);
	};

	return (
		<div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
			{/* Main carousel container */}
			<div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`absolute w-full h-full transition-all duration-1000 ease-out transform ${
							index === currentIndex 
								? "opacity-100 scale-100 translate-x-0" 
								: index < currentIndex 
									? "opacity-0 scale-95 -translate-x-full" 
									: "opacity-0 scale-95 translate-x-full"
						}`}
					>
						<img
							src={slide}
							className="w-full h-full object-cover"
							alt={`AnnDataAI Slide ${index + 1}`}
						/>
						{/* Gradient overlay for better text readability */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
					</div>
				))}

				{/* Navigation arrows */}
				<button
					type="button"
					className="absolute top-1/2 left-4 z-30 flex items-center justify-center w-12 h-12 -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 group"
					onClick={handlePrev}
				>
					<svg
						className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<button
					type="button"
					className="absolute top-1/2 right-4 z-30 flex items-center justify-center w-12 h-12 -translate-y-1/2 bg-white/20 hover:bg-white/30 dark:bg-gray-800/20 dark:hover:bg-gray-800/30 rounded-full backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 group"
					onClick={handleNext}
				>
					<svg
						className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			{/* Enhanced dots indicator */}
			<div className="absolute z-30 bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{slides.map((_, index) => (
					<button
						key={index}
						type="button"
						className={`transition-all duration-300 focus:outline-none ${
							index === currentIndex 
								? "w-8 h-3 bg-white rounded-full shadow-lg" 
								: "w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full"
						}`}
						aria-current={index === currentIndex ? "true" : "false"}
						aria-label={`Slide ${index + 1}`}
						onClick={() => setCurrentIndex(index)}
					></button>
				))}
			</div>

			{/* Progress bar */}
			<div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
				<div 
					className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-4000 ease-linear"
					style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
				></div>
			</div>
		</div>
	);
};

export default Carousel;
