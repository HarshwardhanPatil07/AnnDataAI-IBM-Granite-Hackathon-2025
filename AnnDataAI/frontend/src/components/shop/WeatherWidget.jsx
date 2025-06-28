import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 18.52, lon: 73.85 }); // Default to Pune, India
  const theme = useTheme();

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // If user denies location access, use default location
          console.log("User denied geolocation, using default location");
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // For demo purposes, use a mock API response since we can't include API keys
        // In a real app, you would use: `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=YOUR_API_KEY`
        const mockWeatherData = {
          main: {
            temp: Math.round(Math.random() * 15 + 20), // Random temp between 20-35°C
            humidity: Math.round(Math.random() * 40 + 40), // Random humidity between 40-80%
            feels_like: Math.round(Math.random() * 15 + 20), // Random feels_like between 20-35°C
          },
          weather: [
            {
              main: ["Clear", "Clouds", "Rain", "Drizzle", "Thunderstorm"][
                Math.floor(Math.random() * 5)
              ],
              description: "Weather condition description",
            },
          ],
          wind: {
            speed: Math.round((Math.random() * 20 + 5) * 10) / 10, // Random wind speed between 5-25 km/h
          },
          name: "Pune", // Default city name
        };

        setWeather(mockWeatherData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Could not fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  // Get appropriate weather icon
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <WbSunnyIcon fontSize="large" sx={{ color: "#FFD700" }} />;
      case "Clouds":
        return <CloudIcon fontSize="large" sx={{ color: "#A9A9A9" }} />;
      case "Rain":
        return <GrainIcon fontSize="large" sx={{ color: "#4682B4" }} />;
      case "Snow":
        return <AcUnitIcon fontSize="large" sx={{ color: "#E0FFFF" }} />;
      case "Thunderstorm":
        return <ThunderstormIcon fontSize="large" sx={{ color: "#4169E1" }} />;
      default:
        return <CloudIcon fontSize="large" sx={{ color: "#A9A9A9" }} />;
    }
  };

  // Format based on weather condition
  const getCardColor = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return theme.palette.mode === "light" ? "#f0f8ff" : "#1a365d";
      case "Clouds":
        return theme.palette.mode === "light" ? "#f5f5f5" : "#2d3748";
      case "Rain":
        return theme.palette.mode === "light" ? "#e6f7ff" : "#1e3a8a";
      case "Snow":
        return theme.palette.mode === "light" ? "#f0f8ff" : "#1a202c";
      case "Thunderstorm":
        return theme.palette.mode === "light" ? "#e6e6fa" : "#2a4365";
      default:
        return theme.palette.mode === "light" ? "#f8f9fa" : "#2d3748";
    }
  };

  if (loading) {
    return (
      <Card
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <CircularProgress size={30} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 2, borderRadius: 2 }}>
        <Typography color="error">{error}</Typography>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card
      sx={{
        p: 2,
        backgroundColor: getCardColor(weather.weather[0].main),
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              Weather
            </Typography>
            <Typography variant="h4" component="div" fontWeight={600}>
              {weather.main.temp}°C
            </Typography>
            <Typography color="text.secondary">
              Feels like {weather.main.feels_like}°C
            </Typography>
            <Typography variant="body2">{weather.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {getWeatherIcon(weather.weather[0].main)}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {weather.weather[0].main}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <OpacityIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{weather.main.humidity}%</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AirIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{weather.wind.speed} km/h</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
