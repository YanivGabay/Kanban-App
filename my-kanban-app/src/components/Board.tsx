// src/components/Board.tsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography,IconButton } from '@mui/material';
import { BoardData } from '../types/board'; // Adjust path as needed
import { useBoards } from '../context/BoardContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './ConfirmDialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
interface BoardProps {
  board: BoardData;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation('global');
  const { deleteBoard } = useBoards();
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleOpenBoard = () => {
    navigate(`/dashboard/${board.id}`);
  }

  const handleConfirmClose = (confirmed: boolean) => {
    setConfirmOpen(false);
    if (confirmed) {
      deleteBoard(board.id);
    }
  };

  return (
    <>
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {board.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {board.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpenBoard}>
          {t('boards-dash.openBoard')}
        </Button>
        <IconButton color="secondary" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
      </CardActions>
    </Card>

     <ConfirmDialog
        open={confirmOpen}
        title="Delete Board"
        content={`Are you sure you want to delete "${board.name}"? This action cannot be undone.`}
        onClose={handleConfirmClose}
      />
      </>
  );
};

export default Board;
