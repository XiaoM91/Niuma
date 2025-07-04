import React from 'react';
import { Typography, Box } from '@mui/material';

/**
 * Header Component
 * Displays the application title and a brief description
 * @param {string} username - Optional username to personalize the header
 */
function Header({ username }) {
  return (
    <Box className="header">
      <Typography variant="h3" component="h1" gutterBottom>
        🐄🐴 Niuma v2.0.24
      </Typography>
      {username && (
        <Typography variant="h5" sx={{ color: '#ff00ff', marginBottom: 1 }}>
          欢迎回来, {username}! 👋
        </Typography>
      )}
      <Typography variant="subtitle1" sx={{ color: '#00ffff', marginBottom: 1 }}>
        实时可视化您的工资收入，精确到毫秒级别
      </Typography>
      <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic' }}>
        "为社畜量身定制的精神鸦片 | 让你看着钱包慢慢变厚的错觉"
      </Typography>
      <Typography variant="caption" sx={{ color: '#666', display: 'block', marginTop: 1 }}>
        ⚡ Powered by 996.ICU Technology™ | 🔋 续命模式已激活
      </Typography>
    </Box>
  );
}

export default Header;
