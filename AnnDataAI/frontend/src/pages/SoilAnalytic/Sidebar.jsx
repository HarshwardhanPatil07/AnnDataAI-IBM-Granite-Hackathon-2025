/* eslint-disable react/prop-types */
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";
import { WiDayCloudy } from "react-icons/wi";
import { FaDrawPolygon } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

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
						activeItem === "SoilReport"
							? "bg-blue-100 dark:bg-gray-700"
							: ""
					}`}
					onClick={() => {
						setActiveComponent("SoilReport");
						setActiveItem("SoilReport");
					}}
				>
					<ListItemPrefix>
						<WiDayCloudy className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Soil Report by Location
					</span>
				</ListItem>

				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "UserSoilReport" ? "bg-blue-100 dark:bg-gray-700" : ""
					}`}
					onClick={() => {
						setActiveComponent("UserSoilReport");
						setActiveItem("UserSoilReport");
					}}
				>
					<ListItemPrefix>
						<FaDrawPolygon className="h-5 w-5 text-green-600 dark:text-green-400" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						User Soil Report
					</span>
				</ListItem>

				<ListItem
					className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
						activeItem === "SoilReportHelper" ? "bg-blue-100 dark:bg-gray-700" : ""
					}`}
					onClick={() => {
						setActiveComponent("SoilReportHelper");
						setActiveItem("SoilReportHelper");
					}}
				>
					<ListItemPrefix>
						<QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
					</ListItemPrefix>
					<span className="text-blue-gray-900 dark:text-gray-300">
						Soil Report Helper
					</span>
				</ListItem>
			</List>
		</Card>
	);
}
