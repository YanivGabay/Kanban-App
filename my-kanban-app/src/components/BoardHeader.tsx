// src/components/BoardHeader.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AddBoard from './AddBoard';
import { useTranslation

 } from 'react-i18next';
const BoardHeader: React.FC = () => {
  const [t, i18n] = useTranslation('global');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('boards-dash.title')}
        </Typography>
        <AddBoard />
      </Toolbar>
    </AppBar>
  );
};

export default BoardHeader;
