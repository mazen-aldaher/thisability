import React from 'react';
import { Grid, Paper, Typography, Switch, Button, Box, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserDashboard = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      {/* Top Section: Phone and Switch */}
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <AccountCircleIcon fontSize="large" />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>01145429440</Typography>
        </Box>
        <Box>
          <Switch defaultChecked />
          <Typography variant="body1"> أنت في وضع التقسيط الآن</Typography>
        </Box>
      </Grid>

      {/* Main Content: Business Info and Settings */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">المعلومات التجارية</Typography>
            <Button variant="contained" color="primary">تعديل</Button>
          </Box>
          <Typography variant="body2">الاسم التجاري: Store Luxury</Typography>
          <Typography variant="body2">رقم التاجر: 363940</Typography>
          <Typography variant="body2">رقم الهاتف: 201145429440</Typography>
          <Typography variant="body2">البريد الالكتروني: mazenOaldaher@gmail.com</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">بيانات العمل</Typography>
            <Button variant="contained" color="primary">تعديل</Button>
          </Box>
          {/* Add more data here */}
        </Paper>
      </Grid>

      {/* Settings */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">الإعدادات</Typography>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">اتصالات البريد الإلكتروني</Typography>
            <Button variant="contained" color="error">مُعطل</Button>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">إعدادات التنبيه</Typography>
            <Button variant="contained" color="secondary">غير مُعترف</Button>
          </Box>
          {/* Add more settings */}
        </Paper>
      </Grid>

      {/* Account Information */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">معلومات الحساب</Typography>
          <Typography variant="body2">لا يوجد تكامل دفع</Typography>
          <Typography variant="body2">الرقم السري: BE0D5DB93D...</Typography>
          <Typography variant="body2">تاريخ إنشاء الحساب: 23 أغسطس 2022</Typography>
          <Typography variant="body2">API Key: ••••••••••</Typography>
          <Button variant="contained">تحديث</Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
