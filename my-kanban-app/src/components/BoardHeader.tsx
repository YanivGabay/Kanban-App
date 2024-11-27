// src/components/BoardHeader.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AddBoard from './AddBoard';

const BoardHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your Boards
        </Typography>
        <AddBoard />
      </Toolbar>
    </AppBar>
  );
};

export default BoardHeader;
