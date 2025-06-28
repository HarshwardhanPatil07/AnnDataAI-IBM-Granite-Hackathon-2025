/* eslint-disable react/prop-types */
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";
import { FaSeedling, FaMapMarkedAlt } from "react-icons/fa";
import { GiFlyingDagger } from "react-icons/gi";

export default function SideBar({
	setActiveComponent,
	sidebarOpen,
	activeItem,
	setActiveItem,
}) {
	return (
		<Card
			className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-gray-800 dark:shadow-none transition-all duration-300 ${
				sidebarOpen ? "w-[20rem]" : "w-0 hidden transition-all overflow-hidden"
			}`}
		>
			<div className="mb-2 p-4">
				<Typography
					variant="h5"
					className="text-blue-gray-900 dark:text-gray-300"
				>
					Sidebar
				</Typography>
			</div>
			<List>
				{/* Crop Disease */}
				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "CropDisease"
							? "bg-blue-100 dark:bg-gray-700"
							: ""
					}`}
					onClick={() => {
						setActiveComponent("CropDisease");
						setActiveItem("CropDisease");
					}}
				>
					<ListItemPrefix>
						<FaSeedling className="h-5 w-5 text-green-600 dark:text-green-400" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Crop Disease Detector
					</span>
				</ListItem>

				{/* Pest Outbreak */}
				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "PestOutbreak" ? "bg-blue-100 dark:bg-gray-700" : ""
					}`}
					onClick={() => {
						setActiveComponent("PestOutbreak");
						setActiveItem("PestOutbreak");
					}}
				>
					<ListItemPrefix>
						<GiFlyingDagger className="h-5 w-5 text-red-600 dark:text-red-400" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Pest Outbreak
					</span>
				</ListItem>

				{/* Pest GeoSpatial Analysis */}
				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "PestGeoSpatial" ? "bg-blue-100 dark:bg-gray-700" : ""
					}`}
					onClick={() => {
						setActiveComponent("PestGeoSpatial");
						setActiveItem("PestGeoSpatial");
					}}
				>
					<ListItemPrefix>
						<FaMapMarkedAlt className="h-5 w-5 text-blue-600 dark:text-blue-400" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Pest GeoSpatial Analysis
					</span>
				</ListItem>
			</List>
		</Card>
	);
}
