import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import ScrollToTop from "../common/ScrollToTop";
import ChatBot from "../common/Chatbot";
import useScrollDisable from "../../hooks/useScrollDisable";
import useDocTitle from "../../hooks/useDocTitle";
import Preloader from "../common/Preloader";
import commonContext from "../../context/common/commonContext";
import useTokenStore from "../../store/useTokenStore";

const MainLayout = () => {
	// const { token } = useTokenStore((state) => state);

	// // Redirect if token is missing
	// if (!token) {
	// 	return <Navigate to="/auth/login" replace />;
	// }

	// const { isLoading, toggleLoading } = useContext(commonContext);

	// useEffect(() => {
	// 	toggleLoading(true);
	// 	const timer = setTimeout(() => toggleLoading(false), 2000);
	// 	return () => clearTimeout(timer); // Cleanup function
	// }, [toggleLoading]);

	// useScrollDisable(isLoading);
	// useDocTitle();

	// // Show preloader while loading
	// if (isLoading) {
	// 	return <Preloader />;
	// }

	return (
		<div className="flex flex-col min-h-screen">
			<ScrollToTop />
			<Navbar />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
			<ChatBot />
		</div>
	);
};

export default MainLayout;
