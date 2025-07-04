import React from 'react';
import { Box, Typography, Link } from '@mui/material';

/**
 * Footer Component
 * Displays copyright information and links
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box className="footer">
      <Typography variant="body2" color="textSecondary">
        © {currentYear} Niuma |
        <Link href="#" color="inherit" sx={{ ml: 1, mr: 1 }}>
          隐私政策
        </Link> | 
        <Link href="#" color="inherit" sx={{ ml: 1 }}>
          关于我们
        </Link>
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
        本应用仅用于可视化您的工资收入，不会存储任何个人数据。
      </Typography>
    </Box>
  );
}

export default Footer;
