import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext";

import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import Auth from "./components/layouts/Auth.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import MainLayout from "./components/layouts/MainLayout.jsx";
import AdminRoute from "./components/layouts/AdminRoute.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Info from "./pages/Info/InfoPage.jsx";
import About from "./pages/About/AboutPage.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import FeedBackPage from "./pages/Feedback/FeedBackPage.jsx";

// Import ThemeContext
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import IrrigationWaterReq from "./pages/IrrigationWaterReq/IrrigationWaterReq.jsx";
import OptimalCropSeason from "./pages/OptimalCropSeason/OptimalCropSeason.jsx";
import FertilizerRecommendation from "./pages/FertilizerRecommendation/FertilizerRecommendation.jsx";
import CropRecommendationPage from "./pages/CropRecommendation/CropRecommendationPage.jsx";
import CropYieldPredictor from "./pages/CropYieldPredictor/CropSwapping.jsx";
import GeoSpatialCropAnalysis from "./pages/GeoSpatialCropAnalysis/GeoSpatialCropAnalysis.jsx";
import PumpAndIrrigationStatus from "./pages/PumpAndIrrigationStatus/PumpAndIrrigationStatus.jsx";
import CropMarketTrendAnalyzerPage from "./pages/CropMarketTrendAnalyzer/CropMarketTrendAnalyzerPage.jsx";
import "./i18n";
import { CommonProvider } from "./context/common/commonContext.jsx";
import DiseasePage from "./pages/PlantDisease/DiseasePage.jsx";
import WeatherGeoFencing from "./pages/WeatherGeoFencing/WeatherGeoFencing.jsx";
import SoilAnalytic from "./pages/SoilAnalytic/SoilAnalytic.jsx";
import FertilizersPage from "./pages/Fertilizers/FertilizersPage.jsx";
import ShopPage from "./pages/Shop/ShopPage";
import ProductDetailPage from "./pages/Shop/ProductDetailPage";
import CartPage from "./pages/Shop/CartPage";
import OrdersPage from "./pages/Shop/OrdersPage";
import OrderDetailPage from "./pages/Shop/OrderDetailPage";
import AdminDashboard from "./pages/Admin/Dashboard";
// import LanguageSwitcher from "./components/LanguageSwitcher.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { 
        path: "plant-disease-detector", 
        element: (
          <ProtectedRoute>
            <DiseasePage />
          </ProtectedRoute>
        )
      },
      { 
        path: "weather-and-geofencing", 
        element: (
          <ProtectedRoute>
            <WeatherGeoFencing />
          </ProtectedRoute>
        )
      },
      { 
        path: "soil-analytic", 
        element: (
          <ProtectedRoute>
            <SoilAnalytic />
          </ProtectedRoute>
        )
      },
      { 
        path: "fertilizer-irrigation", 
        element: (
          <ProtectedRoute>
            <FertilizersPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "waterNeedAnalysis/result", 
        element: (
          <ProtectedRoute>
            <IrrigationWaterReq />
          </ProtectedRoute>
        )
      },
      { 
        path: "pumpAndIrrigationStatus", 
        element: (
          <ProtectedRoute>
            <PumpAndIrrigationStatus />
          </ProtectedRoute>
        )
      },
      { path: "info", element: <Info /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { 
        path: "users/:userId/feedback", 
        element: (
          <ProtectedRoute>
            <FeedBackPage />
          </ProtectedRoute>
        )
      },
      {
        path: "fertilizerRecommendation",
        element: (
          <ProtectedRoute>
            <FertilizerRecommendation />
          </ProtectedRoute>
        ),
      },
      { 
        path: "cropRecommendation", 
        element: (
          <ProtectedRoute>
            <CropRecommendationPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "optimalCropSeason", 
        element: (
          <ProtectedRoute>
            <OptimalCropSeason />
          </ProtectedRoute>
        )
      },
      { 
        path: "cropYieldPredictor", 
        element: (
          <ProtectedRoute>
            <CropYieldPredictor />
          </ProtectedRoute>
        )
      },
      { 
        path: "geoSpatialCropAnalysis", 
        element: (
          <ProtectedRoute>
            <GeoSpatialCropAnalysis />
          </ProtectedRoute>
        )
      },
      {
        path: "cropMarketTrendAnalyzer",
        element: (
          <ProtectedRoute>
            <CropMarketTrendAnalyzerPage />
          </ProtectedRoute>
        ),
      },
      { 
        path: "shop", 
        element: (
          <ProtectedRoute>
            <ShopPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "shop/product/:productId", 
        element: (
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "shop/cart", 
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "shop/orders", 
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "shop/orders/:orderId", 
        element: (
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        )
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [{ path: "dashboard", element: <AdminDashboard /> }],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { 
        path: "login", 
        element: (
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "register", 
        element: (
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        )
      },
    ],
  },
]);

// App component using ThemeContext and MuiThemeProvider
const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  // Define MUI theme based on the context theme
  const muiTheme = createTheme({
    palette: {
      mode: theme === "light" ? "light" : "dark",
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
        {/* Tailwind CSS and MUI components will share the theme */}
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </div>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* <LanguageSwitcher /> */}
        <CommonProvider>
          <AppContent />
        </CommonProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
