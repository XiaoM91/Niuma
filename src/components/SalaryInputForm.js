import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { zhCN } from 'date-fns/locale';

/**
 * SalaryInputForm Component
 * Form for inputting salary information and work schedule
 */
function SalaryInputForm({ onStart }) {
  const [formData, setFormData] = useState({
    monthlySalary: '',
    workDaysPerMonth: '22',
    workStartTime: '09:00',
    workEndTime: '18:00',
    workStartDate: new Date(),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      workStartDate: date,
    });

    // Clear error when user selects date
    if (errors.workStartDate) {
      setErrors({
        ...errors,
        workStartDate: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.monthlySalary) {
      newErrors.monthlySalary = '请输入月薪';
    } else if (isNaN(formData.monthlySalary) || Number(formData.monthlySalary) <= 0) {
      newErrors.monthlySalary = '请输入有效的月薪金额';
    }

    if (!formData.workDaysPerMonth) {
      newErrors.workDaysPerMonth = '请输入每月工作天数';
    } else if (
      isNaN(formData.workDaysPerMonth) || 
      Number(formData.workDaysPerMonth) <= 0 || 
      Number(formData.workDaysPerMonth) > 31
    ) {
      newErrors.workDaysPerMonth = '请输入有效的工作天数 (1-31)';
    }

    if (!formData.workStartTime) {
      newErrors.workStartTime = '请输入上班时间';
    }

    if (!formData.workEndTime) {
      newErrors.workEndTime = '请输入下班时间';
    }

    if (!formData.workStartDate) {
      newErrors.workStartDate = '请选择开始工作日期';
    } else if (formData.workStartDate < new Date().setHours(0, 0, 0, 0)) {
      newErrors.workStartDate = '开始日期不能早于今天';
    }

    // Check if end time is after start time
    if (formData.workStartTime && formData.workEndTime) {
      const startTime = new Date(`2000-01-01T${formData.workStartTime}`);
      const endTime = new Date(`2000-01-01T${formData.workEndTime}`);

      if (endTime <= startTime) {
        newErrors.workEndTime = '下班时间必须晚于上班时间';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Calculate working hours
      const startTime = new Date(`2000-01-01T${formData.workStartTime}`);
      const endTime = new Date(`2000-01-01T${formData.workEndTime}`);
      const workingHours = (endTime - startTime) / (1000 * 60 * 60);

      // Prepare data for parent component
      const salaryData = {
        monthlySalary: Number(formData.monthlySalary),
        workDaysPerMonth: Number(formData.workDaysPerMonth),
        workingHours,
        workStartTime: formData.workStartTime,
        workEndTime: formData.workEndTime,
        workStartDate: formData.workStartDate,
        startTimestamp: new Date().getTime(),
      };

      onStart(salaryData);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
      <Paper className="form-container">
      <Typography variant="h5" component="h2" gutterBottom>
        输入您的工资信息
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="开始工作日期"
              value={formData.workStartDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className="form-field"
                  error={!!errors.workStartDate}
                  helperText={errors.workStartDate}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth className="form-field" error={!!errors.monthlySalary}>
              <InputLabel htmlFor="monthlySalary">月薪</InputLabel>
              <Input
                id="monthlySalary"
                name="monthlySalary"
                value={formData.monthlySalary}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">¥</InputAdornment>}
                type="number"
                required
              />
              {errors.monthlySalary && (
                <Typography variant="caption" color="error">
                  {errors.monthlySalary}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth className="form-field" error={!!errors.workDaysPerMonth}>
              <InputLabel htmlFor="workDaysPerMonth">每月工作天数</InputLabel>
              <Input
                id="workDaysPerMonth"
                name="workDaysPerMonth"
                value={formData.workDaysPerMonth}
                onChange={handleChange}
                type="number"
                required
              />
              {errors.workDaysPerMonth && (
                <Typography variant="caption" color="error">
                  {errors.workDaysPerMonth}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth className="form-field" error={!!errors.workStartTime}>
              <InputLabel htmlFor="workStartTime">上班时间</InputLabel>
              <Input
                id="workStartTime"
                name="workStartTime"
                value={formData.workStartTime}
                onChange={handleChange}
                type="time"
                required
              />
              {errors.workStartTime && (
                <Typography variant="caption" color="error">
                  {errors.workStartTime}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth className="form-field" error={!!errors.workEndTime}>
              <InputLabel htmlFor="workEndTime">预计下班时间</InputLabel>
              <Input
                id="workEndTime"
                name="workEndTime"
                value={formData.workEndTime}
                onChange={handleChange}
                type="time"
                required
              />
              {errors.workEndTime && (
                <Typography variant="caption" color="error">
                  {errors.workEndTime}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Box className="button-container">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
          >
            开始赚钱 💸
          </Button>
          <Typography variant="caption" sx={{ color: '#888', fontStyle: 'italic', display: 'block', marginTop: 1, textAlign: 'center' }}>
            "点击开始自我安慰式赚钱体验 🤡"
          </Typography>
        </Box>
      </form>
    </Paper>
    </LocalizationProvider>
  );
}

export default SalaryInputForm;
