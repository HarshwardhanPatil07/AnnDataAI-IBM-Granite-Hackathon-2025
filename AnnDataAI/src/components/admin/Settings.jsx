import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  DarkMode as DarkModeIcon,
  Logout as LogoutIcon,
  DeleteForever as DeleteForeverIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import useTokenStore from '../../store/useTokenStore';

const Settings = () => {
  const navigate = useNavigate();
  const { clearToken } = useTokenStore();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle logout
  const handleLogout = () => {
    // Clear token from store
    clearToken();
    // Close dialog
    setLogoutDialogOpen(false);
    // Show snackbar
    setSnackbar({
      open: true,
      message: 'Successfully logged out',
      severity: 'success',
    });
    // Navigate to login page after a short delay
    setTimeout(() => {
      navigate('/auth/login');
    }, 1500);
  };

  // Toggle settings
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would store this preference
    setSnackbar({
      open: true,
      message: `Dark mode ${!darkMode ? 'enabled' : 'disabled'}`,
      severity: 'success',
    });
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    // In a real app, you would update user preferences
    setSnackbar({
      open: true,
      message: `Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}`,
      severity: 'success',
    });
  };

  // Password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handlePasswordSubmit = () => {
    // Password validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error',
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 8 characters long',
        severity: 'error',
      });
      return;
    }

    // In a real app, you would make an API call to change the password
    setSnackbar({
      open: true,
      message: 'Password updated successfully',
      severity: 'success',
    });
    setPasswordDialogOpen(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Admin Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appearance & Notifications
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DarkModeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dark Mode" secondary="Toggle between light and dark theme" />
                  <Switch
                    edge="end"
                    checked={darkMode}
                    onChange={handleToggleDarkMode}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
                  <Switch
                    edge="end"
                    checked={emailNotifications}
                    onChange={handleToggleEmailNotifications}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem button onClick={() => setPasswordDialogOpen(true)}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" secondary="Update your account password" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Actions
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LogoutIcon />}
                  onClick={() => setLogoutDialogOpen(true)}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Logout
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => setDeleteAccountDialogOpen(true)}
                  fullWidth
                >
                  Delete Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteAccountDialogOpen} onClose={() => setDeleteAccountDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            This action cannot be undone. All your data will be permanently deleted.
          </DialogContentText>
          <Alert severity="error" sx={{ mb: 2 }}>
            As an admin account, deleting your account may affect system operation.
          </Alert>
          <TextField
            autoFocus
            margin="dense"
            label="Type 'DELETE' to confirm"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" disabled>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            required
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handlePasswordSubmit} 
            color="primary" 
            variant="contained" 
            startIcon={<SaveIcon />}
            disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 