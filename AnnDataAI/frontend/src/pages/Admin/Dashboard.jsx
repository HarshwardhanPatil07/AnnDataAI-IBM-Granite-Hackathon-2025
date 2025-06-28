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
} from "@mui/material";
import {
  PendingOutlined,
  LocalShippingOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const theme = useTheme();
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
    });

    // Listen for new order events
    const unsubscribeNewOrder = onAdminEvent("new_order", () => {
      // Refresh dashboard data when a new order is created
      fetchDashboardStats();
      fetchOrders(tabValue, page);
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

  if (loading) {
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

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">
          {error} - Please check your connection and permissions.
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>

      {/* Stats Overview */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          Order Statistics
        </Typography>
        {renderStatCards()}
      </Box>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 300, boxShadow: 2 }}>
            <Line
              data={salesChartData}
              options={salesChartOptions}
              height={250}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 300, boxShadow: 2 }}>
            <Pie
              data={categoryChartData}
              options={categoryChartOptions}
              height={250}
            />
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
            onStatusUpdate={fetchDashboardStats}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
