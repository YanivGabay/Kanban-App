import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Board from '../components/Board';
import { BoardData } from '../types/board';
import BoardHeader from '../components/BoardHeader';

export const Home = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    // in the future will be fetching from the database/server/api
    const fetchedBoards: BoardData[] = [
      { id: 1, name: 'Project Alpha', description: 'Initial phase management.' },
      { id: 2, name: 'Project Beta', description: 'Development phase tasks.' },
      { id: 3, name: 'Project Gamma', description: 'Testing and deployment tasks.' }
    ];
    setBoards(fetchedBoards);
  }, []);

  return (
    <Container maxWidth="lg">
      <BoardHeader
        onAdd={() => console.log('Add Board')}
        onEdit={() => console.log('Edit Board')}
        onDelete={() => console.log('Delete Board')}
      />
      <Grid container spacing={2}>
        {boards.map(board => (
          <Grid key={board.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Board board={board} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


