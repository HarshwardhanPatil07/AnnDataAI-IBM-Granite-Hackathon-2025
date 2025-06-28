import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SideBar from "./Sidebar";
import CropPricePrediction from "./SideNavs/CropPricePrediction";
import CropMarketPriceAnalysis from "./SideNavs/CropMarketPriceAnalysis";
import AgriMarketPlanner from "./SideNavs/AgriMarketPlanner";


const CropMarketTrendAnalyzerPage = () => {
	// State to track the currently selected component
	const [activeComponent, setActiveComponent] = useState("CropPricePrediction");
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [activeItem, setActiveItem] = useState("CropPricePrediction"); // State to track active item

	// Function to render the component based on the selected item
	const renderActiveComponent = () => {
		switch (activeComponent) {
			case "CropPricePrediction":
				return <CropPricePrediction />;
			case "CropMarketPriceAnalysis":
				return <CropMarketPriceAnalysis />;
			case "AgriMarketPlanner":
				return <AgriMarketPlanner />;
			default:
				return <CropPricePrediction />;
		}
	};

	return (
		<div className="flex">
			<SideBar
				setActiveComponent={setActiveComponent}
				sidebarOpen={sidebarOpen}
				setActiveItem={setActiveItem}
				activeItem={activeItem}
			/>
			<div
				className={`transition-all duration-300 ${
					sidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"
				}`}
			>
				<button
					className={`absolute ${
						sidebarOpen ? "top-24 left-60" : "top-20 left-2"
					}  z-10 p-2 bg-blue-500 text-white rounded-full focus:outline-none`}
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					{sidebarOpen ? (
						<XMarkIcon className="h-6 w-6" />
					) : (
						<IoIosArrowForward className="h-6 w-6" />
					)}
				</button>
				<div className="max-h-[calc(100vh-2rem)] overflow-auto">
					{renderActiveComponent()}
				</div>
			</div>
		</div>
	);
};

export default CropMarketTrendAnalyzerPage;
