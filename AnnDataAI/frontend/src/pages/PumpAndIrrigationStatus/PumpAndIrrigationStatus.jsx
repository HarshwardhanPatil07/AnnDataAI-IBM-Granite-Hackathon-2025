import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const PumpAndIrrigationStatus = () => {
	const [loading, setLoading] = useState(true);
   
	const handleIframeLoad = () => {
		setLoading(false);
	};

	return (
		<div style={{ position: "relative", height: "100vh", width: "100%" }}>
			{loading && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 1,
					}}
				>
					<LoaderCircle className="animate-spin h-44 w-20" />
				</div>
			)}
			<iframe
				src="https://rajkhanke007-irrigation-pump-status.hf.space/"
				title=""
				style={{ width: "100%", height: "100%", border: "none" }}
				onLoad={handleIframeLoad}
			/>
		</div>
	);
};

export default PumpAndIrrigationStatus;