import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import useTokenStore from "../../store/useTokenStore";

const Auth = () => {
	const { token } = useTokenStore((state) => state);
	// if (token) {
	// 	return <Navigate to={"/home"} replace />;
	// }
	return (
		<>
		<ScrollToTop/>
			<Outlet />
		</>
	);
};

export default Auth;
