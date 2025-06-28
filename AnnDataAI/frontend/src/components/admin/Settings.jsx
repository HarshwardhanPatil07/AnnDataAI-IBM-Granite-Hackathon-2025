import React, { useState } from 'react';
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Logout as LogoutIcon,
  Save as SaveIcon,
  ColorLens as ColorLensIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    dataPrivacy: 'public',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
    setSnackbar({
      open: true,
      message: 'Setting updated successfully',
      severity: 'success',
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handlePasswordSubmit = () => {
    // Validate password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error',
      });
      return;
    }

    // TODO: Implement actual password change logic with backend
    setSnackbar({
      open: true,
      message: 'Password updated successfully',
      severity: 'success',
    });
    handleClosePasswordDialog();
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic with authentication
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box>
      <Typography variant="h6" mb={3}>Settings</Typography>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Notification Settings
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive email notifications for orders, messages, and updates"
            />
            <Switch
              edge="end"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Appearance
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ColorLensIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Dark Mode" 
              secondary="Switch between light and dark themes"
            />
            <Switch
              edge="end"
              checked={settings.darkMode}
              onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Privacy & Security
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Data Privacy" 
              secondary="Control who can see your profile and data"
            />
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => handleSettingChange('dataPrivacy', settings.dataPrivacy === 'public' ? 'private' : 'public')}
            >
              {settings.dataPrivacy === 'public' ? 'Public' : 'Private'}
            </Button>
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Change Password" 
              secondary="Update your account password"
            />
            <Button 
              variant="outlined" 
              size="small"
              onClick={handleOpenPasswordDialog}
            >
              Update
            </Button>
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              secondary="Sign out from your account"
            />
            <Button 
              variant="contained" 
              color="error"
              size="small"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              name="currentPassword"
              label="Current Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <TextField
              margin="dense"
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <TextField
              margin="dense"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button 
            onClick={handlePasswordSubmit} 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 