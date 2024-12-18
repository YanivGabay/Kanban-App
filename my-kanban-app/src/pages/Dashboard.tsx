import React from 'react'

import { useParams } from 'react-router-dom';
//import KanbanWrapper from '../components/KanbanWrapper';
import { useBoards } from '../context/BoardContext';
import { Typography, Container, Box } from '@mui/material';
import KanbanWrapper from '../components/kanban/KanbanWrapper';


export const Dashboard = () => {


    const { boardId } = useParams<{ boardId: string }>();
    const { boards } = useBoards();
    const board = boards.find((board) => board.id === Number(boardId));

    if(!board) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Board not found
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            {board.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {board.description}
          </Typography>
          { <KanbanWrapper board={board} />} 
        </Container>
      );
}
