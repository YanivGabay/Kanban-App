// src/components/KanbanWrapper.tsx
import React from 'react';
import { Box } from '@mui/material';
import KanbanBoardMenuBar from './KanbanBoardMenuBar';
import KanbanBoard from './KanbanBoard';
import { BoardData } from '../../types/board';

interface KanbanWrapperProps {
  board: BoardData;
}

const KanbanWrapper: React.FC<KanbanWrapperProps> = ({ board }) => {
  return (
    <Box>
      <KanbanBoardMenuBar board={board} />
      <KanbanBoard board={board} />
    </Box>
  );
};

export default KanbanWrapper;
