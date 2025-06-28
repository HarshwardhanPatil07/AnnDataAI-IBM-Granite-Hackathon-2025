import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SideBar from "./Sidebar";
import WeatherForecast from "./SideNavs/WeatherForecast";
import GeoFencing from "./SideNavs/GeoFencing";
import Infusion from "./SideNavs/Infusion";

const WeatherGeoFencing = () => {
	// State to track the currently selected component
	const [activeComponent, setActiveComponent] = useState("WeatherForecast");
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [activeItem, setActiveItem] = useState("WeatherForecast"); 

	// Function to render the component based on the selected item
	const renderActiveComponent = () => {
		switch (activeComponent) {
			case "WeatherForecast":
				return <WeatherForecast />;
			case "GeoFencing":
				return <GeoFencing />;
			case "Infusion":
				return <Infusion />;
			default:
				return <WeatherForecast />;
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

export default WeatherGeoFencing;
