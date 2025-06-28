import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Tab,
  Tabs,
  Divider,
  Alert,
  useTheme,
  IconButton,
  Badge,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  PendingOutlined,
  LocalShippingOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  ShoppingCartOutlined,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  ArrowUpward as ArrowUpwardIcon,
  Logout as LogoutIcon,
  BarChart as BarChartIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import {
  getDashboardStats,
  getSalesData,
  getAllOrders,
  getProductCategories,
} from "../../services/adminService";
import {
  initializeSocket,
  joinAdminRoom,
  onAdminEvent,
  cleanupAdminListeners,
} from "../../services/socketService";
import OrdersTable from "../../components/admin/OrdersTable";
import ProductsTable from "../../components/admin/ProductsTable";
import UsersTable from "../../components/admin/UsersTable";
import Settings from "../../components/admin/Settings";
import useTokenStore from "../../store/useTokenStore";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const drawerWidth = 240;

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { clearToken, userRole } = useTokenStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    counts: {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      total: 0,
    },
    recentOrders: [],
  });
  const [salesData, setSalesData] = useState({
    labels: [],
    sales: [],
    orders: [],
  });
  const [categoryData, setCategoryData] = useState({
    categories: [],
  });
  const [orders, setOrders] = useState([]);
  const [ordersPagination, setOrdersPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [tabValue, setTabValue] = useState("all");
  const [page, setPage] = useState(1);
  const [mainTab, setMainTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", read: false },
    { id: 2, message: "Low stock alert: Organic Fertilizer", read: false },
    { id: 3, message: "Customer feedback received", read: true },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleNotificationsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    handleNotificationsClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Scroll handler for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle logout
  const handleLogout = () => {
    clearToken();
    navigate("/auth/login");
  };

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching dashboard stats...");
      const response = await getDashboardStats();
      console.log("Dashboard stats response:", response);

      if (response.status === "success") {
        setDashboardStats(response.data);
      } else {
        console.error("Failed to fetch dashboard stats:", response.message);
        setError(`Failed to fetch dashboard stats: ${response.message}`);
      }
    } catch (err) {
      console.error("Exception fetching dashboard stats:", err);
      setError(
        `Failed to fetch dashboard stats: ${err.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch sales data for charts
  const fetchSalesData = useCallback(async () => {
    try {
      const response = await getSalesData(7);
      if (response.status === "success") {
        setSalesData(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch sales data:", err);
    }
  }, []);

  // Fetch product categories
  const fetchProductCategories = useCallback(async () => {
    try {
      const response = await getProductCategories();
      if (response.status === "success") {
        setCategoryData(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch product categories:", err);
    }
  }, []);

  // Fetch orders with filtering
  const fetchOrders = useCallback(async (status = "all", page = 1) => {
    try {
      const response = await getAllOrders(page, 10, status);
      if (response.status === "success") {
        setOrders(response.data);
        setOrdersPagination(response.pagination);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
    fetchOrders(newValue, 1);
  };

  // Handle main tab change
  const handleMainTabChange = (event, newValue) => {
    setMainTab(newValue);
  };

  // Change main tab via drawer menu
  const handleDrawerMenuClick = (tab) => {
    setMainTab(tab);
    setMobileOpen(false);
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchOrders(tabValue, newPage);
  };

  // Initialize socket connection and listeners
  useEffect(() => {
    // Initialize socket connection
    initializeSocket();

    // Join admin room for real-time updates
    joinAdminRoom();

    // Listen for order update events
    const unsubscribeOrderUpdate = onAdminEvent("order_update", () => {
      // Refresh dashboard data when orders are updated
      fetchDashboardStats();
      fetchOrders(tabValue, page);
      // Add a notification
      setNotifications(prev => [
        { id: Date.now(), message: "Order status updated", read: false },
        ...prev.slice(0, 4)
      ]);
    });

    // Listen for new order events
    const unsubscribeNewOrder = onAdminEvent("new_order", () => {
      // Refresh dashboard data when a new order is created
      fetchDashboardStats();
      fetchOrders(tabValue, page);
      // Add a notification
      setNotifications(prev => [
        { id: Date.now(), message: "New order received", read: false },
        ...prev.slice(0, 4)
      ]);
    });

    // Cleanup function
    return () => {
      unsubscribeOrderUpdate();
      unsubscribeNewOrder();
      cleanupAdminListeners();
    };
  }, [fetchDashboardStats, fetchOrders, tabValue, page]);

  // Load initial data
  useEffect(() => {
    fetchDashboardStats();
    fetchSalesData();
    fetchProductCategories();
    fetchOrders("all", 1);
  }, [
    fetchDashboardStats,
    fetchSalesData,
    fetchProductCategories,
    fetchOrders,
  ]);

  // Sales chart configuration
  const salesChartData = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Sales ($)",
        data: salesData.sales,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light + "80",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Orders",
        data: salesData.orders,
        borderColor: theme.palette.secondary.main,
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales & Orders (Last 7 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  // Category pie chart configuration
  const categoryChartData = {
    labels: categoryData.categories.map((cat) => cat.name),
    datasets: [
      {
        data: categoryData.categories.map((cat) => cat.value),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.info.main,
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Product Categories",
      },
    },
    maintainAspectRatio: false,
  };

  // Sales by channel chart data
  const channelData = {
    labels: ['Website', 'Mobile App', 'Marketplace', 'In-Store', 'Others'],
    datasets: [
      {
        label: 'Sales by Channel',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.light,
        ],
      },
    ],
  };

  const channelOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales by Channel (%)',
      },
    },
    maintainAspectRatio: false,
  };

  // Render stat cards
  const renderStatCards = () => {
    const statCards = [
      {
        title: "Pending",
        value: dashboardStats.counts.pending,
        icon: (
          <PendingOutlined
            sx={{ fontSize: 40, color: theme.palette.warning.main }}
          />
        ),
        color: theme.palette.warning.light,
      },
      {
        title: "Processing",
        value: dashboardStats.counts.processing,
        icon: (
          <ShoppingCartOutlined
            sx={{ fontSize: 40, color: theme.palette.info.main }}
          />
        ),
        color: theme.palette.info.light,
      },
      {
        title: "Shipped",
        value: dashboardStats.counts.shipped,
        icon: (
          <LocalShippingOutlined
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        ),
        color: theme.palette.primary.light,
      },
      {
        title: "Delivered",
        value: dashboardStats.counts.delivered,
        icon: (
          <CheckCircleOutlined
            sx={{ fontSize: 40, color: theme.palette.success.main }}
          />
        ),
        color: theme.palette.success.light,
      },
      {
        title: "Cancelled",
        value: dashboardStats.counts.cancelled,
        icon: (
          <CancelOutlined
            sx={{ fontSize: 40, color: theme.palette.error.main }}
          />
        ),
        color: theme.palette.error.light,
      },
    ];

    return (
      <Grid container spacing={2}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 4,
                },
                borderTop: `4px solid ${card.color}`,
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  {card.icon}
                  <Typography
                    variant="h4"
                    component="div"
                    ml={1}
                    fontWeight="bold"
                  >
                    {card.value}
                  </Typography>
                </Box>
                <Typography color="text.secondary">{card.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Summary cards for quick information
  const renderSummaryCards = () => {
    const summary = [
      {
        title: "Total Revenue",
        value: "$12,458.25",
        change: "+15.3%",
        positive: true,
        icon: <BarChartIcon sx={{ color: theme.palette.success.main }} />,
      },
      {
        title: "Active Users",
        value: "854",
        change: "+7.2%",
        positive: true,
        icon: <PeopleIcon sx={{ color: theme.palette.primary.main }} />,
      },
      {
        title: "Product Inventory",
        value: "1,249",
        change: "-3.1%",
        positive: false,
        icon: <InventoryIcon sx={{ color: theme.palette.warning.main }} />,
      },
    ];

    return (
      <Grid container spacing={2} mb={4}>
        {summary.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {item.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={item.positive ? "success.main" : "error.main"}
                    >
                      {item.change} from last month
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      p: 1, 
                      borderRadius: '50%', 
                      bgcolor: item.positive ? 'success.light' : item.change === '0%' ? 'grey.200' : 'error.light'
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Drawer content
  const drawer = (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          AnnDataAI Admin
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {userRole === 'admin' ? 'Administrator' : 'Staff User'}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem 
          button 
          selected={mainTab === 'dashboard'} 
          onClick={() => handleDrawerMenuClick('dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon color={mainTab === 'dashboard' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem 
          button 
          selected={mainTab === 'products'} 
          onClick={() => handleDrawerMenuClick('products')}
        >
          <ListItemIcon>
            <InventoryIcon color={mainTab === 'products' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem 
          button 
          selected={mainTab === 'users'} 
          onClick={() => handleDrawerMenuClick('users')}
        >
          <ListItemIcon>
            <PeopleIcon color={mainTab === 'users' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem 
          button 
          selected={mainTab === 'settings'} 
          onClick={() => handleDrawerMenuClick('settings')}
        >
          <ListItemIcon>
            <SettingsIcon color={mainTab === 'settings' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  // Render the Dashboard overview
  const renderDashboardOverview = () => (
    <>
      {/* Summary Cards */}
      {renderSummaryCards()}

      {/* Stats Overview */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          Order Statistics
        </Typography>
        {renderStatCards()}
      </Box>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, height: 300, boxShadow: 2 }}>
            <Line
              data={salesChartData}
              options={salesChartOptions}
              height={250}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, height: 300, boxShadow: 2 }}>
            <Pie
              data={categoryChartData}
              options={categoryChartOptions}
              height={250}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, height: 300, boxShadow: 2 }}>
            <Bar
              data={channelData}
              options={channelOptions}
              height={250}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={notification.read}
                      >
                        <NotificationsIcon />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.message}
                      secondary={`${Math.floor(Math.random() * 24)}h ago`}
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Orders Section */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          Order Management
        </Typography>
        <Paper sx={{ boxShadow: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Orders" value="all" />
            <Tab label="Pending" value="pending" />
            <Tab label="Processing" value="processing" />
            <Tab label="Shipped" value="shipped" />
            <Tab label="Delivered" value="delivered" />
            <Tab label="Cancelled" value="cancelled" />
          </Tabs>
          <Divider />
          <OrdersTable
            orders={orders}
            pagination={ordersPagination}
            onPageChange={handlePageChange}
          />
        </Paper>
      </Box>
    </>
  );

  if (loading && mainTab === "dashboard") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && mainTab === "dashboard") {
    return (
      <Box m={2}>
        <Alert severity="error">
          {error} - Please check your connection and permissions.
        </Alert>
      </Box>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          boxShadow: 2,
          bgcolor: 'background.paper', 
          color: 'text.primary'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AnnDataAI Admin
          </Typography>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              onClick={handleNotificationsOpen}
              size="large"
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { width: 320, maxHeight: 360 },
            }}
          >
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
              <Button size="small" onClick={markAllAsRead}>Mark all as read</Button>
            </Box>
            <Divider />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                  <ListItemIcon>
                    <Badge
                      color="primary"
                      variant="dot"
                      invisible={notification.read}
                    >
                      <NotificationsIcon fontSize="small" />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary={notification.message} 
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: notification.read ? 'normal' : 'bold'
                    }}
                  />
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <ListItemText primary="No notifications" />
              </MenuItem>
            )}
          </Menu>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'background.paper' 
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px' // AppBar height
        }}
      >
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {mainTab === "dashboard" && "Dashboard Overview"}
            {mainTab === "products" && "Products Management"}
            {mainTab === "users" && "Users Management"}
            {mainTab === "settings" && "Account Settings"}
          </Typography>
          <Typography color="text.secondary">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>

        {/* Main Content based on selected tab */}
        {mainTab === "dashboard" && renderDashboardOverview()}
        {mainTab === "products" && <ProductsTable />}
        {mainTab === "users" && <UsersTable />}
        {mainTab === "settings" && <Settings />}
      </Box>

      {/* Back to top button */}
      {showBackToTop && (
        <Tooltip title="Back to top">
          <IconButton
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              zIndex: 1000,
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Dashboard; 