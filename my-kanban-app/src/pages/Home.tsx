// src/pages/Home.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Board from '../components/Board';
import BoardHeader from '../components/BoardHeader';
import { useBoards } from '../context/BoardContext';
import { SERVER_URL } from '../env';


export const Home = () => {
  const { boards } = useBoards();
 

  return (
    <Container maxWidth="lg">
      <BoardHeader />
      <Typography variant="h4" gutterBottom>
      
      </Typography>
      <Grid container spacing={2}>
        {boards.map((board) => (
          <Grid key={board.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Board board={board} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};



