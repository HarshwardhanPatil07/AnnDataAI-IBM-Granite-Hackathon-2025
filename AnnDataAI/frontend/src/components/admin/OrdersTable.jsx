import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { MoreVert, Visibility, Edit } from "@mui/icons-material";
import { updateOrderStatus } from "../../services/adminService";
import { formatDate } from "../../utils/helpers";

// Order status chip colors
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "delivered":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const OrdersTable = ({ orders, pagination, onPageChange, onStatusUpdate }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Handle menu open
  const handleMenuClick = (event, order) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Open status change dialog
  const handleOpenStatusDialog = () => {
    setMenuAnchorEl(null);
    setStatusDialogOpen(true);
  };

  // Close status change dialog
  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
  };

  // Open order details dialog
  const handleOpenDetailsDialog = () => {
    setMenuAnchorEl(null);
    setDetailsDialogOpen(true);
  };

  // Close order details dialog
  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    setUpdatingStatus(true);
    try {
      const response = await updateOrderStatus(selectedOrder._id, newStatus);
      if (response.status === "success") {
        // Call the parent component's callback to refresh data
        if (onStatusUpdate) onStatusUpdate();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingStatus(false);
      handleCloseStatusDialog();
    }
  };

  // Render status change dialog
  const renderStatusDialog = () => {
    if (!selectedOrder) return null;

    const statusOptions = [
      { value: "pending", label: "Pending" },
      { value: "processing", label: "Processing" },
      { value: "shipped", label: "Shipped" },
      { value: "delivered", label: "Delivered" },
      { value: "cancelled", label: "Cancelled" },
    ];

    return (
      <Dialog open={statusDialogOpen} onClose={handleCloseStatusDialog}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current status:{" "}
            <Chip
              size="small"
              label={selectedOrder.status.toUpperCase()}
              color={getStatusColor(selectedOrder.status)}
            />
          </Typography>
          <Typography variant="body2" gutterBottom>
            Select new status:
          </Typography>
          <Stack spacing={1} mt={1}>
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={
                  selectedOrder.status === option.value
                    ? "outlined"
                    : "contained"
                }
                color={getStatusColor(option.value)}
                onClick={() => handleStatusChange(option.value)}
                disabled={
                  updatingStatus || selectedOrder.status === option.value
                }
                startIcon={
                  updatingStatus && selectedOrder.status !== option.value ? (
                    <CircularProgress size={16} />
                  ) : null
                }
              >
                {option.label}
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render order details dialog
  const renderDetailsDialog = () => {
    if (!selectedOrder) return null;

    return (
      <Dialog
        open={detailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details - {selectedOrder.orderNumber}</DialogTitle>
        <DialogContent dividers>
          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Order Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Typography variant="body2">
                <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong>{" "}
                <Chip
                  size="small"
                  label={selectedOrder.status.toUpperCase()}
                  color={getStatusColor(selectedOrder.status)}
                />
              </Typography>
              <Typography variant="body2">
                <strong>Customer:</strong>{" "}
                {selectedOrder.user ? selectedOrder.user.email : "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
              </Typography>
            </Box>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Shipping Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Typography variant="body2">
                <strong>Name:</strong> {selectedOrder.shippingInfo?.firstName}{" "}
                {selectedOrder.shippingInfo?.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {selectedOrder.shippingInfo?.address}
              </Typography>
              <Typography variant="body2">
                <strong>City:</strong> {selectedOrder.shippingInfo?.city}
              </Typography>
              <Typography variant="body2">
                <strong>State:</strong> {selectedOrder.shippingInfo?.state}
              </Typography>
              <Typography variant="body2">
                <strong>Zip:</strong> {selectedOrder.shippingInfo?.zipCode}
              </Typography>
              <Typography variant="body2">
                <strong>Country:</strong> {selectedOrder.shippingInfo?.country}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {selectedOrder.shippingInfo?.phone}
              </Typography>
              <Typography variant="body2">
                <strong>Shipping Method:</strong>{" "}
                {selectedOrder.shippingMethod?.name || "N/A"}
              </Typography>
            </Box>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Order Items
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell>
                      <Typography variant="subtitle2">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">
                        ${selectedOrder.subTotal.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell>
                      <Typography variant="subtitle2">Shipping</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">
                        $
                        {(selectedOrder.total - selectedOrder.subTotal).toFixed(
                          2
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Total
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" fontWeight="bold">
                        ${selectedOrder.total.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDetailsDialog();
              handleOpenStatusDialog();
            }}
            color="primary"
            startIcon={<Edit />}
          >
            Update Status
          </Button>
          <Button onClick={handleCloseDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (!orders || orders.length === 0) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <Typography color="text.secondary">No orders found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ boxShadow: "none" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                sx={{
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.user?.email || "N/A"}</TableCell>
                <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status.toUpperCase()}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedOrder(order);
                      setDetailsDialogOpen(true);
                    }}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(event) => handleMenuClick(event, order)}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={pagination.totalItems}
        page={pagination.currentPage - 1}
        onPageChange={onPageChange}
        rowsPerPage={pagination.itemsPerPage}
        rowsPerPageOptions={[10]}
        onRowsPerPageChange={() => {}}
      />

      {/* Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenDetailsDialog}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleOpenStatusDialog}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Update Status
        </MenuItem>
      </Menu>

      {/* Dialogs */}
      {renderStatusDialog()}
      {renderDetailsDialog()}
    </Box>
  );
};

export default OrdersTable;
