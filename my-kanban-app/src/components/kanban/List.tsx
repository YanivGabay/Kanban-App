import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListData } from '../../types/board';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ListProps {
  list: ListData;
  boardId: number;
}

const List: React.FC<ListProps> = ({ list, boardId: _boardId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ 
        minWidth: 280,
        maxWidth: 280,
        m: 1,
        height: 'fit-content'
      }}
    >
      <Paper 
        elevation={1}
        sx={{ 
          p: 2,
          backgroundColor: 'grey.50',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'grey.100',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1rem',
              fontWeight: 600,
              color: 'grey.900'
            }}
          >
            {list.title}
          </Typography>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            minHeight: 30,
            maxHeight: 'calc(100vh - 290px)',
            overflowY: 'auto'
          }}
        >
          {/* Cards will be added here */}
        </Box>
      </Paper>
    </Box>
  );
};

export default List;
