import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

/**
 * SalaryDisplay Component
 * Displays the real-time salary calculation with animations
 */
function SalaryDisplay({ salaryData, onReset }) {
  const [currentSalary, setCurrentSalary] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isHeartbeat, setIsHeartbeat] = useState(false);
  const lastHeartbeatThreshold = useRef(0);

  // Calculate salary per millisecond based on input data
  const calculateSalaryPerMs = useCallback(() => {
    const { monthlySalary, workDaysPerMonth, workingHours } = salaryData;

    // Calculate daily salary
    const dailySalary = monthlySalary / workDaysPerMonth;

    // Calculate hourly salary
    const hourlySalary = dailySalary / workingHours;

    // Calculate salary per millisecond
    return hourlySalary / (60 * 60 * 1000);
  }, [salaryData]);

  // Format currency with exactly 3 decimal places
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(amount);
  };

  // Format time as HH:MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const salaryPerMs = calculateSalaryPerMs();
    let animationFrameId;

    const updateSalary = () => {
      const now = new Date().getTime();
      const elapsed = now - salaryData.startTimestamp;
      const salary = salaryPerMs * elapsed;

      // Check for heartbeat trigger (every 0.1 yuan)
      const currentThreshold = Math.floor(salary / 0.1);
      if (currentThreshold > lastHeartbeatThreshold.current) {
        lastHeartbeatThreshold.current = currentThreshold;
        setIsHeartbeat(true);
        // Reset heartbeat after animation duration
        setTimeout(() => setIsHeartbeat(false), 600);
      }

      setCurrentSalary(salary);
      setElapsedTime(elapsed);

      animationFrameId = requestAnimationFrame(updateSalary);
    };

    updateSalary();

    // Cleanup function to cancel animation frame
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [salaryData, calculateSalaryPerMs]);

  return (
    <Paper className="salary-display">
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#00ffff' }}>
        💰 您的实时工资收割机 💰
      </Typography>

      <Box className={`salary-amount ${isHeartbeat ? 'heartbeat-big' : 'heartbeat'}`}>
        {formatCurrency(currentSalary)}
      </Box>

      <Typography variant="body2" sx={{ color: '#ffff00', marginBottom: 1 }}>
        🔥 钱包正在燃烧中... 每毫秒都在增长！
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ color: '#00ff00' }}>
        ⏰ 已榨取时间: {formatTime(elapsedTime)}
      </Typography>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        📊 月薪: {formatCurrency(salaryData.monthlySalary)} | 
        📅 工作日: {salaryData.workDaysPerMonth}天 | 
        🕐 工作时间: {salaryData.workStartTime} - {salaryData.workEndTime}
      </Typography>

      <Typography variant="caption" sx={{ color: '#888', fontStyle: 'italic', display: 'block', marginTop: 1 }}>
        "看着数字跳动，仿佛自己真的在赚钱 🤡"
      </Typography>

      <Typography variant="caption" sx={{ color: '#666', fontStyle: 'italic', display: 'block', marginTop: 0.5 }}>
        "每一毛钱都让我心跳加速，这就是打工人的快乐吗？😂"
      </Typography>

      <Box className="button-container" mt={3}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={onReset}
          sx={{ 
            background: 'linear-gradient(45deg, #ff00ff, #ff0080)',
            '&:hover': {
              background: 'linear-gradient(45deg, #ff0080, #ff00ff)',
            }
          }}
        >
          🔄 重新开始做牛马
        </Button>
      </Box>
    </Paper>
  );
}

export default SalaryDisplay;
