/* eslint-disable react/prop-types */
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";
import { MdAgriculture } from "react-icons/md"; // For Crop Yield Predictor
import { GiFarmTractor } from "react-icons/gi"; // For Crop Swapping Strategy

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
				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "CropYieldPredictor"
							? "bg-blue-100 dark:bg-gray-700"
							: ""
					}`}
					onClick={() => {
						setActiveComponent("CropYieldPredictor");
						setActiveItem("CropYieldPredictor");
					}}
				>
					<ListItemPrefix>
						<MdAgriculture className="h-6 w-6 text-green-600 dark:text-green-400" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Crop Yield Predictor
					</span>
				</ListItem>

				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "CropSwappingStrategy" ? "bg-blue-100 dark:bg-gray-700" : ""
					}`}
					onClick={() => {
						setActiveComponent("CropSwappingStrategy");
						setActiveItem("CropSwappingStrategy");
					}}
				>
					<ListItemPrefix>
						<GiFarmTractor className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Crop Swapping Strategy
					</span>
				</ListItem>
			</List>
		</Card>
	);
}
