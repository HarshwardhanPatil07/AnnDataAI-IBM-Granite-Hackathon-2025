import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/image/header1.png";
import sun from "../../assets/image/sun.png";
import moon from "../../assets/image/moon.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMediaQuery } from "@mui/material";

import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext";
import useTokenStore from "../../store/useTokenStore";
import LanguageSwitcher from "../LanguageSwitcher";
import { useCart } from "../../context/CartContext";
import { isUserAdmin } from "../../services/userService";

const pages = [
  { name: "Home", path: "/home" },
  { name: "Disease Detector", path: "/plant-disease-detector" },
  { name: "Weather & Geo", path: "/weather-and-geofencing" },
  { name: "Soil Check", path: "/soil-analytic" },
  { name: "Fertilizer & Water", path: "/fertilizer-irrigation" },
  { name: "Shop", path: "/shop" },
  // { name: "Info", path: "/info" },
  // { name: "About", path: "/about" },
  // { name: "Contact", path: "/contact" },
  // { name: "Feedback", path: "/users/:id/feedback" },
];

const settings = ["My Orders", "Contact", "About", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { cart } = useCart();

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const { token, setToken, setUserId, clearToken } = useTokenStore(
    (state) => state
  );

  const { theme, toggleTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  React.useEffect(() => {
    // Check if user is admin when component mounts or token changes
    const checkAdminStatus = async () => {
      if (token) {
        try {
          const adminStatus = await isUserAdmin();
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };

    checkAdminStatus();
  }, [token]);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out!..");
    clearToken();
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/");
  };

  const handleViewCart = () => {
    navigate("/shop/cart");
  };

  const handleAdminDashboard = () => {
    navigate("/admin/dashboard");
  };

  const settingsHandlers = {
    "Admin Dashboard": handleAdminDashboard,
    "My Orders": () => navigate("/shop/orders"),
    Contact: () => navigate("/contact"),
    About: () => navigate("/about"),
    Logout: handleLogout,
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Add Admin Dashboard to the settings menu if user is admin
  const userSettings = isAdmin ? ["Admin Dashboard", ...settings] : settings;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme === "light" ? "white" : "#1a202c",
        boxShadow: "none",
        borderBottom: `1px solid ${theme === "light" ? "#E0E0E0" : "#4a5568"}`,
        zIndex: 1100,
      }}
      className={theme === "dark" ? "dark" : ""}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo Section for Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "1rem",
              padding: "0.5rem",
              marginRight: "3rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src={Logo}
                alt="MOE Logo"
                className="h-10 md:h-12 w-auto mt-2"
              />
            </Box>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" }, minWidth: "240px" }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Navigation Links in Mobile Menu */}
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
                <LanguageSwitcher />
              </Box>
            </Menu>
          </Box>

          {/* Logo Section for Mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src={Logo}
                alt="MOE Logo"
                className="h-10 md:h-12 w-auto mt-2"
              />
            </Box>
          </Box>

          {/* Navbar Links and Theme Toggle Button */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu()}
                component={Link}
                to={page.path}
                sx={{
                  color: theme === "light" ? "black" : "white",
                  mx: 1,
                  position: "relative",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: theme === "light" ? "black" : "white",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -4,
                      width: "100%",
                      height: "2px",
                      backgroundColor: theme === "light" ? "black" : "white",
                      transform: "scaleX(1)",
                      transformOrigin: "bottom left",
                    },
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: "100%",
                    height: "2px",
                    backgroundColor: theme === "light" ? "black" : "white",
                    transform: "scaleX(0)",
                    transformOrigin: "bottom right",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
            <LanguageSwitcher />
          </Box>

          {/* Theme Toggle Button */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: theme === "light" ? "black" : "white",
              marginRight: "0.5rem",
            }}
            className="mr-2"
          >
            <img
              src={theme === "light" ? moon : sun}
              alt={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              className="w-6 h-6"
            />
          </IconButton>

          {/* Shopping Cart Icon */}
          <IconButton
            color="inherit"
            onClick={handleViewCart}
            sx={{
              color: theme === "light" ? "black" : "white",
              marginRight: "1rem",
            }}
          >
            <Badge
              badgeContent={cart?.totalItems || 0}
              color="primary"
              showZero={false}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  sx={{
                    width: isSmallScreen ? 32 : 40,
                    height: isSmallScreen ? 32 : 40,
                    bgcolor: theme === "light" ? "#1976d2" : "#90caf9",
                  }}
                >
                  U
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userSettings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => settingsHandlers[setting]()}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
