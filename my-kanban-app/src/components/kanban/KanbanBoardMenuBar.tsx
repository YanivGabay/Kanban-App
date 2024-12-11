// src/components/KanbanBoardMenuBar.tsx
import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BoardData } from '../../types/board';

interface KanbanBoardMenuBarProps {
  board: BoardData;
}

const KanbanBoardMenuBar: React.FC<KanbanBoardMenuBarProps> = ({ board }) => {
  const { t } = useTranslation('global');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement filter logic (e.g., filter cards by title or tags)
  };

  const handleSearch = () => {
    // Implement search logic
  };

  return (
    <Box display="flex" justifyContent="space-between" mb={2}>
      <TextField
        label={t('kanban.search')}
        variant="outlined"
        size="small"
        onChange={handleFilterChange}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        {t('kanban.searchButton')}
      </Button>
      {/* Add more functionalities like filter dropdowns if needed */}
    </Box>
  );
};

export default KanbanBoardMenuBar;
