/* eslint-disable react/prop-types */
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
} from "@material-tailwind/react";
import { Sprout, TreePalm } from "lucide-react";

const items = [
	{ id: "CropRecommendationOne", label: "With NPK values",icon: Sprout  },
	{ id: "CropRecommendationTwo", label: "With Soil Parameter", icon: TreePalm  },
];

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
				{items.map((item) => (
					<ListItem
						key={item.id}
						className={`hover:bg-blue-gray-100 dark:hover:bg-gray-700 ${
							activeItem === item.id ? "bg-blue-100 dark:bg-gray-700" : ""
						}`}
						onClick={() => {
							setActiveComponent(item.id);
							setActiveItem(item.id);
						}}
					>
						<ListItemPrefix>
							<item.icon className="h-5 w-5 text-blue-gray-900 dark:text-gray-300" />
						</ListItemPrefix>
						<span className="text-blue-gray-900 dark:text-gray-300">
							{item.label}
						</span>
					</ListItem>
				))}
			</List>
		</Card>
	);
}
