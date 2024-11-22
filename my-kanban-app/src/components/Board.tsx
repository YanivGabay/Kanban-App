// src/components/Board.tsx
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { BoardData } from '../types/board'; // Adjust path as needed

interface BoardProps {
  board: BoardData;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
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
        <Button size="small" onClick={() => console.log("Open Board")}>Open Board</Button>
      </CardActions>
    </Card>
  );
};

export default Board;
